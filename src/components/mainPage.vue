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
    <section v-if="weather && view === 'today'" class="space-y-6">
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

    <!-- HOURLY -->
    <section v-if="weather && view === 'hourly'">
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

    <!-- MONTHLY (Daily Forecast) -->
    <section v-if="weather && view === 'monthly'">
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
import useWeather from "@/composables/weather.data.js"

const props = defineProps({
  city: String,
  view: String
})

const { weather, loading, error, fetchWeatherByCity } = useWeather()

onMounted(() => {
  fetchWeatherByCity(props.city || "Monrovia")
})
console.log(loading)
console.log(error)

watch(
  () => props.city,
  (newCity) => {
    if (newCity) fetchWeatherByCity(newCity)
  }
)

const formattedDate = computed(() =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric"
  })
)

const hourlyForecast = computed(() =>
  weather.value?.list.slice(0, 8) || []
)

// Group forecast by day
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

const formatHour = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "numeric" })
  console.log(formatHour)

const iconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`
</script>