# weather-frontend-m2

Proyecto Módulo 4 – App de Clima

## Tema
Aplicación inspirada en Minecraft, usando biomas del Nether como localidades.

## Tecnologías usadas
- HTML5
- CSS
- Bootstrap 5 (CDN)
- JavaScript (arrays, objetos, funciones, DOM)
- Git y GitHub

## Páginas
- `index.html`: muestra los biomas en cards + buscador dinámico
- `detalle.html`: muestra información ampliada + pronóstico semanal + estadísticas
- `acerca.html`: explicación del proyecto

## Modelado de datos
Los datos están definidos en `data.js` como un arreglo de objetos:

- Cada bioma contiene:
  - `id`, `nombre`, `temperatura`, `estado`, `humedad`, `viento`
  - `semana`: arreglo con pronóstico diario (día, min, max, estado)

## Funcionalidades
- Listado dinámico de biomas desde JavaScript
- Buscador en tiempo real por nombre de bioma
- Navegación entre páginas usando `localStorage`
- Visualización de pronóstico semanal
- Cálculo automático de estadísticas:
  - Temperatura mínima de la semana
  - Temperatura máxima de la semana
  - Temperatura promedio
  - Cantidad de días por tipo de clima
- Generación de resumen automático:
  - Ej: “Semana mayormente calurosa”, “Semana templada”, etc.
- Diseño responsive (mobile + desktop)

## Lógica implementada
- Uso de `for` para recorrer datos
- Uso de `if / else` para condiciones
- Función para buscar bioma por id
- Función para calcular estadísticas del clima
- Manipulación del DOM para renderizar contenido dinámicamente

## Repositorio GitHub
https://github.com/GuayoEdu/ClimasMinecraft
https://guayoedu.github.io/ClimasMinecraft/

## Cómo usar
1. Descargar o clonar el proyecto
2. Abrir `index.html` en el navegador
3. Usar el buscador para filtrar biomas
4. Hacer click en un bioma para ver el detalle y estadísticas