# Clima Nether - App de Clima Final

Clima Nether es una SPA construida con Vue.js e inspirada en los biomas del Nether de Minecraft. La aplicación consume datos reales de clima desde Open-Meteo, muestra pronóstico semanal, calcula estadísticas, genera alertas y permite manejar sesión, preferencias y favoritos con Vuex.

## Repositorio

https://github.com/GuayoEdu/ClimasMinecraft

## Sitio publicado

https://guayoedu.github.io/ClimasMinecraft/

## Funcionalidades clave

- SPA con Vue 3 y Vue Router.
- Home con listado de lugares y clima actual.
- Detalle dinámico por lugar con pronóstico semanal.
- Cálculo de estadísticas: mínima, máxima, promedio, días despejados y días lluviosos.
- Alertas por reglas simples: calor extremo, semana lluviosa y temperaturas bajas.
- Consumo de API externa usando `fetch`.
- Datos mock de respaldo si la API no responde a tiempo.
- Vuex para gestionar lugares, detalle seleccionado, pronóstico, carga/error, preferencias, sesión y favoritos.
- Login, registro simulado, cierre de sesión y ruta protegida.
- Preferencia de unidad `°C / °F`.
- Estética visual basada en lava, basalto, crimson forest, warped forest y portales del Nether.

## API usada

La app usa Open-Meteo:

https://open-meteo.com/

No requiere API key ni archivo `.env`.

## Rutas principales

- `/`: Home con listado de biomas y búsqueda.
- `/lugar/:id`: detalle del bioma seleccionado.
- `/login`: inicio de sesión.
- `/registro`: registro simulado.
- `/favoritos`: vista protegida con favoritos del usuario autenticado.

Si un usuario no autenticado intenta entrar a `/favoritos`, la app lo redirige a `/login`.

## Usuarios de prueba

- `eduardo@nether.cl` / `nether123`
- `alex@nether.cl` / `portal123`

Cada usuario tiene preferencias y favoritos distintos para demostrar la personalización desde Vuex.

## Requisitos locales

- Node.js 18 o superior.
- npm.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Luego abre la URL que entregue Vite, normalmente:

```text
http://localhost:5173/
```

## Build de producción

```bash
npm run build
```

Para revisar el build local:

```bash
npm run preview
```

## Estructura principal

- `src/App.vue`: layout principal, navbar, sesión y selector de unidad.
- `src/router/index.js`: rutas y guard de autenticación.
- `src/store/index.js`: Vuex para auth, preferencias, favoritos y estado de clima.
- `src/views/HomeView.vue`: listado de lugares.
- `src/views/PlaceDetailView.vue`: detalle, pronóstico, estadísticas y alertas.
- `src/views/LoginView.vue`: formulario de inicio de sesión.
- `src/views/RegisterView.vue`: registro simulado.
- `src/views/FavoritesView.vue`: ruta protegida de favoritos.
- `src/components/WeatherCard.vue`: card reutilizable para lugares.
- `src/services/apiClient.js`: cliente de Open-Meteo.
- `src/services/weatherService.js`: transformación de datos, estadísticas y alertas.
- `src/data/places.js`: biomas y coordenadas.
- `public/img`: recursos visuales.

## Cómo probar el flujo completo

1. Ejecuta `npm run dev`.
2. Abre el Home y revisa que carguen los biomas.
3. Busca un bioma desde el input.
4. Entra al detalle de un lugar.
5. Revisa pronóstico, estadísticas y alertas.
6. Inicia sesión con un usuario de prueba.
7. Cambia la unidad entre `°C` y `°F`.
8. Agrega o quita favoritos.
9. Entra a `/favoritos`.
10. Cierra sesión y prueba entrar otra vez a `/favoritos` para verificar la redirección a `/login`.
