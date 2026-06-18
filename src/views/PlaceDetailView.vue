<template>
  <main class="page">
    <button class="back-button" type="button" @click="volverHome">Volver al Home</button>

    <div v-if="cargando" class="state-box">Cargando detalle del clima...</div>
    <div v-if="error" class="state-box error">{{ error }}</div>

    <template v-if="!cargando && !error && lugar">
      <section class="detail-hero">
        <img :src="lugar.imagen" :alt="lugar.nombre">
        <div>
          <span class="eyebrow">{{ lugar.tipo }}</span>
          <h1>{{ lugar.nombre }}</h1>
          <p><strong>Temperatura actual:</strong> {{ formatearTemperatura(lugar.temperaturaActual) }}</p>
          <p><strong>Estado:</strong> {{ lugar.estado }}</p>
          <p><strong>Viento:</strong> {{ lugar.vientoActual }} km/h</p>
        </div>
      </section>

      <section class="content-section">
        <h2>Pronóstico semanal</h2>
        <div class="forecast-grid">
          <article class="forecast-card" v-for="dia in lugar.semana" :key="dia.dia">
            <h3>{{ formatearFecha(dia.dia) }}</h3>
            <p>Mín: {{ formatearTemperatura(dia.min) }}</p>
            <p>Máx: {{ formatearTemperatura(dia.max) }}</p>
            <span>{{ dia.estado }}</span>
          </article>
        </div>
      </section>

      <section class="stats-grid" v-if="estadisticas">
        <article>
          <span>Mínima</span>
          <strong>{{ formatearTemperatura(estadisticas.minima) }}</strong>
        </article>
        <article>
          <span>Máxima</span>
          <strong>{{ formatearTemperatura(estadisticas.maxima) }}</strong>
        </article>
        <article>
          <span>Promedio</span>
          <strong>{{ formatearTemperatura(estadisticas.promedio) }}</strong>
        </article>
        <article>
          <span>Días despejados</span>
          <strong>{{ estadisticas.soleado }}</strong>
        </article>
        <article>
          <span>Días lluviosos</span>
          <strong>{{ estadisticas.lluvia }}</strong>
        </article>
      </section>

      <section class="content-section">
        <h2>Alertas de clima</h2>
        <p v-if="alertas.length === 0" class="quiet-text">No hay alertas esta semana.</p>
        <div v-for="alerta in alertas" :key="alerta" class="alert-box">{{ alerta }}</div>
      </section>
    </template>
  </main>
</template>

<script>
import WeatherService from "../services/weatherService";

const weatherService = new WeatherService();

export default {
  name: "PlaceDetailView",
  props: {
    unidad: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lugar: null,
      estadisticas: null,
      alertas: [],
      cargando: true,
      error: ""
    };
  },
  methods: {
    formatearTemperatura(valor) {
      if (this.unidad === "F") {
        return `${Math.round((valor * 9 / 5 + 32) * 10) / 10} °F`;
      }
      return `${Math.round(valor * 10) / 10} °C`;
    },
    formatearFecha(fecha) {
      return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-CL", {
        weekday: "short",
        day: "2-digit",
        month: "short"
      });
    },
    volverHome() {
      this.$router.push("/");
    },
    async cargarDetalle() {
      this.cargando = true;
      this.error = "";
      try {
        const datos = await weatherService.cargarDetalleLugar(this.$route.params.id);
        if (!datos) {
          this.lugar = null;
          this.error = "No se encontró el lugar seleccionado.";
          return;
        }
        this.lugar = datos;
        this.estadisticas = weatherService.calcularEstadisticas(datos.semana);
        this.alertas = weatherService.generarAlertas(this.estadisticas);
      } catch (error) {
        this.error = "Error al cargar el detalle del clima.";
      } finally {
        this.cargando = false;
      }
    }
  },
  mounted() {
    this.cargarDetalle();
  },
  watch: {
    "$route.params.id"() {
      this.cargarDetalle();
    }
  }
};
</script>
