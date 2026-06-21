// ============================================================
//  FRONT - Lógica del panel
//  Renderiza 3 niveles (paquetes → rutas → detalle),
//  calcula métricas y sincroniza el progreso con el backend (API).
// ============================================================

const app = document.getElementById("app");
let COMPLETADAS = new Set(); // ids de lecciones completadas

// ---- helpers de datos ----
function todasLasLecciones() {
  const out = [];
  ACADEMIA.paquetes.forEach((p) =>
    (p.rutas || []).forEach((r) =>
      r.bloques.forEach((b) =>
        b.lecciones.forEach((l) => out.push({ ...l, rutaId: r.id, pkgId: p.id }))
      )
    )
  );
  return out;
}
function leccionesDeRuta(ruta) {
  const out = [];
  ruta.bloques.forEach((b) => b.lecciones.forEach((l) => out.push(l)));
  return out;
}
function pctRuta(ruta) {
  const lec = leccionesDeRuta(ruta);
  if (!lec.length) return 0;
  const done = lec.filter((l) => COMPLETADAS.has(l.id)).length;
  return Math.round((done / lec.length) * 100);
}
function pctPaquete(pkg) {
  const rutas = pkg.rutas || [];
  const all = [];
  rutas.forEach((r) => leccionesDeRuta(r).forEach((l) => all.push(l)));
  if (!all.length) return 0;
  const done = all.filter((l) => COMPLETADAS.has(l.id)).length;
  return Math.round((done / all.length) * 100);
}
function horasNum(str) {
  // "8–9 h" -> 8.5 ; "3 h" -> 3
  const nums = (str.match(/\d+/g) || []).map(Number);
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// ---- sincronización con el backend ----
async function cargarProgreso() {
  try {
    const r = await fetch("/api/progreso");
    if (r.status === 401) {
      window.location.href = "/";
      return;
    }
    const d = await r.json();
    COMPLETADAS = new Set(d.completadas || []);
  } catch (e) {
    console.error("No se pudo cargar el progreso", e);
  }
}
async function guardarLeccion(id, completado) {
  if (completado) COMPLETADAS.add(id);
  else COMPLETADAS.delete(id);
  try {
    await fetch("/api/progreso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clave: id, completado }),
    });
  } catch (e) {
    console.error("No se pudo guardar", e);
  }
}
async function logout() {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/";
}

// ============================================================
//  VISTAS
// ============================================================

// ---------- NIVEL 1: panel de paquetes ----------
function vistaPanel() {
  const lecciones = todasLasLecciones();
  const totalLec = lecciones.length;
  const doneLec = lecciones.filter((l) => COMPLETADAS.has(l.id)).length;
  const pctGlobal = totalLec ? Math.round((doneLec / totalLec) * 100) : 0;

  // horas
  let horasTotales = 0, horasHechas = 0;
  ACADEMIA.paquetes.forEach((p) =>
    (p.rutas || []).forEach((r) => {
      const h = horasNum(r.horas);
      horasTotales += h;
      horasHechas += h * (pctRuta(r) / 100);
    })
  );

  // próximo paso: primera lección no completada del paquete activo
  let next = null;
  for (const p of ACADEMIA.paquetes) {
    if (p.estado !== "activo") continue;
    for (const r of p.rutas) {
      for (const l of leccionesDeRuta(r)) {
        if (!COMPLETADAS.has(l.id)) { next = { ruta: r, lec: l }; break; }
      }
      if (next) break;
    }
    if (next) break;
  }

  const pkgsActivos = ACADEMIA.paquetes.filter((p) => p.estado === "activo");
  const pkgsFuturos = ACADEMIA.paquetes.filter((p) => p.estado !== "activo");

  app.className = "";
  app.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div class="brand">
          <p class="eyebrow">Academia personal</p>
          <h1>Mi centro de aprendizaje</h1>
        </div>
        <button class="logout" id="logoutBtn">Salir</button>
      </div>

      <div class="global">
        <div class="row">
          <div class="big">${pctGlobal}%<small> completado</small></div>
          <div class="gbar"><i style="width:${pctGlobal}%"></i></div>
        </div>
        <div class="stats">
          <div class="stat"><div class="n">${doneLec}/${totalLec}</div><div class="l">Lecciones</div></div>
          <div class="stat"><div class="n">${horasHechas.toFixed(0)}/${horasTotales.toFixed(0)} h</div><div class="l">Horas</div></div>
          <div class="stat"><div class="n">${pkgsActivos.length}</div><div class="l">Paquetes activos</div></div>
        </div>
        ${next ? `<div class="nextup">Tu próximo paso: <span class="tag">▸</span> <b>${next.lec.titulo}</b> · ${next.ruta.titulo}</div>` : `<div class="nextup">🎉 ¡Completaste todo el contenido disponible!</div>`}
      </div>

      <h2 class="section">Paquetes</h2>
      ${pkgsActivos.map((p) => cardPaquete(p)).join("")}

      ${pkgsFuturos.length ? `<h2 class="section">Próximamente</h2>${pkgsFuturos.map((p) => cardPaquete(p)).join("")}` : ""}

      <footer>
        <strong style="color:var(--ink)">Reglas de oro</strong>
        <ul class="rules">
          <li>Termina una ruta completa antes de empezar la siguiente.</li>
          <li>Aplica cada ruta en un proyecto real tuyo. Aplicar &gt; coleccionar cursos.</li>
          <li>No acumules cursos a medias: el avance real es terminar y usar.</li>
        </ul>
      </footer>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", logout);
  pkgsActivos.forEach((p) => {
    const el = document.getElementById(`pkg-${p.id}`);
    if (el) el.addEventListener("click", () => vistaPaquete(p.id));
  });
}

function cardPaquete(p) {
  const activo = p.estado === "activo";
  const pct = activo ? pctPaquete(p) : 0;
  const nRutas = (p.rutas || []).length;
  return `
    <div class="pkg ${p.estado}" id="pkg-${p.id}" style="--pkg-color:${p.color}">
      <div class="pkg-head">
        <span class="pkg-num">P${p.numero}</span>
        <h3 class="pkg-title">${p.titulo}</h3>
        <span class="pkg-badge ${p.estado}">${activo ? "Activo" : "Pronto"}</span>
      </div>
      <p class="pkg-resumen">${p.resumen}</p>
      ${activo ? `
        <div class="pkg-meta">
          <span>${nRutas} rutas</span>
          <div class="pkg-bar"><i style="width:${pct}%"></i></div>
          <span>${pct}%</span>
          <span class="pkg-enter">Abrir →</span>
        </div>` : `
        <div class="pkg-meta"><span>En preparación</span></div>`}
    </div>
  `;
}

// ---------- NIVEL 2: rutas de un paquete ----------
function vistaPaquete(pkgId) {
  const p = ACADEMIA.paquetes.find((x) => x.id === pkgId);
  if (!p) return vistaPanel();
  window.scrollTo(0, 0);

  app.innerHTML = `
    <div class="wrap">
      <button class="back" id="backBtn">← Volver al panel</button>
      <div class="detail-head">
        <p class="eyebrow" style="color:${p.color}">Paquete ${p.numero}</p>
        <h1>${p.titulo}</h1>
        <p class="resumen">${p.resumen}</p>
      </div>
      ${p.rutas.map((r) => cardRuta(r)).join("")}
    </div>
  `;
  document.getElementById("backBtn").addEventListener("click", vistaPanel);
  p.rutas.forEach((r) => {
    const el = document.getElementById(`route-${r.id}`);
    if (el) el.addEventListener("click", () => vistaRuta(p.id, r.id));
  });
}

function cardRuta(r) {
  const pct = pctRuta(r);
  return `
    <div class="route" id="route-${r.id}" style="--rc:${r.color}">
      <div class="route-head">
        <h3 class="route-title">${r.titulo}</h3>
        <span class="route-hours">${r.horas}</span>
      </div>
      <p class="route-resumen">${r.resumen}</p>
      <div class="route-foot">
        <div class="route-bar"><i style="width:${pct}%"></i></div>
        <span class="route-pct">${pct}%</span>
      </div>
    </div>
  `;
}

// ---------- NIVEL 3: detalle de una ruta (lecciones) ----------
function vistaRuta(pkgId, rutaId) {
  const p = ACADEMIA.paquetes.find((x) => x.id === pkgId);
  const r = p.rutas.find((x) => x.id === rutaId);
  if (!r) return vistaPaquete(pkgId);
  window.scrollTo(0, 0);

  app.innerHTML = `
    <div class="wrap">
      <button class="back" id="backBtn">← Volver a ${p.titulo}</button>
      <div class="detail-head">
        <p class="eyebrow" style="color:${r.color}">${r.horas} · ${pctRuta(r)}% completado</p>
        <h1>${r.titulo}</h1>
        <p class="resumen">${r.resumen}</p>
      </div>
      <div class="porque" style="--rc:${r.color}">📍 ${r.porque}</div>
      ${r.bloques.map((b) => bloqueHTML(b, r.color)).join("")}
    </div>
  `;
  document.getElementById("backBtn").addEventListener("click", () => vistaPaquete(pkgId));

  // checkboxes
  app.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", async () => {
      await guardarLeccion(cb.dataset.id, cb.checked);
      // refresca el encabezado de %
      const eyebrow = app.querySelector(".detail-head .eyebrow");
      if (eyebrow) eyebrow.textContent = `${r.horas} · ${pctRuta(r)}% completado`;
    });
  });
}

function bloqueHTML(b, color) {
  return `
    <div class="bloque">
      <p class="bloque-title">${b.titulo}</p>
      ${b.lecciones.map((l) => leccionHTML(l, color)).join("")}
    </div>
  `;
}
function leccionHTML(l, color) {
  const checked = COMPLETADAS.has(l.id) ? "checked" : "";
  return `
    <label class="leccion" style="--rc:${color}">
      <input type="checkbox" data-id="${l.id}" ${checked}>
      <span class="lec-body">
        <span class="lec-title">${l.titulo}</span>
        ${l.detalle ? `<div class="lec-detalle">${l.detalle}</div>` : ""}
        ${l.url ? `<a class="lec-link" href="${l.url}" target="_blank" rel="noopener">${l.url.replace(/^https?:\/\//, "").slice(0, 60)}</a>` : ""}
      </span>
    </label>
  `;
}

// ============================================================
//  ARRANQUE
// ============================================================
(async function init() {
  await cargarProgreso();
  vistaPanel();
})();
