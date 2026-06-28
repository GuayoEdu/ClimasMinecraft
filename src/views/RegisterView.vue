<template>
  <main class="page auth-page">
    <section class="auth-card">
      <span class="eyebrow">Registro simulado</span>
      <h1>Crear cuenta</h1>
      <p>Registra un usuario local para probar preferencias y favoritos desde Vuex.</p>

      <form class="auth-form" @submit.prevent="registrar">
        <label for="nombre">Nombre</label>
        <input id="nombre" v-model="nombre" type="text" autocomplete="name" placeholder="Tu nombre">

        <label for="email">Correo</label>
        <input id="email" v-model="email" type="email" autocomplete="email" placeholder="correo@nether.cl">

        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres">

        <label for="unidad">Unidad preferida</label>
        <select id="unidad" v-model="unidad">
          <option value="C">°C</option>
          <option value="F">°F</option>
        </select>

        <button type="submit">Crear cuenta</button>
      </form>

      <div v-if="error" class="state-box error">{{ error }}</div>
      <RouterLink class="text-link" to="/login">Ya tengo cuenta</RouterLink>
    </section>
  </main>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      nombre: "",
      email: "",
      password: "",
      unidad: "C",
      error: ""
    };
  },
  methods: {
    async registrar() {
      this.error = "";
      if (!this.nombre.trim() || !this.email.trim() || this.password.length < 6) {
        this.error = "Completa nombre, correo y una contraseña de al menos 6 caracteres.";
        return;
      }
      try {
        await this.$store.dispatch("registrar", {
          nombre: this.nombre,
          email: this.email,
          password: this.password,
          unidad: this.unidad
        });
        this.$router.push("/");
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>
