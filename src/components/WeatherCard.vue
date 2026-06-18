<template>
  <article class="weather-card" @click="$emit('select', lugar.id)">
    <img class="card-image" :src="lugar.imagen" :alt="lugar.nombre">
    <div class="card-body">
      <span class="place-type">{{ lugar.tipo }}</span>
      <h2>{{ lugar.nombre }}</h2>
      <p><strong>Temperatura:</strong> {{ temperatura }}</p>
      <p><strong>Estado:</strong> <span class="weather-badge">{{ lugar.estado }}</span></p>
      <RouterLink class="action-button" :to="`/lugar/${lugar.id}`" @click.stop>Ver detalle</RouterLink>
    </div>
  </article>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    lugar: {
      type: Object,
      required: true
    },
    temperatura: {
      type: String,
      required: true
    }
  },
  emits: ["select"]
};
</script>
