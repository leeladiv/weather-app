<template>
  <main class="flex-1 bg-slate-950 text-white p-8 overflow-y-auto">
    <!-- Header -->
    <div v-if="weather" class="mb-8">
      <h1 class="text-4xl font-bold">
        {{ weather.city.name }}
      </h1>
      <p class="text-slate-400">
        {{ formattedDate }}
      </p>
    </div>

    <!-- States -->
    <p v-if="loading" class="text-sm text-slate-400 mt-4">
      Loading...
    </p>
    <p v-if="error" class="text-sm text-red-400 mt-4">
      {{ error }}
    </p>

    <!-- RADAR -->
    <!-- Added: Radar view section displaying weather radar information without using Leaflet -->
    <section v-if="weather" class="space-y-4">
      <h2 class="text-xl font-semibold mb-4">Weather Radar</h2>
      
      <!-- Added: Display city coordinates and location information -->
      <div class="bg-slate-900 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4">Location Information</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <p class="text-slate-400 text-sm">City</p>
            <p class="text-xl font-semibold">{{ weather.city.name }}</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Country</p>
            <p class="text-xl font-semibold">{{ weather.city.country }}</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Latitude</p>
            <p class="text-xl font-semibold">{{ weather.city.coord.lat.toFixed(2) }}°</p>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Longitude</p>
            <p class="text-xl font-semibold">{{ weather.city.coord.lon.toFixed(2) }}°</p>
          </div>
        </div>
      </div>

      <!-- Added: Display current weather conditions with radar-style visualization -->
      <div class="bg-slate-900 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Current Conditions</h3>
        <div class="flex items-center gap-6">
          <img
            :src="iconUrl(weather.list[0].weather[0].icon)"
            alt=""
            class="w-24 h-24"
          />
          <div>
            <p class="text-4xl font-bold">
              {{ Math.round(weather.list[0].main.temp) }}°C
            </p>
            <p class="capitalize text-lg text-slate-400">
              {{ weather.list[0].weather[0].description }}
            </p>
            <div class="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-slate-400">Humidity:</span>
                <span class="ml-2">{{ weather.list[0].main.humidity }}%</span>
              </div>
              <div>
                <span class="text-slate-400">Pressure:</span>
                <span class="ml-2">{{ weather.list[0].main.pressure }} hPa</span>
              </div>
              <div>
                <span class="text-slate-400">Wind Speed:</span>
                <span class="ml-2">{{ weather.list[0].wind.speed }} m/s</span>
              </div>
              <div>
                <span class="text-slate-400">Visibility:</span>
                <span class="ml-2">{{ (weather.list[0].visibility / 1000).toFixed(1) }} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Added: Display precipitation forecast for next few hours -->
      <div class="bg-slate-900 rounded-lg p-6 mt-6">
        <h3 class="text-lg font-semibold mb-4">Precipitation Forecast</h3>
        <div class="flex gap-4 overflow-x-auto">
          <div
            v-for="hour in hourlyForecast"
            :key="hour.dt"
            class="min-w-[100px] bg-slate-800 rounded-lg p-4 text-center"
          >
            <p class="text-sm text-slate-400 mb-2">
              {{ formatHour(hour.dt_txt) }}
            </p>
            <p class="text-lg font-semibold">
              {{ hour.rain ? `${hour.rain['3h']}mm` : '0mm' }}
            </p>
            <p class="text-xs text-slate-500 mt-1">Precipitation</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import useWeather from "@/composables/weather.data.js"

// Added: Get city from route params to fetch weather data
const route = useRoute()
const { weather, loading, error, fetchWeatherByCity } = useWeather()

// Added: Fetch weather data on mount and when city changes
onMounted(() => {
  const city = route.params.city || "Monrovia"
  fetchWeatherByCity(city)
})

watch(
  () => route.params.city,
  (newCity) => {
    if (newCity) fetchWeatherByCity(newCity)
  }
)

// Added: Computed property to format the current date
const formattedDate = computed(() =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric"
  })
)

// Added: Get first 8 hours of forecast for precipitation display
const hourlyForecast = computed(() =>
  weather.value?.list.slice(0, 8) || []
)

// Added: Format hour from date string to display time
const formatHour = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "numeric" })

// Added: Helper function to get weather icon URL from OpenWeatherMap
const iconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`
</script>
