/* =====================================================================
   data-onboarding.js  —  Contenido del mundo "Onboarding"
   ---------------------------------------------------------------------
   Mismo modelo que la Academia: Paquete → Rutas → Bloques → Lecciones.
   Mapeo del onboarding:
       Paquete  = Onboarding Dirección TI
       Ruta     = Semana
       Bloque   = Día
       Lección  = Actividad  (lo que se marca como Ejecutada)

   Cada actividad extiende el esquema de lección con campos propios del
   onboarding (aditivos; no rompen el modelo de aprendizaje):
       persona    : responsable(es) de la sesión
       reunion    : nombre de la reunión  (lo que iba entre paréntesis)
       evidencia  : { file, ruta }  archivo de la carpeta Fuentes
       arch       : síntesis de lo relevante del archivo
       noti       : síntesis de tus notas de Notion de esa sesión
       na         : true  →  no cuenta para el % (feriados / bloqueos)

   El progreso (check Ejecutada) usa el MISMO mecanismo y la MISMA base
   de datos que la Academia: se guarda por el `id` de la lección.
   ===================================================================== */

const FUENTES = "D:\\DATOS\\Personales\\NGR\\02 · Onboarding\\Fuentes\\";

const ONBOARDING = {
  id: "onb",
  numero: 1,
  titulo: "Onboarding · Dirección de TI",
  resumen: "Ruta de inducción de Jaime Díaz en NGR — plataforma de entretenimiento y hospitalidad del grupo Intercorp. Del 20 de julio al 14 de agosto de 2026: inducción corporativa, visitas a las 6 marcas, plantas y logística, one-to-ones y operación de tienda. Cada actividad guarda su evidencia (archivo en Fuentes) y la síntesis de las notas de Notion.",
  estado: "activo",
  color: "#f97316",
  rutas: [

    /* ============================ SEMANA 1 ============================ */
    {
      id: "onb-s1",
      titulo: "Semana 1 · 20–24 julio",
      color: "#6366f1",
      horas: "5 días",
      resumen: "Inducción corporativa, primeras visitas a marcas (Papa John's, Bembos, China Wok, Dunkin, Popeyes) y presentación de equipos.",
      porque: "Entender la organización, la cultura y el modelo operativo de cada marca antes de entrar a los proyectos de TI.",
      bloques: [
        {
          titulo: "Lunes 20 · RRHH",
          lecciones: [
            {
              id: "onb-s1-20-1",
              titulo: "Inducción corporativa",
              persona: "Lorena y Maya",
              reunion: "Inducción corporativa (Lore + Maya) · RRHH",
              evidencias: [
                {
                  file: "Explicación Estructura NGR.jpeg",
                  ruta: FUENTES + "Explicación Estructura NGR.jpeg",
                  arch: "Pizarra con el organigrama de NGR bajo el CEO: HR (BB), FM (DD/PJ) y AP (PP/CW/DB); Marketing (Categorías, Brand/ECO, Canales Digitales); GDP (GDT, Clima/Cultura, Entrenamiento); y Operaciones por niveles de tienda: JO, Supervisor, Gerente de Tienda (T1), Asistente (T2), Líder de Turno (T3), Team Member (T4–T5) y OP Servicio."
                },
                {
                  file: "Inducción corporativa NGR 2026 - ABRIL.pdf",
                  ruta: FUENTES + "Inducción corporativa NGR 2026 - ABRIL.pdf",
                  arch: "Deck oficial de inducción (66 láminas). NGR: holding gastronómico de 6 marcas, +14 años, +8,000 colaboradores y +400 locales en 17 ciudades; sedes: 3 plantas, Call Center, Delivery Central y oficinas. Parte de Intercorp (1 grupo, +30 empresas, +101,176 colaboradores, 12 países), en la plataforma de Entretenimiento y Hospitalidad (con Casa Andina, Cineplanet y La Tinka; jefe de plataforma: Carlos Arce). Propósito: «Creamos experiencias que conectan y hacen la vida más feliz, entretenida y emocionante». Gerencia General NGR: Johanna Inti. Comité Directivo (útil para tus one-to-ones): Andrea Pardo (Sistemas), Ana Rosa Aguirre (Adm. y Finanzas/DAF), Nikitza Ivankovich (Supply Chain, Delivery Center y Desarrollo de Productos), Sandra Merino (Comercial y Marketing), Flavio Gutiérrez (Infraestructura y Mantenimiento), Lorena Arizmendi (Gestión y Desarrollo Humano), Rafael Alegría. Cultura: valores NGR (servicio, curiosidad/humildad, cuidado al detalle, perseverancia, mejora continua); programas de bienestar y salud (EPS, descansos médicos); «Cuenta Tres» (prevención de hostigamiento, diversidad e inclusión, equidad de género) con políticas de igualdad y no discriminación; y responsabilidad social e inserción laboral."
                }
              ],
              noti: "NGR es la plataforma de entretenimiento y hospitalidad de Intercorp (1 grupo, ~30 empresas). ~8,000 colaboradores, 14 años, ~400 tiendas en 17 locales. Cultura centrada en las personas (Great Place to Work). Cross con Cineplanet, Casa Andina y La Tinka; Delia Bustamante (cross). Áreas: Compras, Auditoría, Procesos, Asuntos Corporativos. Pendiente: pedir el video a Maya."
            },
            {
              id: "onb-s1-20-2",
              titulo: "Recibimiento en Comunal",
              persona: "Lorena",
              reunion: "Recorrido por oficinas"
            },
            {
              id: "onb-s1-20-3",
              titulo: "Firma de documentos",
              persona: "Rodo",
              reunion: "Firma de documentos (Rodo) · Compensaciones",
              noti: "Compensaciones (Rodo): planillas; a los 3 años se pasa a planilla; Proyecto Nómina; productividad y horarios; tableros en Qlik Sense y Power BI; repositorio en la nube."
            },
            { id: "onb-s1-20-4", titulo: "Almuerzo con Lore + Rafa", persona: "Lore + Rafa" },
            { id: "onb-s1-20-5", titulo: "Presentación de reportes directos", persona: "Rafa + Lore" },
            { id: "onb-s1-20-6", titulo: "Presentación de jefes de Sistemas", persona: "Rafa + Lore" }
          ]
        },
        {
          titulo: "Martes 21",
          lecciones: [
            {
              id: "onb-s1-21-1",
              titulo: "Visita Papa John's",
              persona: "Jorge (GU)",
              reunion: "Visita Papa John's · Onboarding PJ",
              noti: "No hay claridad del proyecto Libélula. Se necesita reforzar la capa de lealtad de forma personalizada. Hay un desfase entre los tiempos de solicitud y la respuesta oportuna por parte de TI."
            },
            { id: "onb-s1-21-2", titulo: "Working Lunch — Julio More", persona: "Julio More", reunion: "Working Lunch", noti: "Revisar el status de sus proyectos y el día a día. Explicación de la nueva propuesta de gestión." },
            {
              id: "onb-s1-21-3",
              titulo: "Visita Bembos",
              persona: "Henry (GO) y Nancy (GMKT)",
              reunion: "Visita Bembos · Onboarding BB",
              noti: "Necesidad de reforzar el apalancamiento tecnológico. Salida con sentido de urgencia de los kioskos. Revisar el layout de la tienda y, junto con Operaciones, ir posicionando equipos (KDS). Consolidar herramientas para atención de agregadores."
            }
          ]
        },
        {
          titulo: "Miércoles 22",
          lecciones: [
            {
              id: "onb-s1-22-1",
              titulo: "Visita China Wok",
              persona: "Enrique (GU)",
              reunion: "Visita China Wok · Onboarding CW",
              noti: "Puntos de venta a renovar y buscar estar alineado con la necesidad del modelo de negocio. Pendiente de más información orquestada por el equipo de tecnología. Muchas tareas operativas manuales: oportunidad de automatización."
            },
            { id: "onb-s1-22-2", titulo: "Working Lunch — Moises Godenzi", persona: "Moises Godenzi", reunion: "Working Lunch", noti: "Revisar el status de sus proyectos y el día a día. Explicación de la nueva propuesta de gestión." },
            {
              id: "onb-s1-22-3",
              titulo: "Visita Dunkin",
              persona: "Fiorella (GU)",
              reunion: "Visita Dunkin · Onboarding DD",
              noti: "Necesidad de tener un Simphony alineado a su estrategia de negocio. Revisar respuestas a nivel de data. Horarios de soporte desalineados con negocio (abren 7 a.m. y soporte contesta desde las 8 a.m.)."
            }
          ]
        },
        {
          titulo: "Jueves 23 · Feriado",
          feriado: true,
          lecciones: [ { id: "onb-s1-23-fer", titulo: "Feriado", na: true } ]
        },
        {
          titulo: "Viernes 24",
          lecciones: [
            { id: "onb-s1-24-1", titulo: "Visita Popeyes", persona: "Gissela (GU)", reunion: "Visita Popeyes · Tienda TBD · Almuerzo en tienda" }
          ]
        }
      ]
    },

    /* ============================ SEMANA 2 ============================ */
    {
      id: "onb-s2",
      titulo: "Semana 2 · 27–31 julio",
      color: "#ef4444",
      horas: "5 días",
      resumen: "Operación real de tienda: apertura, full day con Johanna y cierres nocturnos. Incluye feriados de Fiestas Patrias.",
      porque: "Vivir la operación de tienda de punta a punta (apertura y cierre) para dimensionar la carga operativa y el rol de la tecnología.",
      bloques: [
        {
          titulo: "Lunes 27",
          lecciones: [
            { id: "onb-s2-27-1", titulo: "Apertura de tienda (Bembos)", persona: "Pierina (JO)", reunion: "Apertura 7:00–9:00 · tienda por definir" },
            { id: "onb-s2-27-2", titulo: "Full day con Johanna", persona: "Johanna", reunion: "Recorrido a tiendas (por definir)" }
          ]
        },
        { titulo: "Martes 28 · Feriado", feriado: true, lecciones: [ { id: "onb-s2-28-fer", titulo: "Feriado — Fiestas Patrias", na: true } ] },
        { titulo: "Miércoles 29 · Feriado", feriado: true, lecciones: [ { id: "onb-s2-29-fer", titulo: "Feriado — Fiestas Patrias", na: true } ] },
        { titulo: "Jueves 30", lecciones: [ { id: "onb-s2-30-1", titulo: "Cierre de tienda (Popeyes)", persona: "Lisandro (JO)", reunion: "Cierre 18:00–01:00 · Tienda Larco" } ] },
        { titulo: "Viernes 31", lecciones: [ { id: "onb-s2-31-1", titulo: "Cierre de tienda (Papa John's)", persona: "Enrique (JO)", reunion: "Cierre 18:00–01:00 · Tienda Benavides 20" } ] }
      ]
    },

    /* ============================ SEMANA 3 ============================ */
    {
      id: "onb-s3",
      titulo: "Semana 3 · 3–7 agosto",
      color: "#8b5cf6",
      horas: "5 días",
      resumen: "Cadena de suministro (plantas, RANSA, Delivery Center) y one-to-ones con líderes de área.",
      porque: "Conocer la trastienda logística y a los líderes de las áreas con las que TI trabajará de forma transversal.",
      bloques: [
        {
          titulo: "Lunes 3",
          lecciones: [
            { id: "onb-s3-03-1", titulo: "Visita a plantas", persona: "Nikitza Ivankovich y Mafer", reunion: "Esmeralda · QCC · Lince (8:30–17:00)" },
            { id: "onb-s3-03-2", titulo: "Reunión Delivery Center", persona: "Roberto y Nikitza Ivankovich" }
          ]
        },
        {
          titulo: "Martes 4",
          lecciones: [
            { id: "onb-s3-04-1", titulo: "Visita a RANSA", persona: "Nikitza Ivankovich y Mafer" },
            { id: "onb-s3-04-2", titulo: "Almuerzo con Niki y Mafer", persona: "Nikitza Ivankovich y Mafer" },
            { id: "onb-s3-04-3", titulo: "One-to-one con Ana Rosa — DAF", persona: "Ana Rosa Aguirre", reunion: "Comunal (por confirmar)" },
            { id: "onb-s3-04-4", titulo: "One-to-one con Niki — Supply", persona: "Nikitza Ivankovich", reunion: "Comunal" }
          ]
        },
        {
          titulo: "Miércoles 5",
          lecciones: [
            { id: "onb-s3-05-1", titulo: "One-to-one con Delia — Plataforma", persona: "Delia Bustamante", reunion: "Comunal" },
            { id: "onb-s3-05-2", titulo: "One-to-one con Rafa", persona: "Rafael Alegría" }
          ]
        },
        { titulo: "Jueves 6 · Feriado", feriado: true, lecciones: [ { id: "onb-s3-06-fer", titulo: "Feriado", na: true } ] },
        { titulo: "Viernes 7", lecciones: [ { id: "onb-s3-07-1", titulo: "Visita Don Belisario", persona: "Harol (GU)", reunion: "Visita Don Belisario · Tienda TBD · Almuerzo en tienda" } ] }
      ]
    },

    /* ============================ SEMANA 4 ============================ */
    {
      id: "onb-s4",
      titulo: "Semana 4 · 10–14 agosto",
      color: "#14b8a6",
      horas: "En planificación",
      resumen: "One-to-ones finales y cierre de la ruta de inducción.",
      porque: "Cerrar la etapa de inducción y aterrizar prioridades con las áreas comercial y de negocio.",
      bloques: [
        { titulo: "Lunes 10", lecciones: [ { id: "onb-s4-10-1", titulo: "One-to-one con Sandra — Comercial", persona: "Sandra Merino", reunion: "Comunal" } ] },
        { titulo: "Martes 11 – Viernes 14", lecciones: [ { id: "onb-s4-resto", titulo: "Por planificar", na: true } ] }
      ]
    },

    /* ======================== FUERA DE AGENDA ========================= */
    {
      id: "onb-extra",
      titulo: "Fuera de agenda · No planificadas",
      color: "#eab308",
      horas: "—",
      resumen: "Reuniones que no estaban en el cronograma pero tienen nombre e información asociada.",
      porque: "Registrar sesiones espontáneas con valor para el onboarding.",
      bloques: [
        {
          titulo: "Sesiones no planificadas",
          lecciones: [
            {
              id: "onb-extra-1",
              titulo: "Salud, Seguridad y Servicios Generales",
              persona: "Sonia",
              dia: "Lun 20 jul",
              evidencias: [
                {
                  file: "Procesos básicos Salud, Seguridad y Servicios Generales .pdf",
                  ruta: FUENTES + "Procesos básicos Salud, Seguridad y Servicios Generales .pdf",
                  arch: "Organigrama del equipo de Salud, Seguridad y Servicios Generales, con cuatro frentes y responsables: Servicios Generales (fotocheck, huella, estacionamiento, reserva de salas, uniformes, facturas, pasajes) — Mevil Aljovin, Jessica Villanueva, Jerutza Godoy; Salud Ocupacional (altas médicas por accidente, EMO, madre gestante, salud mental, diversidad, plantas) — Edison Urquizo, Hilda La Torre; Bienestar Social (descansos médicos, subsidios, licencias con goce, EPS/Seguro Social/SCTR) — Gianella Baldeón, Kiavet Ramírez; Seguridad y Salud en el Trabajo (procedimientos SST, investigación de accidentes, IPERC, EPPs, capacitaciones, SUNAFIL, canal ético) — Katy Flores, Génesis Bolívar, Tania Espinoza, Sebastián Faucheux, Mafer Rengifo."
                }
              ],
              noti: ""
            }
          ]
        }
      ]
    }

  ]
};

/* Se expone como global para que app.js lo consuma, igual que ACADEMIA. */
