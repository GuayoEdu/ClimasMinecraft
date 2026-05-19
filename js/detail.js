const cajaDetalle = document.getElementById("detalle-bioma");
const semana = document.getElementById("semana");
const estadisticas = document.getElementById("estadisticas");
const alertasBox = document.getElementById("alertas");
const mensajeDetalle = document.getElementById("mensaje-detalle");
const apiClient = new ApiClient();
const app = new WeatherApp(apiClient);
const idGuardado = localStorage.getItem("biomaSeleccionado");
const cargarDetalle = async () => {
  try {
    mensajeDetalle.innerHTML = `<div class="cargando">Cargando detalle del clima...</div>
 `;
    const bioma = await app.cargarDetalleLugar(idGuardado);
    mensajeDetalle.innerHTML = "";
    if (!bioma) {
      cajaDetalle.innerHTML = "<p>No se encontró el bioma.</p>";
      return;
    }
    cajaDetalle.innerHTML = `
 <h1>${bioma.icono} ${bioma.nombre}</h1>
 <p><strong>Temperatura:</strong> ${bioma.temperatura}</p>
 <p><strong>Estado:</strong> ${bioma.estado}</p>
 <p><strong>Viento:</strong> ${bioma.viento}</p>
 `;
    semana.innerHTML = "";
    bioma.semana.forEach(dia => {
      semana.innerHTML += `
 <div class="col-12 col-sm-6 col-lg-3">
 <div class="pronostico-card">
 <h5>${dia.dia}</h5>
 <p>Mín: ${dia.min}°C</p>
 <p>Máx: ${dia.max}°C</p>
 <p>${dia.estado}</p>
 </div>
 </div>
 `;
    });
    const stats = app.calcularEstadisticas(bioma.semana);
    estadisticas.innerHTML = `
 <h3>Estadísticas de la semana</h3>
 <p><strong>Temperatura mínima:</strong> ${stats.minima}°C</p>
 <p><strong>Temperatura máxima:</strong> ${stats.maxima}°C</p>
 <p><strong>Temperatura promedio:</strong> ${stats.promedio}°C</p>
 <p><strong>Días despejados:</strong> ${stats.soleado}</p>
 <p><strong>Días lluviosos:</strong> ${stats.lluvia}</p>
 `;
    const alertas = app.generarAlertas(stats);
    alertasBox.innerHTML = "<h3>Alertas de clima</h3>";
    if (alertas.length === 0) {
      alertasBox.innerHTML += "<p>No hay alertas esta semana.</p>";
    } else {
      alertas.forEach(alerta => {
        alertasBox.innerHTML += `
 <div class="alerta">${alerta}</div>
 `;
      });
    }
  } catch (error) {
    mensajeDetalle.innerHTML = `
 <div class="error">Error al cargar el detalle del clima</div>
 `;
  }
};
cargarDetalle();
