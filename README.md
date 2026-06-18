# Clima Nether - SPA con Vue.js

Aplicacion de clima inspirada en los biomas del Nether de Minecraft. Esta version migra la app original a una SPA con Vue.js, Vue Router, componentes `.vue`, datos de clima desde Open-Meteo y datos mock como respaldo si la API no responde.

## Tematica

La app conserva la estetica Nether con colores oscuros, lava, rojo carmesi, glowstone, basalto y portales. Los lugares representan biomas y estructuras como Nether Wastes, Crimson Forest, Warped Forest, Basalt Deltas, Soul Sand Valley, Fortaleza del Nether, Bastion Remnant, Lago de Lava, Cueva de Glowstone y Portal Arruinado.

## Vistas principales

- Home: listado de lugares con imagen, tipo, temperatura actual y estado del clima.
- Detalle de lugar: informacion ampliada del lugar seleccionado, pronostico semanal, estadisticas y alertas.

## Rutas configuradas

- `/`: Home.
- `/lugar/:id`: detalle dinamico del lugar seleccionado.

La navegacion interna se maneja con Vue Router y no recarga la pagina.

## Interacciones

- Busqueda de lugares por nombre o tipo usando `v-model`.
- Boton para limpiar la busqueda usando `@submit`.
- Selector de unidad `°C / °F` usando `v-model`.
- Seleccion de cards con `@click`.
- Enlaces con `<RouterLink>`.

## Estructura principal

- `src/App.vue`: componente raiz y selector de unidad.
- `src/views/HomeView.vue`: vista Home.
- `src/views/PlaceDetailView.vue`: vista de detalle.
- `src/components/WeatherCard.vue`: card reutilizable para cada lugar.
- `src/router/index.js`: rutas de Vue Router.
- `src/services/weatherService.js`: carga de clima, pronostico, estadisticas y alertas.
- `src/data/places.js`: lugares y recursos visuales.
- `public/img`: imagenes tematicas usadas por la app.

## Tecnologias usadas

- Vue.js 3
- Vue Router 4
- Vite
- JavaScript ES6+
- CSS3
- Fetch API
- Open-Meteo

## Como ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Abrir la URL que entregue Vite en el navegador.

## Comandos utiles

```bash
npm run build
npm run preview
```

## Repositorio GitHub

https://github.com/GuayoEdu/ClimasMinecraft

## Sitio publicado

https://guayoedu.github.io/ClimasMinecraft/
