// composables/useWeather.js
import { ref } from 'vue'

export function useWeather() {
  const weather = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchWeather = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=b099a1ea337770b899243842cf9d70a2')
      return await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchWeatherByCity = async (city) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
      weather.value = await response.json()
      console.log(weather.value)
    } 
    
    catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }


  return { weather, loading, error, fetchWeather, fetchWeatherByCity }
}
