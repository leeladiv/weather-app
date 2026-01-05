<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import searchBar from './components/searchBar.vue'
//import Country from './components/Country.vue'
//import weatherCard from './components/weatherCard.vue'

const weatherData = ref(null)
const currentCity = ref('')
const loading = ref(false)
const erroe = ref('')

const handleSearch = async (city) => {
  loading.value = true
  error.value = ''
  weatherData.value = null
  currentCity.value = city

  try {
    // First, geocode the city name to get coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    )
    const geoData = await geoRes.json()

    if (!geoData.results || geoData.results.length === 0) {
      error.value = 'City not found. Please try another search.'
      loading.value = false
      return
    }

    const { latitude, longitude, name, country } = geoData.results[0]
    currentCity.value = `${name}, ${country}`

    // Then, fetch weather data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature&temperature_unit=celsius`
    )
    const weather = await weatherRes.json()

    weatherData.value = {
      temperature: Math.round(weather.current.temperature_2m),
      windSpeed: Math.round(weather.current.wind_speed_10m),
      weatherCode: weather.current.weather_code,
      condition: getWeatherCondition(weather.current.weather_code),
      humidity: weather.current.relative_humidity_2m,
      feelsLike: Math.round(weather.current.apparent_temperature)
    }
  } catch (err) {
    error.value = 'Failed to fetch weather data. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const getWeatherCondition = (code) => {
  // WMO Weather interpretation codes
  const conditions = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    53: 'Drizzle',
    55: 'Heavy Drizzle',
    61: 'Slight Rain',
    63: 'Rain',
    65: 'Heavy Rain',
    71: 'Slight Snow',
    73: 'Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Rain Showers',
    82: 'Heavy Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Hail'
  }
  return conditions[code] || 'Unknown'
}


defineProps({
  loading: Boolean
})

const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSubmit = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    searchQuery.value = ''
  }
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 p-4 md:p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="text-5xl">🌤️</div>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Weather Forecast</h1>
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-lg">Search any city to view current weather conditions</p>
      </div>

      <!-- Search Bar Component -->
       
  <searchBar />
      <SearchBar @search="handleSearch" :loading="loading" />

      <!-- Error Message -->
      <div v-if="error" class="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm md:text-base">
        {{ error }}
      </div>

      <!-- Weather Card Component -->
      <WeatherCard 
        v-if="weatherData && !loading" 
        :weather="weatherData" 
        :city="currentCity"
        class="animate-fadeIn"
      />

      <!-- Loading State -->
      <div v-if="loading" class="mt-12 flex flex-col items-center justify-center">
        <div class="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <p class="mt-6 text-slate-600 dark:text-slate-300 text-lg">Loading weather data...</p>
      </div>

      <!-- Empty State -->
      <<div v-if="!weatherData && !loading && !error" class="mt-12">
        <div class="text-center p-8 rounded-2xl bg-white dark:bg-slate-400 border-1 border-dashed border-slate-200 dark:border-slate-700">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-slate-800 dark:text-white mb-2">Start Exploring</h3>
          <p class="text-slate-600 dark:text-slate-400">Search for a city name above to view current weather conditions, temperature, and wind speed.</p>
        </div>
      </div>
    </div>
  </div>

    
  <RouterView />
   <!--<Country/> -->
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');


body {
  font-family: 'Inter', sans-serif;
}
</style>
