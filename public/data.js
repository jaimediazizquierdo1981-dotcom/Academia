// ============================================================
//  CONTENIDO DE LA ACADEMIA
//  Estructura: Paquetes → Rutas → Bloques → Lecciones
//  Cada lección tiene un "id" único que se usa para el progreso.
// ============================================================

const ACADEMIA = {
  paquetes: [
    {
      id: "p1",
      numero: 1,
      titulo: "Fundamentos de construcción y despliegue",
      resumen:
        "El stack con el que construyes y despliegas tus apps hoy: del lenguaje base hasta ponerlas en producción.",
      estado: "activo",
      color: "#5FA869",
      rutas: [
        // ---------- RUTA 1: JS + Node ----------
        {
          id: "js-node",
          titulo: "De JavaScript a Node.js",
          color: "#5FA869",
          horas: "8–9 h",
          resumen:
            "La base técnica de todo. El lenguaje (JavaScript) y el entorno que lo ejecuta en el servidor (Node). Una sola historia.",
          porque:
            "Node ES JavaScript en el servidor. Tus bandejas son exactamente esto: JS corriendo en Node sobre Render. Domina JS puro primero y todo lo demás cae por su peso.",
          bloques: [
            {
              titulo: "Fase 1 · JavaScript — Día 1: Fundamentos del lenguaje",
              lecciones: [
                {
                  id: "jsn-1",
                  titulo: "Curso: Learn JavaScript with Clear Explanations (parte 1)",
                  detalle:
                    "freeCodeCamp (Steven Garcia). Variables, tipos, operadores, condicionales, bucles, funciones, arrays y objetos.",
                  url: "https://www.youtube.com/results?search_query=learn+javascript+clear+explanations+freecodecamp+steven+garcia",
                },
              ],
            },
            {
              titulo: "Fase 1 · JavaScript — Día 2: Lo asíncrono",
              lecciones: [
                {
                  id: "jsn-2",
                  titulo: "Curso (parte 2) + foco en async/await",
                  detalle:
                    "Funciones flecha, métodos de array (map/filter/forEach), promesas, async/await, módulos (import/require). El corazón de tus bandejas.",
                  url: "",
                },
                {
                  id: "jsn-3",
                  titulo: "Práctica: reconoce JS en tu propio código",
                  detalle:
                    "Abre una bandeja. Identifica variables, funciones, objetos, los await, los require. Cada cosa que reconozcas es un concepto vivo en tu app.",
                  url: "",
                },
              ],
            },
            {
              titulo: "Fase 2 · Node — Día 3: Fundamentos de Node.js",
              lecciones: [
                {
                  id: "jsn-4",
                  titulo: "Curso: Learn Node.js — Full Tutorial for Beginners",
                  detalle:
                    "freeCodeCamp. Qué es Node, módulos, eventos, file system, npm, package.json, servidor HTTP. (Cubierto en la práctica: async/await, fetch en Node, CommonJS vs ES Modules, leer/escribir archivos con fs.)",
                  url: "https://www.youtube.com/results?search_query=learn+node.js+full+tutorial+beginners+freecodecamp",
                },
              ],
            },
            {
              titulo: "Fase 2 · Node — Día 4: Express + tu backend",
              lecciones: [
                {
                  id: "jsn-5",
                  titulo: "Express (crash course)",
                  detalle:
                    "El framework que organiza tu servidor: rutas, middleware, GET/POST. El esqueleto de tus bandejas. (Cubierto en la práctica: servidor Express, rutas, parámetros dinámicos, middleware express.json().)",
                  url: "https://www.youtube.com/results?search_query=express+js+crash+course",
                },
                {
                  id: "jsn-6",
                  titulo: "Laboratorio final: lee TU bandeja de punta a punta",
                  detalle:
                    "Recorre el package.json, los require/import, las rutas, el servidor. ¿Dónde está el async/await? ¿Dónde escucha el PORT?",
                  url: "",
                },
                {
                  id: "jsn-7",
                  titulo: "Extra logrado: API REST con CRUD sobre Postgres",
                  detalle:
                    "Más allá del plan original: construiste una API REST completa (GET/POST/PUT/DELETE) conectada a Postgres en Render. Pool, .env para secretos, SQL (CREATE/INSERT/SELECT/UPDATE/DELETE), parámetros seguros $1, y el WHERE como red de seguridad. Con esto entiendes tu server.js de la Academia por dentro.",
                  url: "",
                },
              ],
            },
          ],
        },
        // ---------- RUTA 2: APIs ----------
        {
          id: "apis",
          titulo: "Entender APIs",
          color: "#3DB6B0",
          horas: "3 h",
          resumen:
            "El pegamento de tu stack: lo que conecta tus apps con Gmail, Claude, Twilio, Notion.",
          porque:
            "Tú principalmente CONSUMES APIs (no las construyes). Una vez entiendes el concepto, cualquier API nueva te resulta familiar.",
          bloques: [
            {
              titulo: "Bloque 1: Qué es una API y cómo funciona la web",
              lecciones: [
                {
                  id: "api-1",
                  titulo: "Curso: APIs for Beginners (Craig Dennis)",
                  detalle:
                    "freeCodeCamp. Qué es una interfaz, una API, cómo funciona la web, JSON. El instructor es de Twilio (tu agente de WhatsApp).",
                  url: "https://www.youtube.com/results?search_query=apis+for+beginners+craig+dennis+freecodecamp",
                },
              ],
            },
            {
              titulo: "Bloque 2: REST, métodos HTTP y autenticación",
              lecciones: [
                {
                  id: "api-2",
                  titulo: "REST, métodos y Postman",
                  detalle:
                    "GET/POST/PUT/DELETE, headers, API keys, status codes (200/401/404/500), y Postman para probar APIs sin código.",
                  url: "",
                },
              ],
            },
            {
              titulo: "Bloque 3: Reconócelo en tu código",
              lecciones: [
                {
                  id: "api-3",
                  titulo: "Laboratorio: las APIs en tus apps",
                  detalle:
                    "Encuentra las llamadas a Gmail, Claude, Twilio, Notion en tus proyectos. ¿Qué método usan? ¿Dónde va la API key?",
                  url: "",
                },
              ],
            },
          ],
        },
        // ---------- RUTA 3: Git ----------
        {
          id: "git",
          titulo: "Git & GitHub",
          color: "#F05133",
          horas: "4–5 h",
          resumen:
            "Versionar, subir y desplegar tu código con soltura. Web y terminal. Incluye proteger tus secretos.",
          porque:
            "Es la base de tus despliegues (GitHub → Render). Corta y de alto impacto.",
          bloques: [
            {
              titulo: "Parte 1: GitHub por la web",
              lecciones: [
                {
                  id: "git-1",
                  titulo: "Curso oficial: Introduction to GitHub (GitHub Skills)",
                  detalle:
                    "Hecho por GitHub. Aprendes haciendo en GitHub real: repositorios, ramas, commits, pull requests. <1h.",
                  url: "https://github.com/skills/introduction-to-github",
                },
              ],
            },
            {
              titulo: "Parte 2: GitHub por la terminal",
              lecciones: [
                {
                  id: "git-2",
                  titulo: "Curso: Git & GitHub Crash Course (freeCodeCamp)",
                  detalle:
                    "~1h20. clone, status, add, commit, push, pull, ramas, merge, conflictos. El instructor usa terminal real.",
                  url: "https://www.youtube.com/watch?v=mAFoROnOfHs",
                },
                {
                  id: "git-3",
                  titulo: "Práctica visual: Learn Git Branching",
                  detalle: "Juego interactivo para entender ramas y merge.",
                  url: "https://learngitbranching.js.org/?locale=es_ES",
                },
              ],
            },
            {
              titulo: "Parte 3: Seguridad de secretos (crítico)",
              lecciones: [
                {
                  id: "git-4",
                  titulo: "Proteger tus secretos con .gitignore",
                  detalle:
                    "Nunca subir .env, tokens ni contraseñas. Revisa tus repos. Rota cualquier secreto ya expuesto.",
                  url: "",
                },
              ],
            },
          ],
        },
        // ---------- RUTA 4: Render ----------
        {
          id: "render",
          titulo: "Entender Render",
          color: "#7C5CFC",
          horas: "3 h",
          resumen:
            "Dónde corren tus apps. Despliegue, variables de entorno, y el disco efímero que ya dominaste.",
          porque:
            "Render es simple por diseño. Esto cierra tus huecos (el del token que se perdía) y te da el modelo mental completo.",
          bloques: [
            {
              titulo: "Bloque 1: Ver el flujo en pantalla",
              lecciones: [
                {
                  id: "render-1",
                  titulo: "Video: desplegar un backend Node en Render",
                  detalle:
                    "Busca uno reciente que muestre: conectar GitHub → crear Web Service → env vars → deploy.",
                  url: "https://www.youtube.com/results?search_query=deploy+node+backend+on+render+tutorial+2026",
                },
                {
                  id: "render-2",
                  titulo: "Video: variables de entorno y secrets",
                  detalle: "Cómo configurar env vars en el dashboard. Nunca subir .env al repo.",
                  url: "https://www.youtube.com/results?search_query=render+environment+variables+secrets+tutorial",
                },
              ],
            },
            {
              titulo: "Bloque 2: Entender el porqué",
              lecciones: [
                {
                  id: "render-3",
                  titulo: "Conceptos: PORT, disco efímero, auto-deploy",
                  detalle:
                    "Doc oficial (render.com/docs/free, traducible). Por qué el token se perdía y por qué la env var lo resolvió.",
                  url: "https://render.com/docs/free",
                },
              ],
            },
            {
              titulo: "Bloque 3: Practicar",
              lecciones: [
                {
                  id: "render-4",
                  titulo: "Practica en tu propio servicio",
                  detalle:
                    "Abre una bandeja en el dashboard. Revisa env vars, logs, Events. Haz un cambio y observa el auto-deploy.",
                  url: "",
                },
              ],
            },
          ],
        },
        // ---------- RUTA 5: Claude ----------
        {
          id: "claude",
          titulo: "Anthropic Academy · Claude",
          color: "#C9A227",
          horas: "17–18 h",
          resumen:
            "Dominio del ecosistema Claude: chat, API, Claude Code, agentes, Skills, MCP. ~8 certificados oficiales.",
          porque:
            "Es tu herramienta central y la base de casi todo lo que construyes. Mayor retorno.",
          bloques: [
            {
              titulo: "Día 1: Cimientos",
              lecciones: [
                {
                  id: "claude-1",
                  titulo: "Claude 101",
                  detalle: "Familias Opus/Sonnet/Haiku, Projects, Artifacts.",
                  url: "https://anthropic.skilljar.com/claude-101",
                },
                {
                  id: "claude-2",
                  titulo: "AI Fluency: Framework & Foundations",
                  detalle: "Pensar con IA, no teclear. Framework 4D.",
                  url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
                },
              ],
            },
            {
              titulo: "Días 2–3: La API",
              lecciones: [
                {
                  id: "claude-3",
                  titulo: "Building with the Claude API",
                  detalle:
                    "~8h (repartir en 2 días). Tool use, structured outputs, arquitecturas agénticas, RAG.",
                  url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api",
                },
              ],
            },
            {
              titulo: "Día 4: Claude Code y ecosistema",
              lecciones: [
                {
                  id: "claude-4",
                  titulo: "Claude Code in Action",
                  detalle: "Arquitectura, gestión de contexto, comandos, hooks, SDK, GitHub.",
                  url: "https://anthropic.skilljar.com/claude-code-in-action",
                },
                {
                  id: "claude-5",
                  titulo: "Introduction to Agent Skills",
                  detalle: "SKILL.md, frontmatter, triggers, compartir en equipo.",
                  url: "https://anthropic.skilljar.com/introduction-to-agent-skills",
                },
              ],
            },
            {
              titulo: "Día 5: Subagents + MCP",
              lecciones: [
                {
                  id: "claude-6",
                  titulo: "Introduction to Subagents",
                  detalle: "Delegar tareas a sub-agentes aislados.",
                  url: "https://anthropic.skilljar.com/introduction-to-subagents",
                },
                {
                  id: "claude-7",
                  titulo: "Introduction to MCP",
                  detalle: "Servidores/clientes MCP en Python. Tools, Resources, Prompts.",
                  url: "https://anthropic.skilljar.com/introduction-to-model-context-protocol",
                },
              ],
            },
            {
              titulo: "Día 6: MCP avanzado",
              lecciones: [
                {
                  id: "claude-8",
                  titulo: "MCP: Advanced Topics",
                  detalle: "Sampling, notificaciones, transport, control de acceso.",
                  url: "https://anthropic.skilljar.com/model-context-protocol-advanced-topics",
                },
              ],
            },
          ],
        },
        // ---------- RUTA 6: Python ----------
        {
          id: "python",
          titulo: "Python desde cero",
          color: "#3776AB",
          horas: "12–18 h",
          resumen:
            "Tu segundo lenguaje. Apóyate en todo lo que ya sabes de JavaScript: los conceptos son los mismos, cambia la sintaxis. Puerta de entrada a datos, MCP y el curso de Anthropic.",
          porque:
            "El curso 'Building with the Claude API' y MCP usan Python. Además es el lenguaje del mundo de datos (Paquete 3). Con tu base de JS, aprenderlo es sobre todo traducir lo que ya entiendes.",
          bloques: [
            {
              titulo: "Día 1: Fundamentos (lo mismo que JS, otra sintaxis)",
              lecciones: [
                {
                  id: "py-1",
                  titulo: "Curso: Python for Beginners (freeCodeCamp)",
                  detalle:
                    "Variables, tipos, condicionales, bucles, funciones, listas y diccionarios. Compáralo mentalmente con JS: var→sin var, {}→indentación, array→list, object→dict.",
                  url: "https://www.youtube.com/results?search_query=python+for+beginners+freecodecamp",
                },
                {
                  id: "py-2",
                  titulo: "Práctica: traduce un script de JS a Python",
                  detalle:
                    "Toma algo simple que ya escribiste en JS (un bucle, una función) y reescríbelo en Python. Ver las dos versiones lado a lado fija la diferencia de sintaxis.",
                  url: "",
                },
              ],
            },
            {
              titulo: "Día 2: Lo asíncrono y peticiones (tu terreno conocido)",
              lecciones: [
                {
                  id: "py-3",
                  titulo: "Peticiones HTTP en Python (requests / httpx)",
                  detalle:
                    "El equivalente de fetch en Python. Consumir una API, parsear JSON. Lo mismo que ya dominas, con la librería de Python.",
                  url: "",
                },
                {
                  id: "py-4",
                  titulo: "async/await en Python",
                  detalle:
                    "Sí, Python también tiene async/await. El concepto que ya entendiste aplica igual; solo cambia cómo se escribe.",
                  url: "",
                },
              ],
            },
            {
              titulo: "Día 3: Aplicar a tu stack",
              lecciones: [
                {
                  id: "py-5",
                  titulo: "Mini-proyecto: un script Python que use una API real",
                  detalle:
                    "Construye algo pequeño que consuma una API (Claude, o cualquiera con key). Prepara el terreno para 'Building with the Claude API' y MCP, que son en Python.",
                  url: "",
                },
              ],
            },
          ],
        },
        // ---------- RUTA 7: n8n ----------
        {
          id: "n8n",
          titulo: "Dominar n8n",
          color: "#EA4B71",
          horas: "4–5 h",
          resumen:
            "Automatización visual. Formalizar tu agente diario y construir los nuevos flujos que tienes en mente.",
          porque:
            "Tienes más proyectos en mente → la inversión se amortiza en varios. No es desde cero: ya lo usas.",
          bloques: [
            {
              titulo: "Día 1: Fundamentos sólidos",
              lecciones: [
                {
                  id: "n8n-1",
                  titulo: "Curso: n8n Masterclass (Nate Herk)",
                  detalle:
                    "~1h30. Interfaz, workflows, nodos, +300 integraciones, agentes con RAG, webhooks, manejo de errores.",
                  url: "https://www.youtube.com/results?search_query=n8n+masterclass+nate+herk+beginner+to+pro",
                },
                {
                  id: "n8n-2",
                  titulo: "Referencia oficial: n8n Academy",
                  detalle: "N8N101 (primeros workflows) y N8N102 (APIs e integraciones).",
                  url: "https://docs.n8n.io/video-courses/",
                },
              ],
            },
            {
              titulo: "Día 2: Profundizar + construir",
              lecciones: [
                {
                  id: "n8n-3",
                  titulo: "Temas avanzados que te faltan",
                  detalle:
                    "Error Workflows (los mensajes duplicados), sub-workflows, webhooks, nodo Code.",
                  url: "",
                },
                {
                  id: "n8n-4",
                  titulo: "Construye uno de tus flujos nuevos",
                  detalle:
                    "Toma una automatización en mente y constrúyela de punta a punta con manejo de errores.",
                  url: "",
                },
              ],
            },
          ],
        },
      ],
    },
    // ====== PAQUETES FUTUROS ======
    {
      id: "p2",
      numero: 2,
      titulo: "Cloud / Infraestructura",
      resumen:
        "Una nube a elegir (Google Cloud, AWS o Azure). Cuando Render se quede corto y necesites infraestructura seria.",
      estado: "proximamente",
      color: "#4A90D9",
      rutas: [],
    },
    {
      id: "p3",
      numero: 3,
      titulo: "Datos / Analítica",
      resumen:
        "El mundo de datos: SQL, Python para datos, y plataformas como Databricks. Tu hueco actual en analítica.",
      estado: "proximamente",
      color: "#E0712F",
      rutas: [],
    },
  ],
};
