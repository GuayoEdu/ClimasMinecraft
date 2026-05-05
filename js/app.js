const contenedor = document.getElementById("contenedor-biomas");
const buscador = document.getElementById("buscador");

function mostrarBiomas(lista) {
  contenedor.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const bioma = lista[i];

    contenedor.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-4 mb-4">
        <article class="card card-bioma h-100">
          <div class="card-body">
            <h3 class="card-title">${bioma.icono} ${bioma.nombre}</h3>
            <p class="card-text"><strong>Temperatura:</strong> ${bioma.temperatura}</p>
            <p class="card-text"><strong>Estado:</strong> <span class="badge badge-estado">${bioma.estado}</span></p>
            <button class="btn btn-warning" onclick="verDetalle(${bioma.id})">Ver detalle</button>
          </div>
        </article>
      </div>
    `;
  }
}

function verDetalle(id) {
  localStorage.setItem("biomaSeleccionado", id);
  window.location.href = "detalle.html";
}

function filtrarBiomas(texto) {
  texto = texto.toLowerCase();

  let resultados = [];

  for (let i = 0; i < biomas.length; i++) {
    if (biomas[i].nombre.toLowerCase().includes(texto)) {
      resultados.push(biomas[i]);
    }
  }

  mostrarBiomas(resultados);
}

buscador.addEventListener("input", function () {
  if (this.value === "") {
    mostrarBiomas(biomas);
  } else {
    filtrarBiomas(this.value);
  }
});

mostrarBiomas(biomas);