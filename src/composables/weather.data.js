// src/assets/composables/weather.data.js
import { ref } from "vue"


export default function useWeather() {
  const weather = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const API_KEY = "b099a1ea337770b899243842cf9d70a2"
  const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"

  const fetchData = async (url) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error("City not found")

      weather.value = await res.json()
    } catch (err) {
      error.value = err.message
      weather.value = null
    } finally {
      loading.value = false
    }
  }

  // Default location
  const fetchWeather = () => {
    fetchData(
      `${BASE_URL}?lat=33.44&lon=-94.04&appid=${API_KEY}&units=metric`
    )
  }

  // Search by city
  const fetchWeatherByCity = (city) => {
    if (!city) return
    fetchData(
      `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    )
  }

  return {
    weather,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCity
  }
}
