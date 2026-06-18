import ApiClient from "./apiClient";
import { places } from "../data/places";

export default class WeatherService {
  constructor(apiClient = new ApiClient()) {
    this.apiClient = apiClient;
    this.lugares = [];
  }

  obtenerEstadoClima(codigo = 0) {
    if (codigo === 0) {
      return "Despejado";
    }
    if (codigo >= 1 && codigo <= 3) {
      return "Nublado";
    }
    if (codigo >= 45 && codigo <= 48) {
      return "Neblina";
    }
    if (codigo >= 51 && codigo <= 67) {
      return "Lluvia";
    }
    if (codigo >= 71 && codigo <= 77) {
      return "Nieve";
    }
    return "Tormenta";
  }

  crearClimaMock(lugar) {
    const base = 16 + lugar.id * 2;
    const fechas = Array.from({ length: 7 }, (_, index) => {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + index);
      return fecha.toISOString().slice(0, 10);
    });
    return {
      current_weather: {
        temperature: base,
        windspeed: 10 + lugar.id,
        weathercode: lugar.id % 3 === 0 ? 3 : 0
      },
      daily: {
        time: fechas,
        temperature_2m_min: fechas.map((_, index) => base - 5 + index % 3),
        temperature_2m_max: fechas.map((_, index) => base + 4 + index % 4),
        weathercode: fechas.map((_, index) => index % 4 === 0 ? 61 : 0)
      }
    };
  }

  async obtenerClimaSeguro(lugar) {
    try {
      return await this.apiClient.obtenerClima(lugar.lat, lugar.lon);
    } catch (error) {
      return this.crearClimaMock(lugar);
    }
  }

  async cargarLugares() {
    const resultados = [];
    for (const lugar of places) {
      const clima = await this.obtenerClimaSeguro(lugar);
      resultados.push({
        ...lugar,
        temperaturaActual: clima.current_weather.temperature,
        vientoActual: clima.current_weather.windspeed,
        estado: this.obtenerEstadoClima(clima.current_weather.weathercode)
      });
    }
    this.lugares = resultados;
    return resultados;
  }

  async cargarDetalleLugar(id) {
    const lugar = places.find(item => item.id === Number(id));
    if (!lugar) {
      return null;
    }
    const clima = await this.obtenerClimaSeguro(lugar);
    const semana = clima.daily.time.map((dia, index) => {
      return {
        dia,
        min: clima.daily.temperature_2m_min[index],
        max: clima.daily.temperature_2m_max[index],
        estado: this.obtenerEstadoClima(clima.daily.weathercode[index])
      };
    });
    return {
      ...lugar,
      temperaturaActual: clima.current_weather.temperature,
      vientoActual: clima.current_weather.windspeed,
      estado: this.obtenerEstadoClima(clima.current_weather.weathercode),
      semana
    };
  }

  calcularEstadisticas(pronosticoSemanal) {
    let minima = pronosticoSemanal[0].min;
    let maxima = pronosticoSemanal[0].max;
    let suma = 0;
    let soleado = 0;
    let lluvia = 0;
    for (const dia of pronosticoSemanal) {
      if (dia.min < minima) {
        minima = dia.min;
      }
      if (dia.max > maxima) {
        maxima = dia.max;
      }
      suma += (dia.min + dia.max) / 2;
      if (dia.estado === "Despejado") {
        soleado++;
      }
      if (dia.estado === "Lluvia") {
        lluvia++;
      }
    }
    return {
      minima,
      maxima,
      promedio: Number((suma / pronosticoSemanal.length).toFixed(1)),
      soleado,
      lluvia
    };
  }

  generarAlertas(estadisticas) {
    const alertas = [];
    if (estadisticas.promedio > 30) {
      alertas.push("Alerta de calor extremo");
    }
    if (estadisticas.lluvia >= 3) {
      alertas.push("Semana lluviosa detectada");
    }
    if (estadisticas.minima < 5) {
      alertas.push("Posibles temperaturas muy bajas");
    }
    return alertas;
  }
}
