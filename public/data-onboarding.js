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
              notionKey: "Inducción corporativa Lore + Maya",
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
              noti: "NGR — plataforma de entretenimiento y hospitalidad de Intercorp (1 grupo, ~30 empresas).\n- ~8,000 colaboradores · 14 años · ~400 tiendas en 17 locales\n- Cultura centrada en las personas (Great Place to Work)\n- Cross con Cineplanet, Casa Andina y La Tinka; Delia Bustamante (cross)\n- Áreas: Compras, Auditoría, Procesos, Asuntos Corporativos\nNota: pendiente pedir el video a Maya."
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
              notionKey: "Firma de documentos. Rodo",
              noti: "Compensaciones (Rodo)\n- Planillas; a los 3 años se pasa a planilla\n- Proyecto Nómina\n- Productividad y horarios\n- Tableros en Qlik Sense y Power BI\n- Repositorio en la nube"
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
              notionKey: "Visita PAPA JOHNS",
              evidencias: [
                {
                  file: "Presentación PJ 2026.pdf",
                  ruta: FUENTES + "Presentación PJ 2026.pdf",
                  arch: "Business review de Papa John's a mayo 2026 (24 láminas: «Quiénes somos / Cómo estamos / A dónde vamos»). Escala de la marca: S/200M de facturación, +1,650 colaboradores, 77 tiendas y 2 QCC a nivel nacional. Posicionamiento «Expertos en Pizza / Pizza Cult», con RTB de masa fresca nunca congelada e insumos de alta calidad. Mezcla de canales (SSS): Agregadores es el mayor (mix ~35%), seguido de Salón inline (~25%), Web (~17%) y Salón FC (~16%); las palancas son campañas, alianzas y espacios en Rappi/PedidosYa. Por categoría, «Disruptive Value» crece fuerte (+69% de venta, apalancado en promociones) mientras «Abundant Value» cae (-48%); venta total S/4.0M (+7.3% vs 2025). Pirámide de gestión a mayo: ventas S/83.4MM (+3.5% vs 2025, -2% vs ppto), SSS +1.4%, Food Cost -31.4%, Labor -8.9%, EBITDA S/11.9MM (14.3%, +1.1pp); OSAT 78%, rotación 56% (mejorando), clima 93%. KPIs operativos may/jun: OSAT 88%, Food Cost 31.8%, Labor 8.7%, RNT 30%. Enfoque 2H'26 «La experiencia se construye con velocidad» —muy relevante para TI—: KDS «Pedido Listo» (2 tiendas operando, expansión proyectada a 20 locales), impresión automática en 56 tiendas, polígonos dinámicos de delivery y upgrade de Loginext para calcular capacidad de motorizados vs demanda y reducir anulaciones por falta de drivers (avances OSAT por tienda, p. ej. Benavides 20: 47%→69%). Cierra con el masterplan del QCC (capacidad 4,281 Tn/mes en 2026, forecast 3,843) y CAPEX."
                }
              ],
              noti: "Onboarding PJ\n- No hay claridad del proyecto Libélula\n- Reforzar la capa de lealtad de forma personalizada\n- Desfase entre los tiempos de solicitud y la respuesta oportuna de TI"
            },
            { id: "onb-s1-21-2", titulo: "Working Lunch — Julio More", persona: "Julio More", reunion: "Working Lunch", notionKey: "Working Lunch — Julio More", noti: "- Revisar el status de sus proyectos y el día a día\n- Explicación de la nueva propuesta de gestión" },
            {
              id: "onb-s1-21-3",
              titulo: "Visita Bembos",
              persona: "Henry (GO) y Nancy (GMKT)",
              reunion: "Visita Bembos · Onboarding BB",
              notionKey: "Visita BEMBOS",
              noti: "Onboarding BB\n- Reforzar el apalancamiento tecnológico\n- Salida con sentido de urgencia de los kioskos\n- Revisar el layout de la tienda y, con Operaciones, ir posicionando equipos (KDS)\n- Consolidar herramientas para atención de agregadores"
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
              notionKey: "Visita Chinawok",
              evidencias: [
                {
                  file: "CW Business Review Junio CW - vf.pdf",
                  ruta: FUENTES + "CW Business Review Junio CW - vf.pdf",
                  arch: "Business Review de China Wok a junio 2026 (6+6, 38 láminas: Revisión estratégica / Resultados —financieros, personas, operaciones, comercial— / Prioridades Q3). Estrategia: ser la marca de chifa fast food preferida, sobre los pilares «hecho al momento», conveniencia e innovación, con cobertura nacional presencial y digital. KPIs a mayo: venta S/9.2MM (+13.2% vs 2025, +5.7% vs objetivo), SSS +17.5%, Costo de venta 33.8% (mejora), Labor 10.1%, EBITDA de tienda 18.3% (S/1.7MM); OSAT 92.3% y On-Target OSAT 97.7%; clima TVNI 79%. Focos de alerta útiles para TI/operaciones: Auditoría RNT en 53.5% (objetivo 100%), Zona Verde de delivery propio 47.6%, Estabilidad Gerencial 49% y recolección de clientes únicos solo 4.3% (objetivo 30%). P&L 6+6: ventas netas S/41.7M (+8.2% vs ppto, +10.7% vs 2025), Food Cost -33.9%, EBITDA tienda AD S/8.0M (19.3%); acumulado 5+7 de S/109.3M. Palancas de Food Cost: centralizado de pollo (Cusco/Piura), pollo trozado, ajuste de precios de menuboard y recomposición en agregadores. Personas: rotación total ~68% con planes por tienda y padrinos (Comité de Rotación, Chinapits/onboarding); 90% de tiendas redujo rotación. Operaciones: despliegue de freidoras y vaporeras (licitaciones, 9 expedientes, 25 tiendas pendientes, llegada de equipos con retraso al 08/08), doble validación de inventario, balanzas de piso y checklist por turno en «Takary». Comercial/digital: venta por tienda +22% (S/212K); canales Salón (63%), Agregadores (Rappi +7%, PedidosYa +3%), Delivery Propio y Web (sesiones +79%, transacciones +59.9%, conversión 6.1%); TOM de la categoría chifas lidera Chinawok (68%); rediseño de carta en PedidosYa (de 13 a 8 categorías) y estrategia MB Yape 2026 para subir ticket. Prioridades Q3: (1) freidoras y vaporeras, (2) lanzamiento y estabilización de «Mostrazo», (3) rotación/retención en tiendas críticas."
                }
              ],
              noti: "Onboarding CW\n- Puntos de venta a renovar, alineados a la necesidad del modelo de negocio\n- Pendiente de más información orquestada por el equipo de tecnología\n- Muchas tareas operativas manuales: oportunidad de automatización"
            },
            { id: "onb-s1-22-2", titulo: "Working Lunch — Moises Godenzi", persona: "Moises Godenzi", reunion: "Working Lunch", notionKey: "Working Lunch — Moises Godenzi", noti: "- Revisar el status de sus proyectos y el día a día\n- Explicación de la nueva propuesta de gestión" },
            {
              id: "onb-s1-22-3",
              titulo: "Visita Dunkin",
              persona: "Fiorella (GU)",
              reunion: "Visita Dunkin · Onboarding DD",
              notionKey: "Visita DUNKIN",
              evidencias: [
                {
                  file: "1. Business Review Junio 2026 DD - copia.pdf",
                  ruta: FUENTES + "1. Business Review Junio 2026 DD - copia.pdf",
                  arch: "Business Review de Dunkin a junio 2026 (23 láminas: Resultados Q2 / Plan estratégico Q3 / Revisión P&L 6+6). Resultados acumulados: venta S/29.0MM (+11.2% vs 2025, -0.4% vs ppto), SSS +6.7%, Food Cost 28.3%, Labor 10.9%, EBITDA AD S/6.0M (20.7%, +2.3pp vs 2025); en Q2 la venta cae levemente vs ppto (-2.8%). Indicadores de gestión: OSAT OT 96%, RNT OT 54% (bajo objetivo), rotación 45.6% (mejora fuerte, -22.2pp), cobertura 97%, clima/TVNI 94%. Por atributo de servicio el punto débil es Velocidad (70% OT) y Exactitud/Temperatura (90% OT). Categorías SSS: Bebidas, Donuts y Sandwich; la apuesta estratégica es posicionarse como «marca de bebidas frías affordable» (refreshers, WPSA bebidas frías 172 vs objetivo 170) y desarrollar munchkins como snacking; el sandwich cae por la salida temporal del Croissant de Pollo (cambio de proveedor, 21% del mix). El On-Target por tienda es débil (18% en junio, 14/77 tiendas). Plan estratégico Q3, con mucha carga tecnológica relevante para tu rol: nuevo equipamiento KDS/ODS, dispensador de leche, PHU, BUNN té/café, Tap System y etiquetador/sellador de vasos; despliegue de Kioskos Digitales (aperturas set-26 e inlines ago-set; venta por kiosko 0.99% vs objetivo 1.5%); menu management en inlines (pilotos jul-ago); rebranding de marca (música Gen Z, uniformes, packaging de cajas y vasos, merchandising); y frente de personas (nuevo perfil de colaborador, entrenamiento FILL/REFILL, garantía «Make It Right», Hospitality Leaders, automatización de la línea de carrera T4-T3). Incluye aperturas y remodelaciones «Tiendas 360°»/terrazas (Plaza Lima Sur, RP Chorrillos, RP Arequipa, Mega Independencia, Santa Clara, Minka, Salaverry). Nota crítica para TI: «Sistemas — el proyecto Libélula inicia en setiembre» y la participación de agregadores sube de 11.7% a 12.2%. Enlaza directo con tu registro de la visita (necesidad de un Simphony alineado al negocio y horarios de soporte desalineados)."
                }
              ],
              noti: "Onboarding DD\n- Necesidad de un Simphony alineado a su estrategia de negocio\n- Revisar respuestas a nivel de data\n- Horarios de soporte desalineados con negocio (abren 7 a.m. y soporte contesta desde las 8 a.m.)"
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
            {
              id: "onb-s1-24-1",
              titulo: "Visita Popeyes",
              persona: "Gissela (GU)",
              notionKey: "Visita Popeyes",
              reunion: "Visita Popeyes · Onboarding PP",
              evidencias: [
                {
                  file: "PP Buisness review Jun 2026.pdf",
                  ruta: FUENTES + "PP Buisness review Jun 2026.pdf",
                  arch: "Business Review de Popeyes a mayo 2026 (28 láminas: Estrategia y Big Bets / Resultados —financieros, comercial, operaciones, gestión humana— / Aprendizajes). Visión: ser la marca líder de pollo frito del Perú (sabor cajún). Los cinco Big Bets 2026 incluyen uno explícitamente tecnológico: «Tecnología front y back para mejorar la experiencia del cliente», junto a comunicación, plan de expansión en Inlines, desarrollo de personas y mejora del food cost. Resultados a mayo: venta S/21.5MM (+22% vs 2025, -1.4% vs objetivo), SSS 7.2%, Costo de venta 39.7%, Labor 9.1%, EBITDA de tienda 16.5% (S/3.6MM); OSAT On-Target 91.4%. Puntos de alerta: Auditoría RNT 43% (objetivo 100%), Zona Verde de delivery propio 58.5%, y sobre todo Estabilidad Gerencial en 24% (muy baja). P&L 6+6: ventas netas S/274.3M (+25.1% vs 2025, +1.4% vs ppto), EBITDA tienda AD S/49.3M (18%); FY +S/3.32M vs ppto. Palancas de food cost/CAPEX: freidoras chinas (50% más baratas), cocinas de 70m² con layout lineal, nuggets frescos, batter local y negociación con San Fernando. Comercial: canal Salón 66.8%, Agregador 26.7%, Delivery Propio 6.5%; rebrand del Chicken Wrap y almuerzos (+120% de venta), venta sugestiva y menuboard por categorías en Salón (piloto de 8 tiendas, despliegue de 51 en julio, +3.7% de venta). La lámina clave para tu rol es «Tecnología de Punto de Venta: Libélula y KDS»: Libélula baja los tiempos de caja de 96.9s a 74.8s a nivel marca (-22s) y sube el CSAT +4.3pp; en la comparativa KDS de Pixel vs Simphony, Simphony gana con claridad (preparación 132\" vs 359\" de Pixel, total 3'24\" vs 7'28\"), lo que respalda tu postura de que Simphony y KDS son el mismo proyecto. El rollout de Libélula va por etapas (6 locales nov25-ene26, 10 al cierre de jun26 ya prendidas, 38 de delivery en ago26). En «Kioskos», 31 tiendas medium/low (2-3 kioskos + 1 caja) con despliegue Etapa 1 oct-26 (35 tiendas Lima, 58%), Etapa 2 Q1-27 (Lima y Arequipa, 73%) y Etapa 3 Q2-27 (provincia, 100%); adopción proyectada 30% al mes 6 y 40% al mes 12, con tiempo en kiosko bajando de 4 a 2 min. El aprendizaje de cierre lo confirma: el foco de experiencia es el «escalamiento de tiendas Libélula + KDS + Kioscos»."
                }
              ],
              noti: "Onboarding PP\n- Darle celeridad al Proyecto Libélula y orquestarlo con Kioskos\n- Se reafirma (de mi parte) que Simphony y KDS son el MISMO proyecto\n- Muchas tareas operativas manuales: oportunidad de automatización"
            }
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
            { id: "onb-s2-27-1", titulo: "Apertura de tienda (Bembos)", persona: "Pierina (JO)", notionKey: "Apertura Bembos", reunion: "Apertura 7:00–9:00 · tienda por definir" },
            { id: "onb-s2-27-2", titulo: "Full day con Johanna", persona: "Johanna", notionKey: "Full day Johanna", reunion: "Recorrido a tiendas (por definir)" }
          ]
        },
        { titulo: "Martes 28 · Feriado", feriado: true, lecciones: [ { id: "onb-s2-28-fer", titulo: "Feriado — Fiestas Patrias", na: true } ] },
        { titulo: "Miércoles 29 · Feriado", feriado: true, lecciones: [ { id: "onb-s2-29-fer", titulo: "Feriado — Fiestas Patrias", na: true } ] },
        { titulo: "Jueves 30", lecciones: [ { id: "onb-s2-30-1", titulo: "Cierre de tienda (Popeyes)", persona: "Lisandro (JO)", notionKey: "Cierre Popeyes", reunion: "Cierre 18:00–01:00 · Tienda Larco" } ] },
        { titulo: "Viernes 31", lecciones: [ { id: "onb-s2-31-1", titulo: "Cierre de tienda (Papa John's)", persona: "Enrique (JO)", notionKey: "Cierre Papa Johns", reunion: "Cierre 18:00–01:00 · Tienda Benavides 20" } ] }
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
            { id: "onb-s3-03-1", titulo: "Visita a plantas", persona: "Nikitza Ivankovich y Mafer", notionKey: "Visita plantas", reunion: "Esmeralda · QCC · Lince (8:30–17:00)" },
            { id: "onb-s3-03-2", titulo: "Reunión Delivery Center", persona: "Roberto y Nikitza Ivankovich", notionKey: "Delivery Center" }
          ]
        },
        {
          titulo: "Martes 4",
          lecciones: [
            { id: "onb-s3-04-1", titulo: "Visita a RANSA", persona: "Nikitza Ivankovich y Mafer", notionKey: "Visita RANSA" },
            { id: "onb-s3-04-2", titulo: "Almuerzo con Niki y Mafer", persona: "Nikitza Ivankovich y Mafer" },
            { id: "onb-s3-04-3", titulo: "One-to-one con Ana Rosa — DAF", persona: "Ana Rosa Aguirre", notionKey: "One to one Ana Rosa", alcance: "Dirección de Administración y Finanzas (DAF).", reunion: "Comunal (por confirmar)" },
            { id: "onb-s3-04-4", titulo: "One-to-one con Niki — Supply", persona: "Nikitza Ivankovich", notionKey: "One to one Niki", alcance: "Supply Chain, Delivery Center y Desarrollo de Productos.", reunion: "Comunal" }
          ]
        },
        {
          titulo: "Miércoles 5",
          lecciones: [
            { id: "onb-s3-05-1", titulo: "One-to-one con Delia — Plataforma", persona: "Delia Bustamante", notionKey: "One to one Delia", alcance: "VP de Administración y Finanzas de la plataforma de Entretenimiento y Hospitalidad.", reunion: "Comunal" },
            { id: "onb-s3-05-2", titulo: "One-to-one con Rafa", persona: "Rafael Alegría", notionKey: "One to one Rafa" }
          ]
        },
        { titulo: "Jueves 6 · Feriado", feriado: true, lecciones: [ { id: "onb-s3-06-fer", titulo: "Feriado", na: true } ] },
        { titulo: "Viernes 7", lecciones: [ { id: "onb-s3-07-1", titulo: "Visita Don Belisario", persona: "Harol (GU)", notionKey: "Visita Don Belisario", reunion: "Visita Don Belisario · Tienda TBD · Almuerzo en tienda" } ] }
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
        { titulo: "Lunes 10", lecciones: [ { id: "onb-s4-10-1", titulo: "One-to-one con Sandra — Comercial", persona: "Sandra Merino", notionKey: "One to one Sandra", alcance: "Comercial y Marketing.", reunion: "Comunal" } ] },
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
              notionKey: "Sonia",
              evidencias: [
                {
                  file: "Procesos básicos Salud, Seguridad y Servicios Generales .pdf",
                  ruta: FUENTES + "Procesos básicos Salud, Seguridad y Servicios Generales .pdf",
                  arch: "Organigrama del equipo de Salud, Seguridad y Servicios Generales, con cuatro frentes y responsables: Servicios Generales (fotocheck, huella, estacionamiento, reserva de salas, uniformes, facturas, pasajes) — Mevil Aljovin, Jessica Villanueva, Jerutza Godoy; Salud Ocupacional (altas médicas por accidente, EMO, madre gestante, salud mental, diversidad, plantas) — Edison Urquizo, Hilda La Torre; Bienestar Social (descansos médicos, subsidios, licencias con goce, EPS/Seguro Social/SCTR) — Gianella Baldeón, Kiavet Ramírez; Seguridad y Salud en el Trabajo (procedimientos SST, investigación de accidentes, IPERC, EPPs, capacitaciones, SUNAFIL, canal ético) — Katy Flores, Génesis Bolívar, Tania Espinoza, Sebastián Faucheux, Mafer Rengifo."
                }
              ],
              noti: ""
            },
            {
              id: "onb-extra-2",
              titulo: "Reunión Libélula y Kioskos",
              persona: "Julio, Andrea y Álvaro",
              dia: "Vie 24 jul",
              notionKey: "Libélula Kioskos",
              noti: "Objetivo: mapear proveedores de los proyectos Libélula (POS/Simphony) y Kioskos.\nLibélula · Proveedores\n1. Oracle — POS\n2. Applying — API\n3. Ofisistemas — Extensibility\n4. Conastec — Extensibility\n5. CGLL — Implementadores Oracle Simphony\nNota: Oracle (Mónica) confirmará el ingreso al e-learning; validar posible migración a Conastec; cerrar lo pendiente con Ofisistemas.\nConastec (Eli): experiencia limitada, alternativa a evaluar la próxima semana.\nOfisistemas (Orlando): sin problemas de capacidad; la limitante fue el tipo de impresoras.\nApplying: necesita visibilidad del paquete completo; puede ejecutar Simphony y Kioskos en paralelo; solicita reunión de alineamiento.\nKioskos · Cash Control\n1. Applying — API\n2. Synerpost / Assa — App y Hardware\nNota: Assa (Angie Ureta) puede operar los kioskos con Invoice desde el mismo equipo; evaluar contratos mensuales (reunión Julio Rivas / Angie Ureta).\nKioskos · Trade\n1. Trade — Software\n2. Trig — Hardware"
            }
          ]
        }
      ]
    }

  ]
};

/* Se expone como global para que app.js lo consuma, igual que ACADEMIA. */
