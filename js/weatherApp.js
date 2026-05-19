class WeatherApp {
    constructor(apiClient) {
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
        } if (codigo >= 71 && codigo <= 77) {
            return "Nieve";
        }
        return "Tormenta";
    }
    async cargarLugares() {
        const resultados = [];
        for (const bioma of biomas) {
            const clima = await this.apiClient.obtenerClima(bioma.lat, bioma.lon);
            resultados.push({
                ...bioma,
                temperatura: `${clima.current_weather.temperature}°C`,
                estado: this.obtenerEstadoClima(clima.current_weather.weathercode),
                climaCompleto: clima
            });
        }
        this.lugares = resultados;
        return resultados;
    }
    async cargarDetalleLugar(id) {
        const lugar = biomas.find(b => b.id == id);
        if (!lugar) {
            return null;
        }
        const clima = await this.apiClient.obtenerClima(lugar.lat, lugar.lon);
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
            temperatura: `${clima.current_weather.temperature}°C`,
            viento: `${clima.current_weather.windspeed} km/h`,
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
        const promedio = (suma / pronosticoSemanal.length).toFixed(1);
        return {
            minima,
            maxima,
            promedio,
            soleado,
            lluvia
        };
    }
    generarAlertas(estadisticas) {
        const alertas = [];
        if (estadisticas.promedio > 30) {
            alertas.push(" Alerta de calor extremo");
        }
        if (estadisticas.lluvia >= 3) {
            alertas.push(" Semana lluviosa detectada");
        } if (estadisticas.minima < 5) {
            alertas.push(" Posibles temperaturas muy bajas");
        }
        return alertas;
    }
}