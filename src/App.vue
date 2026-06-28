<template>
  <div class="app-shell" :data-theme="temaUsuario">
    <header class="site-header">
      <nav class="nav-shell">
        <RouterLink class="brand" to="/">
          <span class="brand-mark">CN</span>
          <span>Clima Nether</span>
        </RouterLink>

        <div class="nav-actions">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <RouterLink v-if="isAuthenticated" class="nav-link" to="/favoritos">Favoritos</RouterLink>
          <RouterLink v-if="!isAuthenticated" class="nav-link" to="/login">Login</RouterLink>
          <RouterLink v-if="!isAuthenticated" class="nav-link" to="/registro">Registro</RouterLink>

          <label class="unit-picker" for="unidad">
            <span>Unidad</span>
            <select id="unidad" v-model="unidadSeleccionada">
              <option value="C">°C</option>
              <option value="F">°F</option>
            </select>
          </label>

          <div v-if="isAuthenticated" class="session-pill">
            <span>{{ usuarioActual.nombre }}</span>
            <button type="button" @click="cerrarSesion">Salir</button>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <span>Clima Nether - Usuarios, favoritos y preferencias con Vuex</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    usuarioActual() {
      return this.$store.state.usuarioActual;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    unidadSeleccionada: {
      get() {
        return this.$store.getters.unidad;
      },
      set(unidad) {
        if (this.isAuthenticated) {
          this.$store.dispatch("actualizarUnidad", unidad);
        }
      }
    },
    temaUsuario() {
      return this.usuarioActual?.preferencias?.tema || "lava";
    }
  },
  methods: {
    cerrarSesion() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>
