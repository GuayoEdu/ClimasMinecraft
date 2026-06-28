<template>
  <main class="page">
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Módulo 7 - Usuarios y Vuex</span>
        <h1>Climas del Nether</h1>
        <p>Explora biomas inspirados en Minecraft, revisa su clima actual y guarda favoritos con tu sesión.</p>
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
        :is-favorite="favoritos.includes(lugar.id)"
        :can-favorite="isAuthenticated"
        @select="irADetalle"
        @toggle-favorite="alternarFavorito"
      />
    </section>
  </main>
</template>

<script>
import WeatherCard from "../components/WeatherCard.vue";

export default {
  name: "HomeView",
  components: {
    WeatherCard
  },
  data() {
    return {
      busqueda: ""
    };
  },
  computed: {
    lugares() {
      return this.$store.state.lugares;
    },
    cargando() {
      return this.$store.state.climaCargando;
    },
    error() {
      return this.$store.state.climaError;
    },
    unidad() {
      return this.$store.getters.unidad;
    },
    favoritos() {
      return this.$store.getters.favoritos;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
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
    alternarFavorito(id) {
      this.$store.dispatch("toggleFavorito", id);
    },
    async cargarLugares() {
      if (this.lugares.length > 0) {
        return;
      }
      try {
        await this.$store.dispatch("cargarLugares");
      } catch (error) {
        return;
      }
    }
  },
  mounted() {
    this.cargarLugares();
  }
};
</script>
