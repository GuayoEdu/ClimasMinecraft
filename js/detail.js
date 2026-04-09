const cajaDetalle = document.getElementById("detalle-bioma");
const semana = document.getElementById("semana");

const idGuardado = localStorage.getItem("biomaSeleccionado");

let biomaElegido = null;

for (let i = 0; i < biomas.length; i++) {
  if (biomas[i].id == idGuardado) {
    biomaElegido = biomas[i];
  }
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
} else {
  cajaDetalle.innerHTML = "<p>No se encontró el bioma.</p>";
}
