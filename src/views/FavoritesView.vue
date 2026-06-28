<template>
  <main class="page">
    <section class="content-section">
      <span class="eyebrow">Ruta protegida</span>
      <h1>Favoritos de {{ usuarioActual.nombre }}</h1>
      <p>Estos lugares dependen del usuario autenticado y se leen desde Vuex.</p>
    </section>

    <div v-if="cargando" class="state-box">Cargando favoritos...</div>
    <div v-if="error" class="state-box error">{{ error }}</div>
    <div v-show="!cargando && !error && lugaresFavoritos.length === 0" class="state-box">Aún no tienes lugares favoritos.</div>

    <section v-if="!cargando && !error && lugaresFavoritos.length > 0" class="places-grid">
      <WeatherCard
        v-for="lugar in lugaresFavoritos"
        :key="lugar.id"
        :lugar="lugar"
        :temperatura="formatearTemperatura(lugar.temperaturaActual)"
        :is-favorite="true"
        :can-favorite="true"
        @select="irADetalle"
        @toggle-favorite="alternarFavorito"
      />
    </section>
  </main>
</template>

<script>
import WeatherCard from "../components/WeatherCard.vue";
import WeatherService from "../services/weatherService";

const weatherService = new WeatherService();

export default {
  name: "FavoritesView",
  components: {
    WeatherCard
  },
  data() {
    return {
      lugares: [],
      cargando: true,
      error: ""
    };
  },
  computed: {
    usuarioActual() {
      return this.$store.state.usuarioActual;
    },
    unidad() {
      return this.$store.getters.unidad;
    },
    favoritos() {
      return this.$store.getters.favoritos;
    },
    lugaresFavoritos() {
      return this.lugares.filter(lugar => this.favoritos.includes(lugar.id));
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
    alternarFavorito(id) {
      this.$store.dispatch("toggleFavorito", id);
    },
    async cargarLugares() {
      this.cargando = true;
      this.error = "";
      try {
        this.lugares = await weatherService.cargarLugares();
      } catch (error) {
        this.error = "No se pudieron cargar los favoritos.";
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
