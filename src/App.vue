<template>
  <div class="app-shell">
    <header class="site-header">
      <nav class="nav-shell">
        <RouterLink class="brand" to="/">
          <span class="brand-mark">CN</span>
          <span>Clima Nether</span>
        </RouterLink>

        <div class="nav-actions">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <label class="unit-picker" for="unidad">
            <span>Unidad</span>
            <select id="unidad" v-model="unidad">
              <option value="C">°C</option>
              <option value="F">°F</option>
            </select>
          </label>
        </div>
      </nav>
    </header>

    <RouterView v-slot="{ Component }">
      <component :is="Component" :unidad="unidad" />
    </RouterView>

    <footer class="site-footer">
      <span>Clima Nether - SPA con Vue Router</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      unidad: "C"
    };
  }
};
</script>
