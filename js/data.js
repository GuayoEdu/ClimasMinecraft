const biomas = [
  {
    id: 1,
    nombre: "Nether Wastes",
    icono: "🔥",
    temperatura: "48°C",
    estado: "Muy caliente",
    humedad: "10%",
    viento: "20 km/h",
    semana: [
      { dia: "Lunes", temp: "47°C", estado: "Seco" },
      { dia: "Martes", temp: "49°C", estado: "Lava alta" },
      { dia: "Miércoles", temp: "48°C", estado: "Ceniza" },
      { dia: "Jueves", temp: "46°C", estado: "Seco" },
      { dia: "Viernes", temp: "50°C", estado: "Muy caliente" },
      { dia: "Sábado", temp: "49°C", estado: "Lava alta" },
      { dia: "Domingo", temp: "47°C", estado: "Ceniza" }
    ]
  },
  {
    id: 2,
    nombre: "Crimson Forest",
    icono: "🍄",
    temperatura: "39°C",
    estado: "Húmedo",
    humedad: "70%",
    viento: "8 km/h",
    semana: [
      { dia: "Lunes", temp: "38°C", estado: "Esporas" },
      { dia: "Martes", temp: "39°C", estado: "Niebla roja" },
      { dia: "Miércoles", temp: "40°C", estado: "Húmedo" },
      { dia: "Jueves", temp: "39°C", estado: "Esporas" },
      { dia: "Viernes", temp: "41°C", estado: "Niebla roja" },
      { dia: "Sábado", temp: "40°C", estado: "Húmedo" },
      { dia: "Domingo", temp: "39°C", estado: "Esporas" }
    ]
  },
  {
    id: 3,
    nombre: "Warped Forest",
    icono: "💙",
    temperatura: "28°C",
    estado: "Templado",
    humedad: "55%",
    viento: "6 km/h",
    semana: [
      { dia: "Lunes", temp: "27°C", estado: "Calma" },
      { dia: "Martes", temp: "28°C", estado: "Niebla azul" },
      { dia: "Miércoles", temp: "29°C", estado: "Templado" },
      { dia: "Jueves", temp: "28°C", estado: "Calma" },
      { dia: "Viernes", temp: "30°C", estado: "Niebla azul" },
      { dia: "Sábado", temp: "29°C", estado: "Templado" },
      { dia: "Domingo", temp: "28°C", estado: "Calma" }
    ]
  },
  {
    id: 4,
    nombre: "Basalt Deltas",
    icono: "🪨",
    temperatura: "34°C",
    estado: "Ventoso",
    humedad: "20%",
    viento: "30 km/h",
    semana: [
      { dia: "Lunes", temp: "33°C", estado: "Ceniza" },
      { dia: "Martes", temp: "35°C", estado: "Ventoso" },
      { dia: "Miércoles", temp: "34°C", estado: "Rocas calientes" },
      { dia: "Jueves", temp: "33°C", estado: "Ceniza" },
      { dia: "Viernes", temp: "36°C", estado: "Ventoso" },
      { dia: "Sábado", temp: "35°C", estado: "Rocas calientes" },
      { dia: "Domingo", temp: "34°C", estado: "Ceniza" }
    ]
  },
  {
    id: 5,
    nombre: "Soul Sand Valley",
    icono: "💀",
    temperatura: "18°C",
    estado: "Frío raro",
    humedad: "35%",
    viento: "18 km/h",
    semana: [
      { dia: "Lunes", temp: "17°C", estado: "Neblina" },
      { dia: "Martes", temp: "18°C", estado: "Frío" },
      { dia: "Miércoles", temp: "19°C", estado: "Almas flotando" },
      { dia: "Jueves", temp: "18°C", estado: "Neblina" },
      { dia: "Viernes", temp: "20°C", estado: "Frío" },
      { dia: "Sábado", temp: "19°C", estado: "Almas flotando" },
      { dia: "Domingo", temp: "18°C", estado: "Neblina" }
    ]
  },
  {
    id: 6,
    nombre: "Fortaleza del Nether",
    icono: "🏰",
    temperatura: "42°C",
    estado: "Calor seco",
    humedad: "15%",
    viento: "12 km/h",
    semana: [
      { dia: "Lunes", temp: "41°C", estado: "Seco" },
      { dia: "Martes", temp: "42°C", estado: "Blaze activo" },
      { dia: "Miércoles", temp: "43°C", estado: "Calor seco" },
      { dia: "Jueves", temp: "42°C", estado: "Seco" },
      { dia: "Viernes", temp: "44°C", estado: "Blaze activo" },
      { dia: "Sábado", temp: "43°C", estado: "Calor seco" },
      { dia: "Domingo", temp: "42°C", estado: "Seco" }
    ]
  },
  {
    id: 7,
    nombre: "Bastion Remnant",
    icono: "🐷",
    temperatura: "37°C",
    estado: "Nublado",
    humedad: "25%",
    viento: "14 km/h",
    semana: [
      { dia: "Lunes", temp: "36°C", estado: "Polvo" },
      { dia: "Martes", temp: "37°C", estado: "Nublado" },
      { dia: "Miércoles", temp: "38°C", estado: "Ruinas calientes" },
      { dia: "Jueves", temp: "37°C", estado: "Polvo" },
      { dia: "Viernes", temp: "39°C", estado: "Nublado" },
      { dia: "Sábado", temp: "38°C", estado: "Ruinas calientes" },
      { dia: "Domingo", temp: "37°C", estado: "Polvo" }
    ]
  },
  {
    id: 8,
    nombre: "Lago de Lava",
    icono: "🌋",
    temperatura: "55°C",
    estado: "Extremo",
    humedad: "5%",
    viento: "10 km/h",
    semana: [
      { dia: "Lunes", temp: "54°C", estado: "Lava alta" },
      { dia: "Martes", temp: "55°C", estado: "Extremo" },
      { dia: "Miércoles", temp: "56°C", estado: "Burbujeante" },
      { dia: "Jueves", temp: "55°C", estado: "Lava alta" },
      { dia: "Viernes", temp: "57°C", estado: "Extremo" },
      { dia: "Sábado", temp: "56°C", estado: "Burbujeante" },
      { dia: "Domingo", temp: "55°C", estado: "Lava alta" }
    ]
  },
  {
    id: 9,
    nombre: "Cueva de Glowstone",
    icono: "✨",
    temperatura: "31°C",
    estado: "Brillante",
    humedad: "40%",
    viento: "4 km/h",
    semana: [
      { dia: "Lunes", temp: "30°C", estado: "Brillo suave" },
      { dia: "Martes", temp: "31°C", estado: "Brillante" },
      { dia: "Miércoles", temp: "32°C", estado: "Luz alta" },
      { dia: "Jueves", temp: "31°C", estado: "Brillo suave" },
      { dia: "Viernes", temp: "33°C", estado: "Brillante" },
      { dia: "Sábado", temp: "32°C", estado: "Luz alta" },
      { dia: "Domingo", temp: "31°C", estado: "Brillo suave" }
    ]
  },
  {
    id: 10,
    nombre: "Portal Arruinado",
    icono: "🟣",
    temperatura: "26°C",
    estado: "Inestable",
    humedad: "45%",
    viento: "9 km/h",
    semana: [
      { dia: "Lunes", temp: "25°C", estado: "Energía baja" },
      { dia: "Martes", temp: "26°C", estado: "Inestable" },
      { dia: "Miércoles", temp: "27°C", estado: "Chispas" },
      { dia: "Jueves", temp: "26°C", estado: "Energía baja" },
      { dia: "Viernes", temp: "28°C", estado: "Inestable" },
      { dia: "Sábado", temp: "27°C", estado: "Chispas" },
      { dia: "Domingo", temp: "26°C", estado: "Energía baja" }
    ]
  }
];
