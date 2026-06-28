import { createStore } from "vuex";

const usuariosMock = [
  {
    id: 1,
    nombre: "Eduardo",
    email: "eduardo@nether.cl",
    password: "nether123",
    preferencias: {
      unidad: "C",
      tema: "lava"
    },
    favoritos: [1, 2, 8]
  },
  {
    id: 2,
    nombre: "Alex",
    email: "alex@nether.cl",
    password: "portal123",
    preferencias: {
      unidad: "F",
      tema: "warped"
    },
    favoritos: [3, 5, 10]
  }
];

const usuarioGuardado = JSON.parse(localStorage.getItem("climaNetherUsuario"));

const store = createStore({
  state() {
    return {
      usuarios: usuariosMock,
      usuarioActual: usuarioGuardado,
      isAuthenticated: Boolean(usuarioGuardado)
    };
  },
  getters: {
    unidad(state) {
      return state.usuarioActual?.preferencias?.unidad || "C";
    },
    favoritos(state) {
      return state.usuarioActual?.favoritos || [];
    }
  },
  mutations: {
    iniciarSesion(state, usuario) {
      state.usuarioActual = usuario;
      state.isAuthenticated = true;
      localStorage.setItem("climaNetherUsuario", JSON.stringify(usuario));
    },
    cerrarSesion(state) {
      state.usuarioActual = null;
      state.isAuthenticated = false;
      localStorage.removeItem("climaNetherUsuario");
    },
    actualizarPreferencias(state, preferencias) {
      if (!state.usuarioActual) {
        return;
      }
      state.usuarioActual = {
        ...state.usuarioActual,
        preferencias: {
          ...state.usuarioActual.preferencias,
          ...preferencias
        }
      };
      localStorage.setItem("climaNetherUsuario", JSON.stringify(state.usuarioActual));
    },
    alternarFavorito(state, lugarId) {
      if (!state.usuarioActual) {
        return;
      }
      const favoritos = state.usuarioActual.favoritos || [];
      const nuevosFavoritos = favoritos.includes(lugarId)
        ? favoritos.filter(id => id !== lugarId)
        : [...favoritos, lugarId];
      state.usuarioActual = {
        ...state.usuarioActual,
        favoritos: nuevosFavoritos
      };
      localStorage.setItem("climaNetherUsuario", JSON.stringify(state.usuarioActual));
    },
    registrarUsuario(state, usuario) {
      state.usuarios.push(usuario);
    }
  },
  actions: {
    login({ state, commit }, credenciales) {
      const email = credenciales.email.trim().toLowerCase();
      const usuario = state.usuarios.find(item => item.email.toLowerCase() === email && item.password === credenciales.password);
      if (!usuario) {
        throw new Error("Usuario o contraseña incorrectos");
      }
      const usuarioSesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        preferencias: { ...usuario.preferencias },
        favoritos: [...usuario.favoritos]
      };
      commit("iniciarSesion", usuarioSesion);
    },
    logout({ commit }) {
      commit("cerrarSesion");
    },
    actualizarUnidad({ commit }, unidad) {
      commit("actualizarPreferencias", { unidad });
    },
    toggleFavorito({ commit }, lugarId) {
      commit("alternarFavorito", lugarId);
    },
    registrar({ state, commit }, datos) {
      const email = datos.email.trim().toLowerCase();
      const existe = state.usuarios.some(usuario => usuario.email.toLowerCase() === email);
      if (existe) {
        throw new Error("Ya existe un usuario con ese correo");
      }
      const nuevoUsuario = {
        id: Date.now(),
        nombre: datos.nombre.trim(),
        email,
        password: datos.password,
        preferencias: {
          unidad: datos.unidad,
          tema: "lava"
        },
        favoritos: []
      };
      commit("registrarUsuario", nuevoUsuario);
      commit("iniciarSesion", {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        preferencias: { ...nuevoUsuario.preferencias },
        favoritos: []
      });
    }
  }
});

export default store;
