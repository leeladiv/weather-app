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

    <!-- Weather Summary -->
    <div v-if="weather" class="mt-auto pt-6 border-t border-slate-700">
      <p class="text-sm text-slate-400">Now</p>
      <h3 class="text-lg font-semibold">
        {{ weather.city.name }}
      </h3>
      <p class="text-3xl font-bold">
        {{ Math.round(weather.list[0].main.temp) }}°C
      </p>
      <p class="capitalize text-slate-400">
        {{ weather.list[0].weather[0].description }}
      </p>
    </div>

    <!-- States -->
    <p v-if="loading" class="text-sm text-slate-400 mt-4">
      Loading...
    </p>
    <p v-if="error" class="text-sm text-red-400 mt-4">
      {{ error }}
    </p>

    <!-- TODAY -->
    <section v-if="weather" class="space-y-6">
      <div class="flex items-center gap-8 bg-slate-900 p-6 rounded-xl">
        <img
          :src="iconUrl(weather.list[0].weather[0].icon)"
          alt=""
          class="w-20 h-20"
        />

        <div class="text-6xl font-bold">
          {{ Math.round(weather.list[0].main.temp) }}°C
        </div>

        <div>
          <p class="capitalize text-lg">
            {{ weather.list[0].weather[0].description }}
          </p>
          <p class="text-slate-400">
            Feels like {{ Math.round(weather.list[0].main.feels_like) }}°C
          </p>
          <p class="text-slate-400">
            Humidity {{ weather.list[0].main.humidity }}%
          </p>
        </div>
      </div>

      <!-- Daily Cards -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="day in dailyForecast"
          :key="day.date"
          class="bg-slate-900 rounded-lg p-4 text-center"
        >
          <p class="text-sm text-slate-400">
            {{ day.day }}
          </p>

          <img
            :src="iconUrl(day.icon)"
            class="mx-auto w-12 h-12"
          />

          <p class="font-semibold">
            {{ Math.round(day.max) }}°
            <span class="text-slate-400">
              {{ Math.round(day.min) }}°
            </span>
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

// Added: Get city from route params to fetch weather data for the selected city
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

// Added: Group forecast by day to show 5-day forecast
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
