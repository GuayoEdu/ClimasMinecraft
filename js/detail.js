const cajaDetalle = document.getElementById("detalle-bioma");
const semana = document.getElementById("semana");

const idGuardado = localStorage.getItem("biomaSeleccionado");

let biomaElegido = obtenerBiomaPorId(idGuardado);

function calcularEstadisticas(semanaData) {
  let min = semanaData[0].min;
  let max = semanaData[0].max;
  let suma = 0;

  let conteo = {
    calor: 0,
    frio: 0,
    templado: 0
  };

  for (let i = 0; i < semanaData.length; i++) {
    let d = semanaData[i];

    if (d.min < min) min = d.min;
    if (d.max > max) max = d.max;

    suma += (d.min + d.max) / 2;

    if (d.max >= 40) {
      conteo.calor++;
    } else if (d.max <= 25) {
      conteo.frio++;
    } else {
      conteo.templado++;
    }
  }

  let promedio = suma / semanaData.length;

  let resumen = "";

  if (conteo.calor > conteo.frio && conteo.calor > conteo.templado) {
    resumen = "Semana mayormente calurosa";
  } else if (conteo.frio > conteo.calor && conteo.frio > conteo.templado) {
    resumen = "Semana mayormente fría";
  } else {
    resumen = "Semana templada";
  }

  return {
    min,
    max,
    promedio: promedio.toFixed(1),
    conteo,
    resumen
  };
}

if (biomaElegido) {
  cajaDetalle.innerHTML = `
    <h1>${biomaElegido.icono} ${biomaElegido.nombre}</h1>
    <p><strong>Temperatura:</strong> ${biomaElegido.temperatura}</p>
    <p><strong>Estado:</strong> ${biomaElegido.estado}</p>
    <p><strong>Humedad:</strong> ${biomaElegido.humedad}</p>
    <p><strong>Viento:</strong> ${biomaElegido.viento}</p>
  `;

  for (let i = 0; i < biomaElegido.semana.length; i++) {
    const dia = biomaElegido.semana[i];

    semana.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="pronostico-card">
          <h5>${dia.dia}</h5>
          <p>${dia.temp}</p>
          <p>${dia.estado}</p>
        </div>
      </div>
    `;
  }

  const stats = calcularEstadisticas(biomaElegido.semana);

  cajaDetalle.innerHTML += `
    <hr>
    <h3>Estadísticas de la semana</h3>
    <p><strong>Mínima:</strong> ${stats.min}°C</p>
    <p><strong>Máxima:</strong> ${stats.max}°C</p>
    <p><strong>Promedio:</strong> ${stats.promedio}°C</p>
    <p><strong>Días calurosos:</strong> ${stats.conteo.calor}</p>
    <p><strong>Días fríos:</strong> ${stats.conteo.frio}</p>
    <p><strong>Días templados:</strong> ${stats.conteo.templado}</p>
    <p><strong>Resumen:</strong> ${stats.resumen}</p>
  `;
} else {
  cajaDetalle.innerHTML = "<p>No se encontró el bioma.</p>";
}
function obtenerBiomaPorId(id) {
  for (let i = 0; i < biomas.length; i++) {
    if (biomas[i].id == id) {
      return biomas[i];
    }
  }
  return null;
}