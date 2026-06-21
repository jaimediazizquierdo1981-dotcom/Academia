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
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
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
