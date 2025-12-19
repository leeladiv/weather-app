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

    <!-- MONTHLY (Daily Forecast) -->
    <!-- Added: 5-day forecast section showing daily high/low temperatures and weather icons -->
    <section v-if="weather">
      <h2 class="text-xl font-semibold mb-4">5-Day Forecast</h2>

      <div class="grid md:grid-cols-5 gap-4">
        <div
          v-for="day in dailyForecast"
          :key="day.date"
          class="bg-slate-900 rounded-xl p-6 text-center"
        >
          <p class="font-semibold">
            {{ day.day }}
          </p>

          <img
            :src="iconUrl(day.icon)"
            class="mx-auto w-14 h-14 my-2"
          />

          <p class="text-lg">
            {{ Math.round(day.max) }}°
          </p>

          <p class="text-slate-400 text-sm">
            {{ Math.round(day.min) }}°
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

// Added: Group forecast by day to show 5-day forecast with min/max temperatures
const dailyForecast = computed(() => {
  if (!weather.value) return []

  const days = {}

  weather.value.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0]

    if (!days[date]) {
      days[date] = {
        date,
        day: new Date(date).toLocaleDateString(undefined, {
          weekday: "short"
        }),
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon
      }
    } else {
      days[date].min = Math.min(days[date].min, item.main.temp_min)
      days[date].max = Math.max(days[date].max, item.main.temp_max)
    }
  })

  return Object.values(days).slice(0, 5)
})

// Added: Helper function to get weather icon URL from OpenWeatherMap
const iconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`
</script>
