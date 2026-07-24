// ============================================================
//  FRONT - Lógica del panel
//  Dos mundos: Aprendizaje (Academia) y Onboarding (NGR).
//  Selector de inicio → panel → detalle. Progreso en la misma BD.
// ============================================================

const app = document.getElementById("app");
let COMPLETADAS = new Set(); // ids de lecciones/actividades completadas

// ---- Mundos (secciones separadas por el selector de inicio) ----
const MUNDOS = {
  aprendizaje: {
    key: "aprendizaje",
    tipo: "aprendizaje",
    icon: "🎓",
    nombre: "Aprendizaje",
    desc: "Tus rutas de estudio y práctica.",
    eyebrow: "Academia personal",
    titulo: "Mi centro de aprendizaje",
    color: "#6E8BFF",
    paquetes: ACADEMIA.paquetes,
  },
  onboarding: {
    key: "onboarding",
    tipo: "onboarding",
    icon: "🧭",
    nombre: "Onboarding",
    desc: "Tu ruta de inducción en NGR.",
    eyebrow: "Onboarding NGR",
    titulo: "Mi ruta de inducción",
    color: "#f97316",
    paquetes: typeof ONBOARDING !== "undefined" ? [ONBOARDING] : [],
  },
};
let MUNDO = MUNDOS.aprendizaje;

// ---- helpers de datos ----
function todasLasLecciones() {
  const out = [];
  MUNDO.paquetes.forEach((p) =>
    (p.rutas || []).forEach((r) =>
      r.bloques.forEach((b) =>
        b.lecciones.forEach((l) => {
          if (!l.na) out.push({ ...l, rutaId: r.id, pkgId: p.id });
        })
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
function contables(lecs) {
  return lecs.filter((l) => !l.na);
}
function pctRuta(ruta) {
  const lec = contables(leccionesDeRuta(ruta));
  if (!lec.length) return 0;
  const done = lec.filter((l) => COMPLETADAS.has(l.id)).length;
  return Math.round((done / lec.length) * 100);
}
function pctPaquete(pkg) {
  const all = [];
  (pkg.rutas || []).forEach((r) => leccionesDeRuta(r).forEach((l) => all.push(l)));
  const lec = contables(all);
  if (!lec.length) return 0;
  const done = lec.filter((l) => COMPLETADAS.has(l.id)).length;
  return Math.round((done / lec.length) * 100);
}
function horasNum(str) {
  const nums = ((str || "").match(/\d+/g) || []).map(Number);
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// ---- sincronización con el backend ----
async function cargarProgreso() {
  try {
    const r = await fetch("/api/progreso");
    if (r.status === 401) {
      window.location.href = "/login.html";
      return false;
    }
    const d = await r.json();
    COMPLETADAS = new Set(d.completadas || []);
    return true;
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
//  VISTA 0: SELECTOR DE INICIO (Aprendizaje / Onboarding)
// ============================================================
function progresoMundo(m) {
  const lecs = [];
  m.paquetes.forEach((p) =>
    (p.rutas || []).forEach((r) =>
      r.bloques.forEach((b) => b.lecciones.forEach((l) => { if (!l.na) lecs.push(l); }))
    )
  );
  const total = lecs.length;
  const done = lecs.filter((l) => COMPLETADAS.has(l.id)).length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}
function mundoCard(m) {
  const { total, pct } = progresoMundo(m);
  const vacio = total === 0;
  return `
    <div class="mundo" id="mundo-${m.key}" style="--mc:${m.color}">
      <div class="mundo-ic">${m.icon}</div>
      <div class="mundo-body">
        <h3>${m.nombre}</h3>
        <p>${m.desc}</p>
      </div>
      <div class="mundo-foot">
        <div class="mundo-bar"><i style="width:${pct}%"></i></div>
        <span>${vacio ? "—" : pct + "%"}</span>
      </div>
    </div>`;
}
function vistaInicio() {
  window.scrollTo(0, 0);
  app.className = "";
  app.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div class="brand">
          <p class="eyebrow">Panel personal</p>
          <h1>¿Dónde quieres entrar?</h1>
        </div>
        <button class="logout" id="logoutBtn">Salir</button>
      </div>
      <div class="selector">
        ${Object.values(MUNDOS).map((m) => mundoCard(m)).join("")}
      </div>
    </div>`;
  document.getElementById("logoutBtn").addEventListener("click", logout);
  Object.values(MUNDOS).forEach((m) => {
    const el = document.getElementById(`mundo-${m.key}`);
    if (el) el.addEventListener("click", () => { MUNDO = m; vistaPanel(); });
  });
}

// ============================================================
//  VISTA 1: PANEL DEL MUNDO ACTUAL
// ============================================================
function footerHTML() {
  return `
    <footer>
      <strong style="color:var(--ink)">Reglas de oro</strong>
      <ul class="rules">
        <li>Termina una ruta completa antes de empezar la siguiente.</li>
        <li>Aplica cada ruta en un proyecto real tuyo. Aplicar &gt; coleccionar cursos.</li>
        <li>No acumules cursos a medias: el avance real es terminar y usar.</li>
      </ul>
    </footer>`;
}
function vistaPanel() {
  window.scrollTo(0, 0);
  const P = MUNDO.paquetes;
  const onb = MUNDO.tipo === "onboarding";

  const lecciones = todasLasLecciones();
  const totalLec = lecciones.length;
  const doneLec = lecciones.filter((l) => COMPLETADAS.has(l.id)).length;
  const pctGlobal = totalLec ? Math.round((doneLec / totalLec) * 100) : 0;

  // próximo paso: primera actividad/lección no completada (ignora "na")
  let next = null;
  for (const p of P) {
    if (p.estado && p.estado !== "activo") continue;
    for (const r of (p.rutas || [])) {
      for (const l of leccionesDeRuta(r)) {
        if (!l.na && !COMPLETADAS.has(l.id)) { next = { ruta: r, lec: l }; break; }
      }
      if (next) break;
    }
    if (next) break;
  }

  // stats por mundo
  let statsHTML;
  if (onb) {
    const semanas = P.reduce((a, p) => a + (p.rutas || []).filter((r) => r.id !== "onb-extra").length, 0);
    statsHTML = `
      <div class="stat"><div class="n">${doneLec}/${totalLec}</div><div class="l">Actividades</div></div>
      <div class="stat"><div class="n">${semanas}</div><div class="l">Semanas</div></div>
      <div class="stat"><div class="n">${totalLec - doneLec}</div><div class="l">Pendientes</div></div>`;
  } else {
    let horasTotales = 0, horasHechas = 0;
    P.forEach((p) => (p.rutas || []).forEach((r) => {
      const h = horasNum(r.horas);
      horasTotales += h;
      horasHechas += h * (pctRuta(r) / 100);
    }));
    const pkgsActivos = P.filter((p) => p.estado === "activo");
    statsHTML = `
      <div class="stat"><div class="n">${doneLec}/${totalLec}</div><div class="l">Lecciones</div></div>
      <div class="stat"><div class="n">${horasHechas.toFixed(0)}/${horasTotales.toFixed(0)} h</div><div class="l">Horas</div></div>
      <div class="stat"><div class="n">${pkgsActivos.length}</div><div class="l">Paquetes activos</div></div>`;
  }

  // tarjetas
  let cardsHTML, bind;
  if (onb) {
    const rutas = P.flatMap((p) => (p.rutas || []).map((r) => ({ r, pkgId: p.id })));
    cardsHTML = `<h2 class="section">Semanas</h2>` + rutas.map(({ r }) => cardRuta(r)).join("");
    bind = () => rutas.forEach(({ r, pkgId }) => {
      const el = document.getElementById(`route-${r.id}`);
      if (el) el.addEventListener("click", () => vistaRuta(pkgId, r.id));
    });
  } else {
    const pkgsActivos = P.filter((p) => p.estado === "activo");
    const pkgsFuturos = P.filter((p) => p.estado !== "activo");
    cardsHTML = `<h2 class="section">Paquetes</h2>${pkgsActivos.map(cardPaquete).join("")}` +
      (pkgsFuturos.length ? `<h2 class="section">Próximamente</h2>${pkgsFuturos.map(cardPaquete).join("")}` : "");
    bind = () => pkgsActivos.forEach((p) => {
      const el = document.getElementById(`pkg-${p.id}`);
      if (el) el.addEventListener("click", () => vistaPaquete(p.id));
    });
  }

  app.className = "";
  app.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div class="brand">
          <p class="eyebrow" style="color:${MUNDO.color}">${MUNDO.eyebrow}</p>
          <h1>${MUNDO.titulo}</h1>
        </div>
        <div class="top-actions">
          ${onb ? `<button class="back mini notion" id="notionBtn">🔄 Actualizar desde Notion</button>` : ""}
          <button class="back mini" id="cambiarBtn">⇄ Cambiar</button>
          <button class="logout" id="logoutBtn">Salir</button>
        </div>
      </div>

      <div class="global">
        <div class="row">
          <div class="big">${pctGlobal}%<small> ${onb ? "ejecutado" : "completado"}</small></div>
          <div class="gbar"><i style="width:${pctGlobal}%"></i></div>
        </div>
        <div class="stats">${statsHTML}</div>
        ${next
          ? `<div class="nextup">${onb ? "Tu próxima actividad" : "Tu próximo paso"}: <span class="tag">▸</span> <b>${next.lec.titulo}</b> · ${next.ruta.titulo}</div>`
          : `<div class="nextup">🎉 ¡${onb ? "Todo ejecutado" : "Completaste todo el contenido disponible"}!</div>`}
      </div>

      ${cardsHTML}
      ${onb ? "" : footerHTML()}
    </div>`;

  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("cambiarBtn").addEventListener("click", vistaInicio);
  const nb = document.getElementById("notionBtn");
  if (nb) nb.addEventListener("click", actualizarDesdeNotion);
  bind();
}

// ============================================================
//  ACTUALIZAR DESDE NOTION: refresca las notas de las tarjetas
// ============================================================
function normKeyFront(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
async function actualizarDesdeNotion() {
  const btn = document.getElementById("notionBtn");
  const orig = btn ? btn.textContent : "";
  if (btn) { btn.disabled = true; btn.textContent = "⏳ Leyendo Notion…"; }
  let d;
  try {
    const r = await fetch("/api/notion");
    if (r.status === 401) { window.location.href = "/login.html"; return; }
    d = await r.json();
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = orig; }
    toast("No se pudo conectar con Notion.");
    return;
  }
  if (!d.ok) { mostrarSetupNotion(d.reason, d.detail); return; }
  // Empareja de forma tolerante: la tarjeta hace match si TODAS las palabras de
  // su notionKey están en el nombre de la reunión (aunque tenga palabras de más).
  const sesiones = (d.sessions || []).map((s) => ({ notes: s.notes, toks: (s.key || "").split(" ").filter(Boolean) }));
  function matchNotas(notionKey) {
    const ct = normKeyFront(notionKey).split(" ").filter(Boolean);
    if (!ct.length) return null;
    let best = null, bestExtra = Infinity;
    for (const s of sesiones) {
      if (ct.every((t) => s.toks.includes(t))) {
        const extra = s.toks.length - ct.length;
        if (extra < bestExtra) { best = s; bestExtra = extra; }
      }
    }
    return best;
  }
  let n = 0;
  MUNDOS.onboarding.paquetes.forEach((p) =>
    (p.rutas || []).forEach((rt) =>
      rt.bloques.forEach((b) =>
        b.lecciones.forEach((l) => {
          if (l.notionKey) {
            const m = matchNotas(l.notionKey);
            if (m && m.notes && m.notes.trim()) { l.noti = m.notes; n++; }
          }
        })
      )
    )
  );
  if (btn) { btn.disabled = false; btn.textContent = orig; }
  vistaPanel();
  toast(n ? `✓ ${n} tarjeta${n === 1 ? "" : "s"} actualizada${n === 1 ? "" : "s"} desde Notion` : "Notion leído · sin coincidencias para actualizar");
}
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2800);
}
function mostrarSetupNotion(reason, detail) {
  app.innerHTML = `
    <div class="wrap">
      <button class="back" id="backBtn">← Volver al onboarding</button>
      <div class="detail-head">
        <p class="eyebrow" style="color:#f97316">Notion</p>
        <h1>Conectar Notion</h1>
      </div>
      ${notionSetupHTML(reason, detail)}
    </div>`;
  document.getElementById("backBtn").addEventListener("click", vistaPanel);
}
function notionSetupHTML(reason, detail) {
  if (reason === "no_token") {
    return `
      <div class="notion-setup">
        <h3>Falta conectar Notion</h3>
        <p>Para que este botón lea tu página en vivo, hay que darle al servidor un acceso de solo lectura a Notion:</p>
        <ol>
          <li>En <b>notion.so/my-integrations</b> crea una integración interna y copia su <b>Internal Integration Secret</b>.</li>
          <li>Abre tu página «Inducción NGR» en Notion → menú <b>⋯</b> → <b>Connections</b> → conéctala a esa integración.</li>
          <li>En Render → tu servicio web → <b>Environment</b>, agrega la variable <code>NOTION_TOKEN</code> con ese secreto (y redeploya).</li>
        </ol>
        <p class="muted">Cuando esté puesta, este botón traerá tus notas de Notion al instante.</p>
      </div>`;
  }
  return `
    <div class="notion-setup">
      <h3>No se pudo leer Notion</h3>
      <p class="muted">${detail || "Error desconocido."}</p>
      <p>Revisa que la página esté conectada a la integración y que <code>NOTION_TOKEN</code> sea válido.</p>
    </div>`;
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
    </div>`;
}

// ---------- NIVEL 2: rutas de un paquete (solo aprendizaje) ----------
function vistaPaquete(pkgId) {
  const p = MUNDO.paquetes.find((x) => x.id === pkgId);
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
    </div>`;
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
    </div>`;
}

// ---------- NIVEL 3: detalle de una ruta ----------
function vistaRuta(pkgId, rutaId) {
  const p = MUNDO.paquetes.find((x) => x.id === pkgId);
  const r = p.rutas.find((x) => x.id === rutaId);
  if (!r) return vistaPaquete(pkgId);
  window.scrollTo(0, 0);
  const onb = MUNDO.tipo === "onboarding";
  const volver = onb ? "← Volver a las semanas" : `← Volver a ${p.titulo}`;

  app.innerHTML = `
    <div class="wrap">
      <button class="back" id="backBtn">${volver}</button>
      <div class="detail-head">
        <p class="eyebrow" style="color:${r.color}">${r.horas} · ${pctRuta(r)}% ${onb ? "ejecutado" : "completado"}</p>
        <h1>${r.titulo}</h1>
        <p class="resumen">${r.resumen}</p>
      </div>
      ${r.porque ? `<div class="porque" style="--rc:${r.color}">📍 ${r.porque}</div>` : ""}
      ${r.bloques.map((b) => bloqueHTML(b, r.color)).join("")}
    </div>`;

  document.getElementById("backBtn").addEventListener("click", () =>
    onb ? vistaPanel() : vistaPaquete(pkgId)
  );

  app.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", async () => {
      await guardarLeccion(cb.dataset.id, cb.checked);
      const eyebrow = app.querySelector(".detail-head .eyebrow");
      if (eyebrow) eyebrow.textContent = `${r.horas} · ${pctRuta(r)}% ${onb ? "ejecutado" : "completado"}`;
    });
  });
}

function bloqueHTML(b, color) {
  return `
    <div class="bloque${b.feriado ? " feriado" : ""}">
      <p class="bloque-title">${b.titulo}</p>
      ${b.lecciones.map((l) => leccionHTML(l, color)).join("")}
    </div>`;
}
function leccionHTML(l, color) {
  // Ítems "no aplica" (feriados / por planificar): no marcables
  if (l.na) {
    return `<div class="leccion na"><span class="lec-body"><span class="lec-title">${l.titulo}</span></span></div>`;
  }

  const checked = COMPLETADAS.has(l.id) ? "checked" : "";

  // meta de onboarding: persona + (reunión)
  const meta = [];
  if (l.persona) meta.push(`<span class="lec-meta">👤 ${l.persona}</span>`);
  if (l.dia) meta.push(`<span class="lec-meta dia">📅 ${l.dia}</span>`);
  if (l.reunion) meta.push(`<span class="lec-meta reu">🗓️ (${l.reunion})</span>`);
  const metaline = meta.length ? `<div class="lec-metaline">${meta.join("")}</div>` : "";
  const alcance = l.alcance ? `<div class="lec-alcance">🎯 <b>Alcance:</b> ${l.alcance}</div>` : "";

  // bloque de evidencia: una reunión puede tener VARIOS archivos, cada uno
  // con su propia síntesis; más una sola síntesis de tus notas de Notion.
  let ev = "";
  const evs = l.evidencias
    ? l.evidencias
    : (l.evidencia ? [{ file: l.evidencia.file, ruta: l.evidencia.ruta, arch: l.arch }] : []);
  if (evs.length || l.noti !== undefined) {
    const filesHTML = evs.map((e) => `
      <div class="ev-item">
        <div class="ev-file">📎 <span>${e.file}</span>${e.ruta ? `<span class="ev-path">${e.ruta}</span>` : ""}</div>
        <div class="ev-box arch"><b>📄 Del archivo</b><p>${e.arch && e.arch.trim() ? e.arch : "Pendiente de vincular."}</p></div>
      </div>`).join("");
    const noti = `<div class="ev-box noti"><b>📝 Mis notas · Notion</b><p>${l.noti && l.noti.trim() ? l.noti : "Pendiente de vincular."}</p></div>`;
    ev = `<div class="ev">${filesHTML}${noti}</div>`;
  }

  return `
    <label class="leccion" style="--rc:${color}">
      <input type="checkbox" data-id="${l.id}" ${checked}>
      <span class="lec-body">
        <span class="lec-title">${l.titulo}</span>
        ${metaline}
        ${alcance}
        ${l.detalle ? `<div class="lec-detalle">${l.detalle}</div>` : ""}
        ${l.url ? `<a class="lec-link" href="${l.url}" target="_blank" rel="noopener">${l.url.replace(/^https?:\/\//, "").slice(0, 60)}</a>` : ""}
        ${ev}
      </span>
    </label>`;
}

// ============================================================
//  SEGURIDAD DE SESIÓN: inactividad (15 min) + aviso de salida
// ============================================================
const IDLE_MS = 15 * 60 * 1000; // 15 minutos
let idleTimer = null;
let saliendo = false;

function cerrarSesionPorInactividad() {
  saliendo = true;
  try { navigator.sendBeacon("/api/logout"); } catch (e) {}
  window.location.href = "/login.html?m=idle";
}
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(cerrarSesionPorInactividad, IDLE_MS);
}
function modalSalida() {
  if (document.querySelector(".modal-salida")) return;
  const ov = document.createElement("div");
  ov.className = "modal-salida";
  ov.innerHTML = `
    <div class="modal-card">
      <h3>Estás saliendo de la aplicación</h3>
      <p>Si sales, se cerrará tu sesión y tendrás que ingresar tu clave otra vez.</p>
      <div class="modal-btns">
        <button class="mbtn ghost" id="mStay">Quedarme</button>
        <button class="mbtn danger" id="mLeave">Salir y cerrar sesión</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  document.getElementById("mStay").onclick = () => {
    ov.remove();
    history.pushState({ trap: 1 }, "", location.href); // re-arma la trampa
  };
  document.getElementById("mLeave").onclick = () => {
    ov.remove();
    saliendo = true;
    try { navigator.sendBeacon("/api/logout"); } catch (e) {}
    history.back(); // sale de verdad al sitio anterior (y se cierra sesión)
  };
}
function armarSeguridad() {
  ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"].forEach((ev) =>
    window.addEventListener(ev, resetIdle, { passive: true }));
  resetIdle();
  // Trampa del botón "atrás": muestra el aviso en vez de salir directo
  history.pushState({ trap: 1 }, "", location.href);
  window.addEventListener("popstate", modalSalida);
  // Cerrar pestaña / recargar / navegar fuera: cierra la sesión en silencio
  // (el navegador no permite mostrar un aviso propio en ese momento).
  window.addEventListener("pagehide", () => { try { navigator.sendBeacon("/api/logout"); } catch (e) {} });
}

// ============================================================
//  ARRANQUE
// ============================================================
(async function init() {
  const ok = await cargarProgreso();
  if (ok) { vistaInicio(); armarSeguridad(); } // selector + seguridad de sesión
})();
