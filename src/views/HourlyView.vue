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

    <!-- HOURLY -->
    <!-- Added: Hourly forecast section showing 8-hour forecast with temperature and weather icons -->
    <section v-if="weather">
      <h2 class="text-xl font-semibold mb-4">Hourly Forecast</h2>

      <div class="flex gap-4 overflow-x-auto">
        <div
          v-for="hour in hourlyForecast"
          :key="hour.dt"
          class="min-w-[120px] bg-slate-900 rounded-lg p-4 text-center"
        >
          <p class="text-sm text-slate-400">
            {{ formatHour(hour.dt_txt) }}
          </p>

          <img
            :src="iconUrl(hour.weather[0].icon)"
            class="mx-auto w-10 h-10"
          />

          <p class="text-xl font-semibold">
            {{ Math.round(hour.main.temp) }}°
          </p>
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

// Added: Get first 8 hours of forecast for hourly view
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
