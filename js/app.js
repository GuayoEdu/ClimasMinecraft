const contenedor = document.getElementById("contenedor-biomas");

function mostrarBiomas() {
  for (let i = 0; i < biomas.length; i++) {
    const bioma = biomas[i];

    contenedor.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="card card-bioma">
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

mostrarBiomas();
