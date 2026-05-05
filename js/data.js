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
      { dia: "Lunes", temp: "47°C", min: 47, max: 49, estado: "Seco" },
      { dia: "Martes", temp: "49°C", min: 48, max: 50, estado: "Lava alta" },
      { dia: "Miércoles", temp: "48°C", min: 47, max: 49, estado: "Ceniza" },
      { dia: "Jueves", temp: "46°C", min: 45, max: 47, estado: "Seco" },
      { dia: "Viernes", temp: "50°C", min: 49, max: 51, estado: "Muy caliente" },
      { dia: "Sábado", temp: "49°C", min: 48, max: 50, estado: "Lava alta" },
      { dia: "Domingo", temp: "47°C", min: 46, max: 48, estado: "Ceniza" }
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
      { dia: "Lunes", temp: "38°C", min: 37, max: 39, estado: "Esporas" },
      { dia: "Martes", temp: "39°C", min: 38, max: 40, estado: "Niebla roja" },
      { dia: "Miércoles", temp: "40°C", min: 39, max: 41, estado: "Húmedo" },
      { dia: "Jueves", temp: "39°C", min: 38, max: 40, estado: "Esporas" },
      { dia: "Viernes", temp: "41°C", min: 40, max: 42, estado: "Niebla roja" },
      { dia: "Sábado", temp: "40°C", min: 39, max: 41, estado: "Húmedo" },
      { dia: "Domingo", temp: "39°C", min: 38, max: 40, estado: "Esporas" }
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
      { dia: "Lunes", temp: "27°C", min: 26, max: 28, estado: "Calma" },
      { dia: "Martes", temp: "28°C", min: 27, max: 29, estado: "Niebla azul" },
      { dia: "Miércoles", temp: "29°C", min: 28, max: 30, estado: "Templado" },
      { dia: "Jueves", temp: "28°C", min: 27, max: 29, estado: "Calma" },
      { dia: "Viernes", temp: "30°C", min: 29, max: 31, estado: "Niebla azul" },
      { dia: "Sábado", temp: "29°C", min: 28, max: 30, estado: "Templado" },
      { dia: "Domingo", temp: "28°C", min: 27, max: 29, estado: "Calma" }
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
      { dia: "Lunes", temp: "33°C", min: 32, max: 34, estado: "Ceniza" },
      { dia: "Martes", temp: "35°C", min: 34, max: 36, estado: "Ventoso" },
      { dia: "Miércoles", temp: "34°C", min: 33, max: 35, estado: "Rocas calientes" },
      { dia: "Jueves", temp: "33°C", min: 32, max: 34, estado: "Ceniza" },
      { dia: "Viernes", temp: "36°C", min: 35, max: 37, estado: "Ventoso" },
      { dia: "Sábado", temp: "35°C", min: 34, max: 36, estado: "Rocas calientes" },
      { dia: "Domingo", temp: "34°C", min: 33, max: 35, estado: "Ceniza" }
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
      { dia: "Lunes", temp: "17°C", min: 16, max: 18, estado: "Neblina" },
      { dia: "Martes", temp: "18°C", min: 17, max: 19, estado: "Frío" },
      { dia: "Miércoles", temp: "19°C", min: 18, max: 20, estado: "Almas flotando" },
      { dia: "Jueves", temp: "18°C", min: 17, max: 19, estado: "Neblina" },
      { dia: "Viernes", temp: "20°C", min: 19, max: 21, estado: "Frío" },
      { dia: "Sábado", temp: "19°C", min: 18, max: 20, estado: "Almas flotando" },
      { dia: "Domingo", temp: "18°C", min: 17, max: 19, estado: "Neblina" }
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
      { dia: "Lunes", temp: "41°C", min: 40, max: 42, estado: "Seco" },
      { dia: "Martes", temp: "42°C", min: 41, max: 43, estado: "Blaze activo" },
      { dia: "Miércoles", temp: "43°C", min: 42, max: 44, estado: "Calor seco" },
      { dia: "Jueves", temp: "42°C", min: 41, max: 43, estado: "Seco" },
      { dia: "Viernes", temp: "44°C", min: 43, max: 45, estado: "Blaze activo" },
      { dia: "Sábado", temp: "43°C", min: 42, max: 44, estado: "Calor seco" },
      { dia: "Domingo", temp: "42°C", min: 41, max: 43, estado: "Seco" }
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
      { dia: "Lunes", temp: "36°C", min: 35, max: 37, estado: "Polvo" },
      { dia: "Martes", temp: "37°C", min: 36, max: 38, estado: "Nublado" },
      { dia: "Miércoles", temp: "38°C", min: 37, max: 39, estado: "Ruinas calientes" },
      { dia: "Jueves", temp: "37°C", min: 36, max: 38, estado: "Polvo" },
      { dia: "Viernes", temp: "39°C", min: 38, max: 40, estado: "Nublado" },
      { dia: "Sábado", temp: "38°C", min: 37, max: 39, estado: "Ruinas calientes" },
      { dia: "Domingo", temp: "37°C", min: 36, max: 38, estado: "Polvo" }
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
      { dia: "Lunes", temp: "54°C", min: 53, max: 55, estado: "Lava alta" },
      { dia: "Martes", temp: "55°C", min: 54, max: 56, estado: "Extremo" },
      { dia: "Miércoles", temp: "56°C", min: 55, max: 57, estado: "Burbujeante" },
      { dia: "Jueves", temp: "55°C", min: 54, max: 56, estado: "Lava alta" },
      { dia: "Viernes", temp: "57°C", min: 56, max: 58, estado: "Extremo" },
      { dia: "Sábado", temp: "56°C", min: 55, max: 57, estado: "Burbujeante" },
      { dia: "Domingo", temp: "55°C", min: 54, max: 56, estado: "Lava alta" }
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
      { dia: "Lunes", temp: "30°C", min: 29, max: 31, estado: "Brillo suave" },
      { dia: "Martes", temp: "31°C", min: 30, max: 32, estado: "Brillante" },
      { dia: "Miércoles", temp: "32°C", min: 31, max: 33, estado: "Luz alta" },
      { dia: "Jueves", temp: "31°C", min: 30, max: 32, estado: "Brillo suave" },
      { dia: "Viernes", temp: "33°C", min: 32, max: 34, estado: "Brillante" },
      { dia: "Sábado", temp: "32°C", min: 31, max: 33, estado: "Luz alta" },
      { dia: "Domingo", temp: "31°C", min: 30, max: 32, estado: "Brillo suave" }
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
      { dia: "Lunes", temp: "25°C", min: 24, max: 26, estado: "Energía baja" },
      { dia: "Martes", temp: "26°C", min: 25, max: 27, estado: "Inestable" },
      { dia: "Miércoles", temp: "27°C", min: 26, max: 28, estado: "Chispas" },
      { dia: "Jueves", temp: "26°C", min: 25, max: 27, estado: "Energía baja" },
      { dia: "Viernes", temp: "28°C", min: 27, max: 29, estado: "Inestable" },
      { dia: "Sábado", temp: "27°C", min: 26, max: 28, estado: "Chispas" },
      { dia: "Domingo", temp: "26°C", min: 25, max: 27, estado: "Energía baja" }
    ]
  }
];