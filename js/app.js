const contenedor = document.getElementById("contenedor-biomas");
const buscador = document.getElementById("buscador");
const mensaje = document.getElementById("mensaje");

const apiClient = new ApiClient();
const app = new WeatherApp(apiClient);

const mostrarMensaje = texto => {
  mensaje.innerHTML = `
    <div class="cargando">
      ${texto}
    </div>
  `;
};

const mostrarError = texto => {
  mensaje.innerHTML = `
    <div class="error">
      ${texto}
    </div>
  `;
};

const renderizarBiomas = lista => {
  contenedor.innerHTML = "";

  lista.forEach(bioma => {
    contenedor.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-4 mb-4">
        <article class="card card-bioma h-100">
          <div class="card-body">

            <h3 class="card-title">
              ${bioma.icono} ${bioma.nombre}
            </h3>

            <p>
              <strong>Temperatura:</strong>
              ${bioma.temperatura}
            </p>

            <p>
              <strong>Estado:</strong>

              <span class="badge badge-estado">
                ${bioma.estado}
              </span>
            </p>

            <button
              class="btn btn-warning"
              data-id="${bioma.id}"
            >
              Ver detalle
            </button>

          </div>
        </article>
      </div>
    `;
  });

  const botones = document.querySelectorAll(".btn-warning");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;

      localStorage.setItem("biomaSeleccionado", id);

      window.location.href = "detalle.html";
    });
  });
};

const iniciarApp = async () => {
  try {
    mostrarMensaje("Cargando datos del clima...");

    const lugares = await app.cargarLugares();

    mensaje.innerHTML = "";

    renderizarBiomas(lugares);

    buscador.addEventListener("input", e => {
      const texto = e.target.value.toLowerCase();

      const filtrados = lugares.filter(bioma =>
        bioma.nombre.toLowerCase().includes(texto)
      );

      renderizarBiomas(filtrados);
    });

  } catch (error) {
    mostrarError("Error al cargar los datos del clima");
  }
};

iniciarApp();