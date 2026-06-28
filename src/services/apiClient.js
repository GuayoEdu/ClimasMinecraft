export default class ApiClient {
  constructor() {
    this.baseUrl = "https://api.open-meteo.com/v1/forecast";
  }

  async obtenerClima(lat, lon) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      daily: "temperature_2m_max,temperature_2m_min,weathercode",
      current_weather: "true",
      timezone: "auto"
    });
    try {
      const respuesta = await fetch(`${this.baseUrl}?${params.toString()}`, {
        signal: controller.signal
      });
      if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los datos del clima");
      }
      return await respuesta.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
