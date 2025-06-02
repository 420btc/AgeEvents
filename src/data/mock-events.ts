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
        id: "event-41",
        title: "Apertura del Eurotúnel",
        description: "Inauguración oficial del túnel bajo el Canal de la Mancha.",
        date: new Date(1994, 4, 6), // Mes 4 es Mayo
        category: "Ingeniería",
        location: "Calais (Francia) y Folkestone (Reino Unido)",
        impact: "Conexión terrestre directa entre Reino Unido y Europa continental."
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
    }
    // Puedes seguir añadiendo más eventos aquí si lo deseas
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
