import { createStore } from "vuex";
import WeatherService from "../services/weatherService";

const weatherService = new WeatherService();

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
const preferenciasGuardadas = JSON.parse(localStorage.getItem("climaNetherPreferencias")) || {
  unidad: "C",
  tema: "lava"
};

const store = createStore({
  state() {
    return {
      usuarios: usuariosMock,
      usuarioActual: usuarioGuardado,
      isAuthenticated: Boolean(usuarioGuardado),
      preferencias: preferenciasGuardadas,
      lugares: [],
      lugarSeleccionado: null,
      pronosticoSeleccionado: [],
      estadisticasSeleccionadas: null,
      alertasSeleccionadas: [],
      climaCargando: false,
      climaError: "",
      detalleCargando: false,
      detalleError: ""
    };
  },
  getters: {
    unidad(state) {
      return state.usuarioActual?.preferencias?.unidad || state.preferencias.unidad;
    },
    favoritos(state) {
      return state.usuarioActual?.favoritos || [];
    }
  },
  mutations: {
    iniciarSesion(state, usuario) {
      state.usuarioActual = usuario;
      state.isAuthenticated = true;
      state.preferencias = {
        ...state.preferencias,
        ...usuario.preferencias
      };
      localStorage.setItem("climaNetherUsuario", JSON.stringify(usuario));
      localStorage.setItem("climaNetherPreferencias", JSON.stringify(state.preferencias));
    },
    cerrarSesion(state) {
      state.usuarioActual = null;
      state.isAuthenticated = false;
      localStorage.removeItem("climaNetherUsuario");
    },
    actualizarPreferencias(state, preferencias) {
      state.preferencias = {
        ...state.preferencias,
        ...preferencias
      };
      localStorage.setItem("climaNetherPreferencias", JSON.stringify(state.preferencias));
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
    },
    setClimaCargando(state, cargando) {
      state.climaCargando = cargando;
    },
    setClimaError(state, error) {
      state.climaError = error;
    },
    setLugares(state, lugares) {
      state.lugares = lugares;
    },
    setDetalleCargando(state, cargando) {
      state.detalleCargando = cargando;
    },
    setDetalleError(state, error) {
      state.detalleError = error;
    },
    setDetalleLugar(state, detalle) {
      state.lugarSeleccionado = detalle;
      state.pronosticoSeleccionado = detalle?.semana || [];
      state.estadisticasSeleccionadas = detalle?.estadisticas || null;
      state.alertasSeleccionadas = detalle?.alertas || [];
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
    },
    async cargarLugares({ commit }) {
      commit("setClimaCargando", true);
      commit("setClimaError", "");
      try {
        const lugares = await weatherService.cargarLugares();
        commit("setLugares", lugares);
      } catch (error) {
        commit("setClimaError", "No se pudieron cargar los datos del clima.");
        throw error;
      } finally {
        commit("setClimaCargando", false);
      }
    },
    async cargarDetalleLugar({ commit }, id) {
      commit("setDetalleCargando", true);
      commit("setDetalleError", "");
      commit("setDetalleLugar", null);
      try {
        const detalle = await weatherService.cargarDetalleLugar(id);
        if (!detalle) {
          commit("setDetalleError", "No se encontró el lugar seleccionado.");
          return;
        }
        const estadisticas = weatherService.calcularEstadisticas(detalle.semana);
        const alertas = weatherService.generarAlertas(estadisticas);
        commit("setDetalleLugar", {
          ...detalle,
          estadisticas,
          alertas
        });
      } catch (error) {
        commit("setDetalleError", "Error al cargar el detalle del clima.");
        throw error;
      } finally {
        commit("setDetalleCargando", false);
      }
    }
  }
});

export default store;
