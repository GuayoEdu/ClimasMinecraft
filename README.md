# Clima Nether - SPA con Vue.js, Vuex y usuarios

Aplicación de clima inspirada en los biomas del Nether de Minecraft. La app muestra lugares, clima actual, pronóstico semanal, estadísticas y alertas. En el Módulo 7 se agregó autenticación simulada, estado global con Vuex, rutas protegidas y personalización por usuario.

## Sistema de usuarios

La autenticación se simula en el frontend con usuarios mock guardados en Vuex. Al iniciar sesión se almacena el usuario actual con:

- Nombre.
- Correo.
- Preferencias de clima, como unidad `°C` o `°F`.
- Lista de lugares favoritos.
- Estado `isAuthenticated`.

Usuarios de prueba:

- `eduardo@nether.cl` / `nether123`
- `alex@nether.cl` / `portal123`

## Rutas principales

- `/`: Home con listado de biomas y búsqueda.
- `/lugar/:id`: detalle dinámico del lugar seleccionado.
- `/login`: formulario de inicio de sesión.
- `/registro`: formulario de creación de cuenta simulada.
- `/favoritos`: ruta protegida con los favoritos del usuario autenticado.

Si un usuario no logueado intenta entrar a `/favoritos`, Vue Router lo redirige a `/login`.

## Personalización

- La navbar muestra el nombre del usuario cuando hay sesión activa.
- El botón de cerrar sesión limpia el estado de Vuex y redirige al login.
- La unidad de temperatura se lee desde Vuex y cambia según la preferencia del usuario.
- Los favoritos se guardan en Vuex y cambian según el usuario conectado.
- El usuario Alex usa una variante visual tipo Warped Forest.

## Estructura principal

- `src/App.vue`: componente raíz, sesión, navegación y preferencias.
- `src/views/HomeView.vue`: vista Home.
- `src/views/PlaceDetailView.vue`: vista de detalle.
- `src/views/LoginView.vue`: inicio de sesión.
- `src/views/RegisterView.vue`: registro simulado.
- `src/views/FavoritesView.vue`: ruta protegida de favoritos.
- `src/components/WeatherCard.vue`: card reutilizable.
- `src/router/index.js`: rutas y guard de autenticación.
- `src/store/index.js`: estado global Vuex.
- `src/services/weatherService.js`: clima, pronóstico, estadísticas y alertas.
- `src/data/places.js`: lugares y recursos visuales.
- `public/img`: imágenes temáticas.

## Tecnologías usadas

- Vue.js 3
- Vue Router 4
- Vuex 4
- Vite
- JavaScript ES6+
- CSS3
- Fetch API
- Open-Meteo con datos mock de respaldo

## Cómo ejecutar

```bash
npm install
npm run dev
```

Luego abrir la URL que entregue Vite.

## Build

```bash
npm run build
```

## Repositorio GitHub

https://github.com/GuayoEdu/ClimasMinecraft

## Sitio publicado

https://guayoedu.github.io/ClimasMinecraft/
