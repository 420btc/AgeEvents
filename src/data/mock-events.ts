import { HistoricalEvent } from "../types/types"; // Asegúrate de que esta ruta sea correcta para tu proyecto

export const generateMockEvents = (birthDate: Date): HistoricalEvent[] => {
  // Generate events based on the user's birth year
  const events: HistoricalEvent[] = [
    // Eventos del ejemplo original
    {
      id: "event-1",
      title: "Lanzamiento del iPhone",
      description: "Apple presentó el primer iPhone, revolucionando los móviles.",
      date: new Date(2007, 0, 9), // Mes 0 es Enero
      category: "Tecnología",
      location: "San Francisco, EE.UU.",
      impact: "Transformó la tecnología móvil y la era de los smartphones."
    },
    {
      id: "event-2",
      title: "Caída del Muro de Berlín",
      description: "El Muro de Berlín fue derribado, marcando un cambio global.",
      date: new Date(1989, 10, 9), // Mes 10 es Noviembre
      category: "Política",
      location: "Berlín, Alemania",
      impact: "Simbolizó el fin de la Guerra Fría y reunificó Alemania."
    },
    {
      id: "event-3",
      title: "Primer navegador web gráfico (Mosaic)",
      description: "Lanzamiento de NCSA Mosaic, popularizando la WWW.",
      date: new Date(1993, 3, 22), // Mes 3 es Abril
      category: "Tecnología",
      location: "Champaign, Illinois, EE.UU.",
      impact: "Sentó las bases para la adopción masiva de Internet."
    },
    {
      id: "event-4",
      title: "Descubrimiento del bosón de Higgs",
      description: "CERN anunció el descubrimiento de la partícula de Higgs.",
      date: new Date(2012, 6, 4), // Mes 6 es Julio
      category: "Ciencia",
      location: "Ginebra, Suiza",
      impact: "Validó el Modelo Estándar de física de partículas."
    },
    {
      id: "event-5",
      title: "Lanzamiento de Netflix Streaming",
      description: "Netflix comenzó su servicio de streaming online.",
      date: new Date(2007, 0, 15), // Mes 0 es Enero
      category: "Cultura",
      location: "Los Gatos, California, EE.UU.",
      impact: "Revolucionó el consumo de contenido audiovisual."
    },
    {
      id: "event-6",
      title: "Declaración de Pandemia de COVID-19",
      description: "La OMS declaró al COVID-19 como pandemia global.",
      date: new Date(2020, 2, 11), // Mes 2 es Marzo
      category: "Salud",
      location: "Global",
      impact: "Crisis sanitaria mundial, cambios sociales y económicos."
    },
    {
      id: "event-7",
      title: "Creación de Facebook",
      description: "Mark Zuckerberg lanzó Facebook desde Harvard.",
      date: new Date(2004, 1, 4), // Mes 1 es Febrero
      category: "Tecnología",
      location: "Cambridge, Massachusetts, EE.UU.",
      impact: "Transformó la comunicación social y la publicidad digital."
    },
    {
      id: "event-8",
      title: "Primera misión tripulada a la Luna (Apollo 11)",
      description: "Humanos pisan la Luna por primera vez.",
      date: new Date(1969, 6, 20), // Mes 6 es Julio
      category: "Ciencia",
      location: "Luna",
      impact: "Gran logro tecnológico, expandió la exploración espacial."
    },
    // Eventos Adicionales
    {
      id: "event-9",
      title: "Nacimiento de la World Wide Web",
      description: "Tim Berners-Lee publica la primera página web en CERN.",
      date: new Date(1991, 7, 6), // Mes 7 es Agosto
      category: "Tecnología",
      location: "Ginebra, Suiza",
      impact: "Fundación de la web moderna y la comunicación global."
    },
    {
      id: "event-10",
      title: "Lanzamiento del Telescopio Espacial Hubble",
      description: "El Hubble es desplegado, revolucionando la astronomía.",
      date: new Date(1990, 3, 24), // Mes 3 es Abril
      category: "Ciencia",
      location: "Espacio (órbita terrestre)",
      impact: "Imágenes icónicas y descubrimientos sobre el universo."
    },
    {
      id: "event-11",
      title: "Fin del Apartheid en Sudáfrica",
      description: "Nelson Mandela liberado, inicio del desmantelamiento del apartheid.",
      date: new Date(1990, 1, 11), // Mes 1 es Febrero (liberación de Mandela)
      category: "Política",
      location: "Sudáfrica",
      impact: "Transición a una democracia multirracial."
    },
    {
      id: "event-12",
      title: "Atentados del 11 de septiembre",
      description: "Ataques terroristas contra el World Trade Center y el Pentágono.",
      date: new Date(2001, 8, 11), // Mes 8 es Septiembre
      category: "Conflictos",
      location: "Nueva York y Arlington, EE.UU.",
      impact: "Inició la 'Guerra contra el terrorismo' y cambió la geopolítica."
    },
    {
      id: "event-13",
      title: "Lanzamiento de Google",
      description: "Larry Page y Sergey Brin fundan Google Inc.",
      date: new Date(1998, 8, 4), // Mes 8 es Septiembre
      category: "Tecnología",
      location: "Menlo Park, California, EE.UU.",
      impact: "Revolucionó la búsqueda de información en internet."
    },
    {
      id: "event-14",
      title: "Tsunami del Océano Índico",
      description: "Un terremoto masivo genera un tsunami devastador.",
      date: new Date(2004, 11, 26), // Mes 11 es Diciembre
      category: "Desastres Naturales",
      location: "Océano Índico (Indonesia, Tailandia, etc.)",
      impact: "Cientos de miles de muertes y destrucción masiva."
    },
    {
      id: "event-15",
      title: "Creación de la Unión Europea (Tratado de Maastricht)",
      description: "Entra en vigor el Tratado de Maastricht, fundando la UE.",
      date: new Date(1993, 10, 1), // Mes 10 es Noviembre
      category: "Política",
      location: "Maastricht, Países Bajos (firma)",
      impact: "Profundizó la integración económica y política en Europa."
    },
    {
      id: "event-16",
      title: "Lanzamiento de Wikipedia",
      description: "Jimmy Wales y Larry Sanger lanzan la enciclopedia libre online.",
      date: new Date(2001, 0, 15), // Mes 0 es Enero
      category: "Cultura",
      location: "Internet",
      impact: "Transformó el acceso al conocimiento y la colaboración."
    },
    {
      id: "event-17",
      title: "Lanzamiento de YouTube",
      description: "Se funda la plataforma de compartición de videos YouTube.",
      date: new Date(2005, 1, 14), // Mes 1 es Febrero
      category: "Tecnología",
      location: "San Bruno, California, EE.UU.",
      impact: "Revolucionó la creación y consumo de video online."
    },
    {
      id: "event-18",
      title: "Crisis financiera global de 2008",
      description: "Colapso de Lehman Brothers desencadena una crisis mundial.",
      date: new Date(2008, 8, 15), // Mes 8 es Septiembre
      category: "Economía",
      location: "Global (originada en EE.UU.)",
      impact: "Recesión económica global y cambios regulatorios."
    },
    {
      id: "event-19",
      title: "Primavera Árabe",
      description: "Ola de protestas y levantamientos en el mundo árabe.",
      date: new Date(2010, 11, 18), // Mes 11 es Diciembre (inicio en Túnez)
      category: "Política",
      location: "Múltiples países del Norte de África y Oriente Medio",
      impact: "Caída de regímenes, guerras civiles y cambios políticos."
    },
    {
      id: "event-20",
      title: "Lanzamiento de Twitter",
      description: "Jack Dorsey y otros lanzan la plataforma de microblogging.",
      date: new Date(2006, 2, 21), // Mes 2 es Marzo
      category: "Tecnología",
      location: "San Francisco, EE.UU.",
      impact: "Cambió la comunicación en tiempo real y el activismo."
    },
    {
      id: "event-21",
      title: "Desciframiento del Genoma Humano",
      description: "Se completa el borrador inicial del genoma humano.",
      date: new Date(2000, 5, 26), // Mes 5 es Junio (anuncio)
      category: "Ciencia",
      location: "Global (colaboración internacional)",
      impact: "Avances en medicina, genética y biotecnología."
    },
    {
      id: "event-22",
      title: "Introducción del Euro como moneda física",
      description: "Billetes y monedas de Euro entran en circulación.",
      date: new Date(2002, 0, 1), // Mes 0 es Enero
      category: "Economía",
      location: "Eurozona",
      impact: "Unificación monetaria para millones de europeos."
    },
    {
      id: "event-23",
      title: "Muerte de Michael Jackson",
      description: "Fallece el 'Rey del Pop', generando conmoción mundial.",
      date: new Date(2009, 5, 25), // Mes 5 es Junio
      category: "Cultura",
      location: "Los Ángeles, EE.UU.",
      impact: "Pérdida de un icono musical global."
    },
    {
      id: "event-24",
      title: "Lanzamiento de SpaceX Falcon Heavy",
      description: "Primer vuelo exitoso del cohete reutilizable Falcon Heavy.",
      date: new Date(2018, 1, 6), // Mes 1 es Febrero
      category: "Tecnología",
      location: "Cabo Cañaveral, EE.UU.",
      impact: "Hito en la cohetería reutilizable y exploración espacial comercial."
    },
    {
      id: "event-25",
      title: "Acuerdo de París sobre el Clima",
      description: "Países acuerdan limitar el calentamiento global.",
      date: new Date(2015, 11, 12), // Mes 11 es Diciembre
      category: "Política",
      location: "París, Francia",
      impact: "Compromiso global para combatir el cambio climático."
    },
    {
      id: "event-26",
      title: "Lanzamiento del Kindle de Amazon",
      description: "Amazon lanza su primer lector de libros electrónicos.",
      date: new Date(2007, 10, 19), // Mes 10 es Noviembre
      category: "Tecnología",
      location: "EE.UU.",
      impact: "Popularizó la lectura digital y los e-books."
    },
    {
      id: "event-27",
      title: "Legalización del matrimonio igualitario en España",
      description: "España se convierte en uno de los primeros países en legalizarlo.",
      date: new Date(2005, 6, 3), // Mes 6 es Julio
      category: "Sociedad",
      location: "España",
      impact: "Avance en derechos LGTBIQ+."
    },
    {
      id: "event-28",
      title: "Nacimiento de Dolly, la oveja clonada",
      description: "Se anuncia el primer mamífero clonado a partir de una célula adulta.",
      date: new Date(1996, 6, 5), // Mes 6 es Julio (nacimiento, anuncio en 1997)
      category: "Ciencia",
      location: "Edimburgo, Escocia",
      impact: "Hito en biotecnología y debate ético sobre clonación."
    },
    {
      id: "event-29",
      title: "Lanzamiento de la Estación Espacial Internacional (ISS) - Módulo Zarya",
      description: "Se lanza el primer módulo de la ISS, Zarya.",
      date: new Date(1998, 10, 20), // Mes 10 es Noviembre
      category: "Ciencia",
      location: "Espacio (lanzamiento desde Baikonur)",
      impact: "Inicio de la construcción del mayor satélite artificial habitado."
    },
    {
      id: "event-30",
      title: "Terremoto y tsunami de Japón de 2011",
      description: "Un potente terremoto provoca un tsunami y el desastre de Fukushima.",
      date: new Date(2011, 2, 11), // Mes 2 es Marzo
      category: "Desastres Naturales",
      location: "Japón",
      impact: "Devastación, crisis nuclear y revisión de seguridad atómica."
    },
    {
      id: "event-31",
      title: "Lanzamiento de Instagram",
      description: "Se lanza la aplicación para compartir fotos y videos.",
      date: new Date(2010, 9, 6), // Mes 9 es Octubre
      category: "Tecnología",
      location: "San Francisco, EE.UU.",
      impact: "Popularizó la fotografía móvil y las redes visuales."
    },
    {
      id: "event-32",
      title: "Elección de Barack Obama",
      description: "Barack Obama es elegido como el primer presidente afroamericano de EE.UU.",
      date: new Date(2008, 10, 4), // Mes 10 es Noviembre
      category: "Política",
      location: "EE.UU.",
      impact: "Hito histórico en la política estadounidense y global."
    },
    {
      id: "event-33",
      title: "Referéndum del Brexit",
      description: "Reino Unido vota a favor de salir de la Unión Europea.",
      date: new Date(2016, 5, 23), // Mes 5 es Junio
      category: "Política",
      location: "Reino Unido",
      impact: "Proceso de salida de la UE con consecuencias económicas y políticas."
    },
    {
      id: "event-34",
      title: "Lanzamiento de Spotify",
      description: "Se lanza el servicio de streaming de música Spotify.",
      date: new Date(2008, 9, 7), // Mes 9 es Octubre
      category: "Cultura",
      location: "Estocolmo, Suecia",
      impact: "Transformó la industria musical y el consumo de música."
    },
    {
      id: "event-35",
      title: "Movimiento Me Too (#MeToo)",
      description: "El hashtag #MeToo se vuelve viral, denunciando el acoso sexual.",
      date: new Date(2017, 9, 15), // Mes 9 es Octubre (viralización)
      category: "Sociedad",
      location: "Global (originado en EE.UU.)",
      impact: "Concienciación global sobre el acoso y abuso sexual."
    },
    {
      id: "event-36",
      title: "Descubrimiento de los primeros exoplanetas",
      description: "Michel Mayor y Didier Queloz anuncian el primer exoplaneta orbitando una estrella similar al Sol.",
      date: new Date(1995, 9, 6), // Mes 9 es Octubre (anuncio de 51 Pegasi b)
      category: "Ciencia",
      location: "Observatorio de Haute-Provence, Francia",
      impact: "Abrió el campo de estudio de planetas fuera de nuestro sistema solar."
    },
    {
      id: "event-37",
      title: "Atentados de Madrid (11M)",
      description: "Una serie de atentados terroristas en trenes de cercanías de Madrid.",
      date: new Date(2004, 2, 11), // Mes 2 es Marzo
      category: "Conflictos",
      location: "Madrid, España",
      impact: "Mayor atentado terrorista en la historia de España."
    },
    {
      id: "event-38",
      title: "Lanzamiento de Android OS",
      description: "Se anuncia la Open Handset Alliance y el sistema operativo Android.",
      date: new Date(2007, 10, 5), // Mes 10 es Noviembre
      category: "Tecnología",
      location: "EE.UU.",
      impact: "Se convirtió en el SO móvil dominante a nivel mundial."
    },
    {
      id: "event-39",
      title: "Lanzamiento de Bitcoin (Whitepaper)",
      description: "Satoshi Nakamoto publica el whitepaper de Bitcoin.",
      date: new Date(2008, 9, 31), // Mes 9 es Octubre
      category: "Tecnología",
      location: "Internet",
      impact: "Creación de la primera criptomoneda descentralizada."
    },
    {
      id: "event-40",
      title: "Invasión de Irak de 2003",
      description: "Una coalición liderada por EE.UU. invade Irak.",
      date: new Date(2003, 2, 20), // Mes 2 es Marzo
      category: "Conflictos",
      location: "Irak",
      impact: "Derrocamiento de Saddam Hussein, larga insurgencia e inestabilidad regional."
    },

    {
        id: "event-42",
        title: "Muerte de la Princesa Diana",
        description: "Diana, Princesa de Gales, muere en un accidente de coche en París.",
        date: new Date(1997, 7, 31), // Mes 7 es Agosto
        category: "Sociedad",
        location: "París, Francia",
        impact: "Conmoción mundial y debate sobre el papel de los medios."
    },
    {
        id: "event-43",
        title: "Lanzamiento de Windows 95",
        description: "Microsoft lanza el influyente sistema operativo Windows 95.",
        date: new Date(1995, 7, 24), // Mes 7 es Agosto
        category: "Tecnología",
        location: "Redmond, EE.UU.",
        impact: "Popularizó la interfaz gráfica y el botón de Inicio en PC."
    },
    {
        id: "event-44",
        title: "Juegos Olímpicos de Barcelona '92",
        description: "Celebración de los XXV Juegos Olímpicos de Verano.",
        date: new Date(1992, 6, 25), // Mes 6 es Julio (ceremonia de apertura)
        category: "Deportes",
        location: "Barcelona, España",
        impact: "Transformación de la ciudad y éxito organizativo recordado."
    },
    {
        id: "event-45",
        title: "Lanzamiento de la PlayStation original",
        description: "Sony lanza su primera consola de videojuegos, la PlayStation.",
        date: new Date(1994, 11, 3), // Mes 11 es Diciembre (Japón)
        category: "Tecnología",
        location: "Japón",
        impact: "Revolucionó la industria de los videojuegos con gráficos 3D."
    },
    {
        id: "event-46",
        title: "Efecto 2000 (Y2K Bug)",
        description: "Preocupación mundial por un posible fallo informático masivo al cambiar de año.",
        date: new Date(1999, 11, 31), // Mes 11 es Diciembre
        category: "Tecnología",
        location: "Global",
        impact: "Gran inversión en sistemas, pero el impacto fue mínimo."
    },
    {
        id: "event-47",
        title: "Final del Mundial de Fútbol 2010 (España Campeona)",
        description: "España gana su primer Mundial de Fútbol en Sudáfrica.",
        date: new Date(2010, 6, 11), // Mes 6 es Julio
        category: "Deportes",
        location: "Johannesburgo, Sudáfrica",
        impact: "Hito histórico para el deporte español."
    },
    {
        id: "event-48",
        title: "Lanzamiento de la saga Harry Potter (primer libro)",
        description: "J.K. Rowling publica 'Harry Potter y la piedra filosofal'.",
        date: new Date(1997, 5, 26), // Mes 5 es Junio
        category: "Cultura",
        location: "Reino Unido",
        impact: "Fenómeno literario global que revitalizó la lectura juvenil."
    },
    {
        id: "event-49",
        title: "Rover Perseverance aterriza en Marte",
        description: "El rover de la NASA aterriza con éxito en el cráter Jezero.",
        date: new Date(2021, 1, 18), // Mes 1 es Febrero
        category: "Ciencia",
        location: "Marte",
        impact: "Búsqueda de signos de vida antigua y recolección de muestras."
    },
    {
        id: "event-50",
        title: "Lanzamiento del primer Tesla Roadster",
        description: "Tesla Motors lanza su primer vehículo eléctrico deportivo.",
        date: new Date(2008, 1, 1), // Mes 1 es Febrero (inicio producción)
        category: "Tecnología",
        location: "San Carlos, California, EE.UU.",
        impact: "Demostró la viabilidad de los coches eléctricos de alto rendimiento."
    },
    {
        id: "event-51",
        title: "Creación de la Corte Penal Internacional",
        description: "Entra en vigor el Estatuto de Roma, estableciendo la CPI.",
        date: new Date(2002, 6, 1), // Mes 6 es Julio
        category: "Política",
        location: "La Haya, Países Bajos",
        impact: "Primer tribunal permanente para juzgar crímenes de guerra y genocidio."
    },
    {
        id: "event-52",
        title: "Ola de calor europea de 2003",
        description: "Una intensa ola de calor causa decenas de miles de muertes en Europa.",
        date: new Date(2003, 7, 1), // Mes 7 es Agosto (pico)
        category: "Desastres Naturales",
        location: "Europa",
        impact: "Crisis sanitaria y mayor conciencia sobre el cambio climático."
    },
    {
        id: "event-53",
        title: "Lanzamiento de WhatsApp",
        description: "Se lanza la popular aplicación de mensajería instantánea.",
        date: new Date(2009, 4, 3), // Mes 4 es Mayo (aproximado, lanzamiento inicial)
        category: "Tecnología",
        location: "Santa Clara, California, EE.UU.",
        impact: "Revolucionó la comunicación móvil personal y grupal."
    },
    {
        id: "event-54",
        title: "Descubrimiento del Grafeno",
        description: "Andre Geim y Konstantin Novoselov aíslan y caracterizan el grafeno.",
        date: new Date(2004, 9, 22), // Mes 9 es Octubre (publicación científica)
        category: "Ciencia",
        location: "Mánchester, Reino Unido",
        impact: "Descubrimiento de un material bidimensional con propiedades extraordinarias."
    },
    {
        id: "event-55",
        title: "Estreno de 'Avatar' de James Cameron",
        description: "La película se convierte en la más taquillera de la historia (en su momento).",
        date: new Date(2009, 11, 18), // Mes 11 es Diciembre (estreno EE.UU.)
        category: "Cultura",
        location: "Global",
        impact: "Impulsó la tecnología 3D en el cine y batió récords de taquilla."
    },
    // Eventos importantes 1940-1980
    {
        id: "event-76",
        title: "Fin de la Segunda Guerra Mundial",
        description: "Alemania y Japón se rinden, terminando la Segunda Guerra Mundial.",
        date: new Date(1945, 8, 2), // Mes 8 es Septiembre
        category: "Conflictos",
        location: "Global",
        impact: "Reconfiguración del orden mundial y inicio de la era nuclear."
    },
    {
        id: "event-77",
        title: "Creación de las Naciones Unidas",
        description: "Se establece la ONU para mantener la paz mundial.",
        date: new Date(1945, 9, 24), // Mes 9 es Octubre
        category: "Política",
        location: "San Francisco, EE.UU.",
        impact: "Nueva arquitectura de cooperación internacional."
    },
    {
        id: "event-78",
        title: "Bombas atómicas de Hiroshima y Nagasaki",
        description: "EE.UU. lanza las primeras bombas nucleares en guerra.",
        date: new Date(1945, 7, 6), // Mes 7 es Agosto
        category: "Conflictos",
        location: "Hiroshima y Nagasaki, Japón",
        impact: "Inicio de la era nuclear y cambio en la guerra moderna."
    },
    {
        id: "event-79",
        title: "Creación del Estado de Israel",
        description: "Declaración de independencia del Estado de Israel.",
        date: new Date(1948, 4, 14), // Mes 4 es Mayo
        category: "Política",
        location: "Palestina/Israel",
        impact: "Reconfiguración geopolítica de Oriente Medio."
    },
    {
        id: "event-80",
        title: "Plan Marshall",
        description: "EE.UU. lanza programa de ayuda para reconstruir Europa.",
        date: new Date(1947, 5, 5), // Mes 5 es Junio
        category: "Economía",
        location: "Europa Occidental",
        impact: "Reconstrucción europea y fortalecimiento de alianzas occidentales."
    },
    {
        id: "event-81",
        title: "Guerra de Corea",
        description: "Conflicto entre Corea del Norte y del Sur con intervención internacional.",
        date: new Date(1950, 5, 25), // Mes 5 es Junio
        category: "Conflictos",
        location: "Península de Corea",
        impact: "Primera guerra 'caliente' de la Guerra Fría."
    },
    {
        id: "event-82",
        title: "Descubrimiento de la estructura del ADN",
        description: "Watson, Crick, Franklin y Wilkins descubren la doble hélice del ADN.",
        date: new Date(1953, 3, 25), // Mes 3 es Abril
        category: "Ciencia",
        location: "Cambridge, Reino Unido",
        impact: "Revolución en biología molecular y medicina moderna."
    },
    {
        id: "event-83",
        title: "Muerte de Stalin",
        description: "Fallece Iósif Stalin, líder de la Unión Soviética.",
        date: new Date(1953, 2, 5), // Mes 2 es Marzo
        category: "Política",
        location: "Moscú, URSS",
        impact: "Inicio de la desestalinización y cambios en la Guerra Fría."
    },
    {
        id: "event-84",
        title: "Lanzamiento del Sputnik",
        description: "La URSS lanza el primer satélite artificial.",
        date: new Date(1957, 9, 4), // Mes 9 es Octubre
        category: "Ciencia",
        location: "Kazajistán, URSS",
        impact: "Inicio de la carrera espacial y la era espacial."
    },
    {
        id: "event-85",
        title: "Revolución Cubana",
        description: "Fidel Castro toma el poder en Cuba.",
        date: new Date(1959, 0, 1), // Mes 0 es Enero
        category: "Política",
        location: "La Habana, Cuba",
        impact: "Establecimiento del primer estado socialista en América."
    },
    {
        id: "event-86",
        title: "Construcción del Muro de Berlín",
        description: "Alemania Oriental construye el Muro de Berlín.",
        date: new Date(1961, 7, 13), // Mes 7 es Agosto
        category: "Política",
        location: "Berlín, Alemania",
        impact: "Símbolo físico de la división de la Guerra Fría."
    },
    {
        id: "event-87",
        title: "Crisis de los Misiles de Cuba",
        description: "Confrontación nuclear entre EE.UU. y la URSS.",
        date: new Date(1962, 9, 14), // Mes 9 es Octubre
        category: "Conflictos",
        location: "Cuba y global",
        impact: "Momento más cercano a una guerra nuclear global."
    },
    {
        id: "event-88",
        title: "Asesinato de John F. Kennedy",
        description: "El presidente estadounidense es asesinado en Dallas.",
        date: new Date(1963, 10, 22), // Mes 10 es Noviembre
        category: "Política",
        location: "Dallas, Texas, EE.UU.",
        impact: "Trauma nacional y cambio en la política estadounidense."
    },
    {
        id: "event-89",
        title: "Discurso 'I Have a Dream' de Martin Luther King",
        description: "Histórico discurso por los derechos civiles en Washington.",
        date: new Date(1963, 7, 28), // Mes 7 es Agosto
        category: "Sociedad",
        location: "Washington D.C., EE.UU.",
        impact: "Momento cumbre del movimiento por los derechos civiles."
    },
    {
        id: "event-90",
        title: "Guerra de Vietnam (escalada estadounidense)",
        description: "EE.UU. aumenta masivamente su intervención en Vietnam.",
        date: new Date(1965, 2, 8), // Mes 2 es Marzo
        category: "Conflictos",
        location: "Vietnam",
        impact: "Conflicto que dividió a la sociedad estadounidense."
    },
    {
        id: "event-91",
        title: "Mayo del 68 en Francia",
        description: "Protestas estudiantiles y huelgas generales en Francia.",
        date: new Date(1968, 4, 3), // Mes 4 es Mayo
        category: "Sociedad",
        location: "París, Francia",
        impact: "Movimiento que inspiró protestas globales y cambio social."
    },
    {
        id: "event-92",
        title: "Festival de Woodstock",
        description: "Icónico festival de música que definió la contracultura.",
        date: new Date(1969, 7, 15), // Mes 7 es Agosto
        category: "Cultura",
        location: "Nueva York, EE.UU.",
        impact: "Símbolo de la contracultura y la música rock."
    },
    {
        id: "event-93",
        title: "Primer trasplante de corazón",
        description: "Christiaan Barnard realiza el primer trasplante cardíaco.",
        date: new Date(1967, 11, 3), // Mes 11 es Diciembre
        category: "Salud",
        location: "Ciudad del Cabo, Sudáfrica",
        impact: "Avance revolucionario en cirugía y medicina."
    },
    {
        id: "event-94",
        title: "Watergate y renuncia de Nixon",
        description: "El escándalo Watergate lleva a la renuncia del presidente Nixon.",
        date: new Date(1974, 7, 9), // Mes 7 es Agosto
        category: "Política",
        location: "Washington D.C., EE.UU.",
        impact: "Crisis de confianza en las instituciones estadounidenses."
    },
    {
        id: "event-95",
        title: "Crisis del petróleo de 1973",
        description: "Embargo petrolero árabe causa crisis energética global.",
        date: new Date(1973, 9, 17), // Mes 9 es Octubre
        category: "Economía",
        location: "Global",
        impact: "Cambió la geopolítica energética mundial."
    },
    // Eventos importantes 2010-2024
    {
        id: "event-56",
        title: "Lanzamiento de ChatGPT",
        description: "OpenAI lanza ChatGPT, popularizando la IA conversacional.",
        date: new Date(2022, 10, 30), // Mes 10 es Noviembre
        category: "Tecnología",
        location: "San Francisco, EE.UU.",
        impact: "Revolución en IA accesible al público general."
    },
    {
        id: "event-57",
        title: "Guerra en Ucrania",
        description: "Rusia invade Ucrania, iniciando un conflicto a gran escala.",
        date: new Date(2022, 1, 24), // Mes 1 es Febrero
        category: "Conflictos",
        location: "Ucrania",
        impact: "Crisis humanitaria y geopolítica global."
    },
    {
        id: "event-58",
        title: "Lanzamiento de TikTok globalmente",
        description: "TikTok se expande mundialmente tras fusionarse con Musical.ly.",
        date: new Date(2018, 7, 2), // Mes 7 es Agosto
        category: "Tecnología",
        location: "Global",
        impact: "Transformó el consumo de video corto y la cultura digital."
    },
    {
        id: "event-59",
        title: "Muerte de la Reina Isabel II",
        description: "Fallece la Reina Isabel II tras 70 años de reinado.",
        date: new Date(2022, 8, 8), // Mes 8 es Septiembre
        category: "Sociedad",
        location: "Balmoral, Escocia",
        impact: "Fin de la era más larga de la monarquía británica."
    },
    {
        id: "event-60",
        title: "Primera imagen de un agujero negro",
        description: "El Event Horizon Telescope captura la primera imagen de un agujero negro.",
        date: new Date(2019, 3, 10), // Mes 3 es Abril
        category: "Ciencia",
        location: "Galaxia M87",
        impact: "Confirmación visual de la teoría de la relatividad de Einstein."
    },
    {
        id: "event-61",
        title: "Lanzamiento de Disney+",
        description: "Disney lanza su plataforma de streaming Disney+.",
        date: new Date(2019, 10, 12), // Mes 10 es Noviembre
        category: "Cultura",
        location: "EE.UU.",
        impact: "Intensificó la guerra del streaming y cambió el entretenimiento."
    },
    {
        id: "event-62",
        title: "Protestas Black Lives Matter 2020",
        description: "Ola masiva de protestas tras la muerte de George Floyd.",
        date: new Date(2020, 4, 25), // Mes 4 es Mayo
        category: "Sociedad",
        location: "EE.UU. y mundial",
        impact: "Movimiento global por la justicia racial."
    },
    {
        id: "event-63",
        title: "Lanzamiento de las vacunas COVID-19",
        description: "Primeras vacunas contra COVID-19 aprobadas y distribuidas.",
        date: new Date(2020, 11, 8), // Mes 11 es Diciembre
        category: "Salud",
        location: "Global",
        impact: "Hito científico en desarrollo de vacunas en tiempo récord."
    },
    {
        id: "event-64",
        title: "Asalto al Capitolio de EE.UU.",
        description: "Manifestantes asaltan el Capitolio durante la certificación electoral.",
        date: new Date(2021, 0, 6), // Mes 0 es Enero
        category: "Política",
        location: "Washington D.C., EE.UU.",
        impact: "Crisis democrática y polarización política extrema."
    },
    {
        id: "event-65",
        title: "Lanzamiento del James Webb Space Telescope",
        description: "NASA lanza el telescopio espacial más avanzado de la historia.",
        date: new Date(2021, 11, 25), // Mes 11 es Diciembre
        category: "Ciencia",
        location: "Espacio (lanzamiento desde Guayana Francesa)",
        impact: "Revolución en astronomía y observación del universo primitivo."
    },
    {
        id: "event-66",
        title: "Adquisición de Twitter por Elon Musk",
        description: "Elon Musk compra Twitter por 44 mil millones de dólares.",
        date: new Date(2022, 9, 27), // Mes 9 es Octubre
        category: "Tecnología",
        location: "Global",
        impact: "Transformación radical de la plataforma y debates sobre libertad de expresión."
    },
    {
        id: "event-67",
        title: "Lanzamiento de Zoom (popularización)",
        description: "Zoom se populariza masivamente durante la pandemia.",
        date: new Date(2020, 2, 15), // Mes 2 es Marzo
        category: "Tecnología",
        location: "Global",
        impact: "Normalizó el trabajo remoto y las videollamadas."
    },
    {
        id: "event-68",
        title: "Incendios forestales de Australia",
        description: "Devastadores incendios forestales arrasan Australia.",
        date: new Date(2019, 11, 1), // Mes 11 es Diciembre
        category: "Desastres Naturales",
        location: "Australia",
        impact: "Crisis ambiental y pérdida masiva de biodiversidad."
    },
    {
        id: "event-69",
        title: "Lanzamiento de GPT-3",
        description: "OpenAI lanza GPT-3, modelo de lenguaje revolucionario.",
        date: new Date(2020, 5, 11), // Mes 5 es Junio
        category: "Tecnología",
        location: "San Francisco, EE.UU.",
        impact: "Avance significativo en inteligencia artificial generativa."
    },
    {
        id: "event-70",
        title: "Explosión en Beirut",
        description: "Masiva explosión en el puerto de Beirut causa devastación.",
        date: new Date(2020, 7, 4), // Mes 7 es Agosto
        category: "Desastres Naturales",
        location: "Beirut, Líbano",
        impact: "Crisis humanitaria y política en Líbano."
    },
    {
        id: "event-71",
        title: "Lanzamiento de Apple Vision Pro",
        description: "Apple presenta su primer dispositivo de realidad mixta.",
        date: new Date(2023, 5, 5), // Mes 5 es Junio
        category: "Tecnología",
        location: "Cupertino, EE.UU.",
        impact: "Entrada de Apple en realidad virtual/aumentada."
    },
    {
        id: "event-72",
        title: "Mundial de Fútbol Qatar 2022",
        description: "Se celebra el primer Mundial de Fútbol en Oriente Medio.",
        date: new Date(2022, 10, 20), // Mes 10 es Noviembre
        category: "Deportes",
        location: "Qatar",
        impact: "Mundial controvertido por derechos humanos y clima."
    },
    {
        id: "event-73",
        title: "Lanzamiento de NFTs (boom)",
        description: "Los NFTs experimentan un boom masivo de popularidad.",
        date: new Date(2021, 2, 1), // Mes 2 es Marzo
        category: "Tecnología",
        location: "Global",
        impact: "Nueva forma de propiedad digital y arte."
    },
    {
        id: "event-74",
        title: "Terremoto de Turquía y Siria",
        description: "Devastador terremoto de magnitud 7.8 afecta ambos países.",
        date: new Date(2023, 1, 6), // Mes 1 es Febrero
        category: "Desastres Naturales",
        location: "Turquía y Siria",
        impact: "Decenas de miles de víctimas y destrucción masiva."
    },
    {
        id: "event-75",
        title: "Lanzamiento de Threads por Meta",
        description: "Meta lanza Threads como competidor de Twitter.",
        date: new Date(2023, 6, 5), // Mes 6 es Julio
        category: "Tecnología",
        location: "Global",
        impact: "Nueva competencia en redes sociales de texto."
    },
    // Eventos adicionales para completar 100
    {
        id: "event-96",
        title: "Invención de la Imprenta",
        description: "Johannes Gutenberg inventa la imprenta de tipos móviles.",
        date: new Date(1440, 0, 1), // Aproximadamente 1440
        category: "Tecnología",
        location: "Maguncia, Alemania",
        impact: "Revolución en la difusión del conocimiento y la alfabetización."
    },
    {
        id: "event-97",
        title: "Descubrimiento de América",
        description: "Cristóbal Colón llega a América en su primer viaje.",
        date: new Date(1492, 9, 12), // Mes 9 es Octubre
        category: "Exploración",
        location: "Islas del Caribe",
        impact: "Inicio de la colonización europea de América."
    },
    {
        id: "event-98",
        title: "Revolución Francesa",
        description: "Inicio de la Revolución Francesa con la toma de la Bastilla.",
        date: new Date(1789, 6, 14), // Mes 6 es Julio
        category: "Política",
        location: "París, Francia",
        impact: "Fin del Antiguo Régimen y nacimiento de la democracia moderna."
    },
    {
        id: "event-99",
        title: "Revolución Industrial",
        description: "Inicio de la Primera Revolución Industrial en Inglaterra.",
        date: new Date(1760, 0, 1), // Aproximadamente 1760
        category: "Economía",
        location: "Inglaterra",
        impact: "Transformación de la producción y la sociedad moderna."
    },
    {
        id: "event-100",
        title: "Independencia de Estados Unidos",
        description: "Declaración de Independencia de las Trece Colonias.",
        date: new Date(1776, 6, 4), // Mes 6 es Julio
        category: "Política",
        location: "Filadelfia, EE.UU.",
        impact: "Nacimiento de Estados Unidos y modelo para otras independencias."
    },
    {
        id: "event-101",
        title: "Abolición de la Esclavitud en EE.UU.",
        description: "La Decimotercera Enmienda prohíbe la esclavitud.",
        date: new Date(1865, 11, 6), // Mes 11 es Diciembre
        category: "Sociedad",
        location: "Estados Unidos",
        impact: "Fin legal de la esclavitud en Estados Unidos."
    },
    {
        id: "event-102",
        title: "Invención del Teléfono",
        description: "Alexander Graham Bell patenta el teléfono.",
        date: new Date(1876, 2, 10), // Mes 2 es Marzo
        category: "Tecnología",
        location: "Boston, EE.UU.",
        impact: "Revolución en las comunicaciones a larga distancia."
    },
    {
        id: "event-103",
        title: "Descubrimiento de la Penicilina",
        description: "Alexander Fleming descubre la penicilina.",
        date: new Date(1928, 8, 3), // Mes 8 es Septiembre
        category: "Salud",
        location: "Londres, Reino Unido",
        impact: "Inicio de la era de los antibióticos y medicina moderna."
    },
    {
        id: "event-104",
        title: "Primer Vuelo de los Hermanos Wright",
        description: "Primer vuelo motorizado exitoso de la historia.",
        date: new Date(1903, 11, 17), // Mes 11 es Diciembre
        category: "Tecnología",
        location: "Kitty Hawk, Carolina del Norte, EE.UU.",
        impact: "Inicio de la era de la aviación."
    },
    {
        id: "event-105",
        title: "Teoría de la Relatividad de Einstein",
        description: "Einstein publica su teoría especial de la relatividad.",
        date: new Date(1905, 5, 30), // Mes 5 es Junio
        category: "Ciencia",
        location: "Berna, Suiza",
        impact: "Revolución en la física y comprensión del universo."
    },
    {
        id: "event-106",
        title: "Invención de la Radio",
        description: "Guglielmo Marconi realiza la primera transmisión de radio.",
        date: new Date(1895, 0, 1), // Aproximadamente 1895
        category: "Tecnología",
        location: "Italia",
        impact: "Revolución en las comunicaciones masivas."
    },
    {
        id: "event-107",
        title: "Descubrimiento de los Rayos X",
        description: "Wilhelm Röntgen descubre los rayos X.",
        date: new Date(1895, 10, 8), // Mes 10 es Noviembre
        category: "Ciencia",
        location: "Würzburg, Alemania",
        impact: "Revolución en medicina y diagnóstico médico."
    },
    {
        id: "event-108",
        title: "Invención de la Televisión",
        description: "John Logie Baird realiza la primera demostración de TV.",
        date: new Date(1926, 0, 26), // Mes 0 es Enero
        category: "Tecnología",
        location: "Londres, Reino Unido",
        impact: "Transformación del entretenimiento y la información."
    },
    {
        id: "event-109",
        title: "Descubrimiento de la Electricidad",
        description: "Benjamin Franklin demuestra la naturaleza eléctrica del rayo.",
        date: new Date(1752, 5, 15), // Mes 5 es Junio
        category: "Ciencia",
        location: "Filadelfia, EE.UU.",
        impact: "Fundamentos para el desarrollo de la era eléctrica."
    },
    {
        id: "event-110",
        title: "Invención de la Máquina de Vapor",
        description: "James Watt mejora la máquina de vapor de Newcomen.",
        date: new Date(1769, 0, 5), // Mes 0 es Enero
        category: "Tecnología",
        location: "Escocia",
        impact: "Motor de la Revolución Industrial."
    },
    {
        id: "event-111",
        title: "Primer Ordenador Electrónico (ENIAC)",
        description: "Se completa ENIAC, uno de los primeros ordenadores.",
        date: new Date(1946, 1, 14), // Mes 1 es Febrero
        category: "Tecnología",
        location: "Filadelfia, EE.UU.",
        impact: "Inicio de la era de la computación."
    },
    {
        id: "event-112",
        title: "Invención del Transistor",
        description: "Bell Labs inventa el transistor.",
        date: new Date(1947, 11, 23), // Mes 11 es Diciembre
        category: "Tecnología",
        location: "Nueva Jersey, EE.UU.",
        impact: "Fundamento de toda la electrónica moderna."
    },
    {
        id: "event-113",
        title: "Lanzamiento del Primer Satélite Artificial",
        description: "La URSS lanza el Sputnik 1.",
        date: new Date(1957, 9, 4), // Mes 9 es Octubre
        category: "Ciencia",
        location: "Kazajistán, URSS",
        impact: "Inicio de la era espacial y la carrera espacial."
    },
    {
        id: "event-114",
        title: "Invención del Láser",
        description: "Theodore Maiman construye el primer láser funcional.",
        date: new Date(1960, 4, 16), // Mes 4 es Mayo
        category: "Tecnología",
        location: "California, EE.UU.",
        impact: "Aplicaciones en medicina, industria y comunicaciones."
    },
    {
        id: "event-115",
        title: "Primer Trasplante de Órgano Exitoso",
        description: "Primer trasplante de riñón exitoso entre gemelos.",
        date: new Date(1954, 11, 23), // Mes 11 es Diciembre
        category: "Salud",
        location: "Boston, EE.UU.",
        impact: "Inicio de la medicina de trasplantes."
    },
    {
        id: "event-116",
        title: "Descubrimiento de la Vacuna contra la Polio",
        description: "Jonas Salk desarrolla la primera vacuna contra la polio.",
        date: new Date(1955, 3, 12), // Mes 3 es Abril
        category: "Salud",
        location: "Pittsburgh, EE.UU.",
        impact: "Erradicación virtual de la poliomielitis."
    },
    {
        id: "event-117",
        title: "Invención del Microchip",
        description: "Jack Kilby inventa el circuito integrado.",
        date: new Date(1958, 8, 12), // Mes 8 es Septiembre
        category: "Tecnología",
        location: "Texas, EE.UU.",
        impact: "Miniaturización de la electrónica y computación."
    },
    {
        id: "event-118",
        title: "Primer Vuelo Comercial",
        description: "Primer vuelo comercial regular con pasajeros.",
        date: new Date(1914, 0, 1), // Mes 0 es Enero
        category: "Tecnología",
        location: "Florida, EE.UU.",
        impact: "Inicio de la aviación comercial."
    },
    {
        id: "event-119",
        title: "Invención de la Fotografía",
        description: "Louis Daguerre perfecciona el proceso fotográfico.",
        date: new Date(1839, 7, 19), // Mes 7 es Agosto
        category: "Tecnología",
        location: "París, Francia",
        impact: "Revolución en el arte, periodismo y documentación."
    },
    {
        id: "event-120",
        title: "Descubrimiento de la Anestesia",
        description: "Primera cirugía con anestesia general exitosa.",
        date: new Date(1846, 9, 16), // Mes 9 es Octubre
        category: "Salud",
        location: "Boston, EE.UU.",
        impact: "Revolución en la cirugía y medicina."
    }
  ];

  // Filter events based on birth date (only include events after birth)
  const filteredEvents = events.filter(event => {
    // Comprobar que la fecha del evento es válida antes de comparar
    if (event.date instanceof Date && !isNaN(event.date.getTime())) {
      return event.date > birthDate;
    }
    return false; // Si la fecha no es válida, no incluir
  });

  // Sort events by date
  filteredEvents.sort((a, b) => {
    const timeA = a.date instanceof Date ? a.date.getTime() : 0;
    const timeB = b.date instanceof Date ? b.date.getTime() : 0;
    return timeA - timeB;
  });

  return filteredEvents;
};

// Ejemplo de uso (opcional, para probarlo):
// const myBirthDate = new Date(1990, 0, 1); // 1 de Enero de 1990
// const myTimelineEvents = generateMockEvents(myBirthDate);
// console.log(`Eventos después de ${myBirthDate.toLocaleDateString()}:`);
// myTimelineEvents.forEach(event => {
//   console.log(`- ${event.title} (${event.date.toLocaleDateString()})`);
// });
