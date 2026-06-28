<template>
  <main class="page auth-page">
    <section class="auth-card">
      <span class="eyebrow">Acceso de usuario</span>
      <h1>Iniciar sesión</h1>
      <p>Entra para guardar favoritos y usar tus preferencias de clima.</p>

      <form class="auth-form" @submit.prevent="iniciarSesion">
        <label for="email">Correo</label>
        <input id="email" v-model="email" type="email" autocomplete="email" placeholder="eduardo@nether.cl">

        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" autocomplete="current-password" placeholder="nether123">

        <button type="submit">Entrar</button>
      </form>

      <div v-if="error" class="state-box error">{{ error }}</div>
      <p class="auth-hint">Usuario demo: eduardo@nether.cl / nether123</p>
      <RouterLink class="text-link" to="/registro">Crear cuenta simulada</RouterLink>
    </section>
  </main>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async iniciarSesion() {
      this.error = "";
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        this.$router.push(this.$route.query.redirect || "/");
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>
