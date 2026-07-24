// ============================================================
//  ACADEMIA PERSONAL - Backend (Node + Express)
//  Sirve la web, valida el login y guarda el progreso en Postgres.
// ============================================================

import express from "express";
import session from "express-session";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// --- Variables de entorno (se configuran en Render, NUNCA en el código) ---
const APP_PASSWORD = process.env.APP_PASSWORD || "cambia-esta-clave";
const SESSION_SECRET = process.env.SESSION_SECRET || "secreto-de-sesion-local";
const DATABASE_URL = process.env.DATABASE_URL; // la da Render Postgres

// --- Notion (para el botón "Actualizar desde Notion") ---
const NOTION_TOKEN = process.env.NOTION_TOKEN; // secreto de la integración de Notion
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID || "3a36e04f-5a17-806e-8584-f5ce9c3a8bdf"; // página "Induccion NGR"

// ============================================================
//  BASE DE DATOS (Postgres) - aquí vive tu progreso, permanente
// ============================================================
const { Pool } = pg;
let pool = null;

if (DATABASE_URL) {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // requerido por Render Postgres
  });
}

// Crea la tabla de progreso si no existe (se ejecuta al arrancar)
async function initDB() {
  if (!pool) {
    console.log("[DB] Sin DATABASE_URL: el progreso no persistirá (modo local sin BD).");
    return;
  }
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progreso (
        clave TEXT PRIMARY KEY,
        completado BOOLEAN NOT NULL DEFAULT true,
        actualizado TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    console.log("[DB] Tabla 'progreso' lista.");
  } catch (err) {
    console.error("[DB] Error creando tabla:", err.message);
  }
}

// ============================================================
//  MIDDLEWARE
// ============================================================
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // renueva la expiración en cada request (mientras haya actividad)
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 min de inactividad → la sesión caduca
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Protege rutas: solo deja pasar si la sesión está autenticada
function requireAuth(req, res, next) {
  if (req.session && req.session.autenticado) return next();
  return res.status(401).json({ error: "No autenticado" });
}

// ============================================================
//  RUTAS DE AUTENTICACIÓN
// ============================================================

// Verifica la clave. La comparación ocurre AQUÍ, en el servidor.
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (typeof password !== "string") {
    return res.status(400).json({ error: "Falta la clave" });
  }
  if (password === APP_PASSWORD) {
    req.session.autenticado = true;
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: "Clave incorrecta" });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// Saber si la sesión sigue activa (el front lo consulta al cargar)
app.get("/api/estado", (req, res) => {
  res.json({ autenticado: !!(req.session && req.session.autenticado) });
});

// ============================================================
//  API DE PROGRESO (protegida)
// ============================================================

// Devuelve todas las lecciones completadas
app.get("/api/progreso", requireAuth, async (req, res) => {
  if (!pool) return res.json({ completadas: [] });
  try {
    const r = await pool.query(
      "SELECT clave FROM progreso WHERE completado = true"
    );
    res.json({ completadas: r.rows.map((row) => row.clave) });
  } catch (err) {
    console.error("[DB] Error leyendo progreso:", err.message);
    res.status(500).json({ error: "Error al leer progreso" });
  }
});

// Marca o desmarca una lección
app.post("/api/progreso", requireAuth, async (req, res) => {
  const { clave, completado } = req.body;
  if (typeof clave !== "string") {
    return res.status(400).json({ error: "Falta la clave de la lección" });
  }
  if (!pool) return res.json({ ok: true }); // modo local sin BD
  try {
    if (completado) {
      await pool.query(
        `INSERT INTO progreso (clave, completado, actualizado)
         VALUES ($1, true, now())
         ON CONFLICT (clave) DO UPDATE SET completado = true, actualizado = now()`,
        [clave]
      );
    } else {
      await pool.query("DELETE FROM progreso WHERE clave = $1", [clave]);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("[DB] Error guardando progreso:", err.message);
    res.status(500).json({ error: "Error al guardar progreso" });
  }
});

// ============================================================
//  API DE NOTION (protegida) - lee la página de inducción en vivo
// ============================================================
async function fetchNotionLines() {
  const lines = [];
  let cursor = null;
  do {
    const url = new URL(`https://api.notion.com/v1/blocks/${NOTION_PAGE_ID}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) url.searchParams.set("start_cursor", cursor);
    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
    });
    if (!r.ok) throw new Error(`Notion respondió ${r.status}`);
    const d = await r.json();
    for (const b of d.results || []) {
      const t = b[b.type];
      const rich = t && t.rich_text;
      if (Array.isArray(rich)) {
        const txt = rich.map((x) => x.plain_text).join("").replace(/\s*\n\s*/g, " ").trim();
        if (txt) lines.push(txt);
      }
    }
    cursor = d.has_more ? d.next_cursor : null;
  } while (cursor);
  return lines;
}

// Normaliza un nombre de reunión a una clave comparable (sin acentos/mayúsculas/puntuación)
function normKey(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
// Agrupa las líneas de Notion en sesiones: cada "(reunión)" abre una, y las
// líneas siguientes (que no sean fecha ni archivo) son sus notas.
function parseSessions(lines) {
  const isDate = (s) => /^\d+\.\s*\d{1,2}\.\d{1,2}\.\d{2,4}/.test(s);
  const isReu = (s) => /^\(.*\)$/.test(s.trim());
  const isFile = (s) => /^[“"].*[”"]\s*$/.test(s.trim());
  const out = [];
  let cur = null;
  for (const s of lines) {
    const t = (s || "").trim();
    if (!t) continue;
    if (isReu(t)) {
      const reunion = t.replace(/^\(|\)$/g, "").trim();
      cur = { reunion, key: normKey(reunion), notes: [] };
      out.push(cur);
    } else if (isDate(t)) {
      cur = null;
    } else if (isFile(t)) {
      // los archivos no van a las notas
    } else if (cur) {
      cur.notes.push(t);
    }
  }
  return out.map((x) => ({ reunion: x.reunion, key: x.key, notes: x.notes.join(" ") }));
}

app.get("/api/notion", requireAuth, async (req, res) => {
  if (!NOTION_TOKEN) return res.json({ ok: false, reason: "no_token" });
  try {
    const lines = await fetchNotionLines();
    res.json({ ok: true, sessions: parseSessions(lines) });
  } catch (err) {
    console.error("[Notion] Error:", err.message);
    res.status(502).json({ ok: false, reason: "error", detail: err.message });
  }
});

// ============================================================
//  SERVIR EL FRONT (la web)
// ============================================================
app.use(express.static(path.join(__dirname, "public")));

// La raíz: si no está logueado, login; si sí, el panel
app.get("/", (req, res) => {
  if (req.session && req.session.autenticado) {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  }
  return res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ============================================================
//  ARRANQUE
// ============================================================
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Academia] Servidor corriendo en puerto ${PORT}`);
  });
});
