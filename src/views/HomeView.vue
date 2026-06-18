<template>
  <main class="page">
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Módulo 6 - SPA con Vue.js</span>
        <h1>Climas del Nether</h1>
        <p>Explora biomas inspirados en Minecraft, revisa su clima actual y entra al detalle para ver pronóstico, estadísticas y alertas.</p>
      </div>
    </section>

    <form class="filter-panel" @submit.prevent="limpiarBusqueda">
      <label for="busqueda">Buscar bioma</label>
      <div class="filter-row">
        <input id="busqueda" v-model="busqueda" type="text" placeholder="Nether, lava, portal, crimson...">
        <button type="submit">Limpiar</button>
      </div>
    </form>

    <div v-if="cargando" class="state-box">Cargando datos del clima...</div>
    <div v-if="error" class="state-box error">{{ error }}</div>
    <div v-show="!cargando && !error && lugaresFiltrados.length === 0" class="state-box error">No se encontró el lugar.</div>

    <section v-if="!cargando && !error" class="places-grid">
      <WeatherCard
        v-for="lugar in lugaresFiltrados"
        :key="lugar.id"
        :lugar="lugar"
        :temperatura="formatearTemperatura(lugar.temperaturaActual)"
        @select="irADetalle"
      />
    </section>
  </main>
</template>

<script>
import WeatherCard from "../components/WeatherCard.vue";
import WeatherService from "../services/weatherService";

const weatherService = new WeatherService();

export default {
  name: "HomeView",
  components: {
    WeatherCard
  },
  props: {
    unidad: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lugares: [],
      busqueda: "",
      cargando: true,
      error: ""
    };
  },
  computed: {
    lugaresFiltrados() {
      const texto = this.busqueda.trim().toLowerCase();
      if (!texto) {
        return this.lugares;
      }
      return this.lugares.filter(lugar => lugar.nombre.toLowerCase().includes(texto) || lugar.tipo.toLowerCase().includes(texto));
    }
  },
  methods: {
    formatearTemperatura(valor) {
      if (this.unidad === "F") {
        return `${Math.round((valor * 9 / 5 + 32) * 10) / 10} °F`;
      }
      return `${Math.round(valor * 10) / 10} °C`;
    },
    irADetalle(id) {
      this.$router.push(`/lugar/${id}`);
    },
    limpiarBusqueda() {
      this.busqueda = "";
    },
    async cargarLugares() {
      this.cargando = true;
      this.error = "";
      try {
        this.lugares = await weatherService.cargarLugares();
      } catch (error) {
        this.error = "No se pudieron cargar los datos del clima.";
      } finally {
        this.cargando = false;
      }
    }
  },
  mounted() {
    this.cargarLugares();
  }
};
</script>
