<template>
  <header class="w-full bg-slate-900 text-white px-6 py-4 flex items-center gap-4">

    <!-- Search -->
    <div class="relative w-full  ml-[35%] max-w-md">
        <form @submit.prevent="searchCity" class="flex gap-2 mb-8">
      <input
        v-model="query"
        @input="searchCities"
        @keydown.enter.prevent="selectCity(query)"
        type="text"
        placeholder="Search city..."
        class="flex-1 px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        class="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition"
      >
        Go
      </button>
    </form>

      <!-- Suggestions -->
      <ul
        v-if="suggestions.length"
        class="absolute z-10 mt-2 w-full bg-slate-800 rounded-md shadow-lg overflow-hidden"
      >
        <li
          v-for="city in suggestions"
          :key="city.lat + city.lon"
          @click="selectCity(city.name)"
          class="px-4 py-2 cursor-pointer hover:bg-slate-700"
        >
          {{ city.name }}
          <span class="text-sm text-slate-400">
            , {{ city.state || "" }} {{ city.country }}
          </span>
        </li>
      </ul>
    </div>
    
  </header>
</template>

<script setup>
import { ref } from "vue"
import useWeather from "@/composables/weather.data.js"

const emit = defineEmits(["citySelected"])

const query = ref("")
const suggestions = ref([])

const { fetchWeatherByCity } = useWeather()

const GEO_API = "https://api.openweathermap.org/geo/1.0/direct"
const API_KEY = "b099a1ea337770b899243842cf9d70a2"

let debounceTimeout

const searchCities = () => {
  clearTimeout(debounceTimeout)

  if (query.value.length < 2) {
    suggestions.value = []
    return
  }

  debounceTimeout = setTimeout(async () => {
    const res = await fetch(
      `${GEO_API}?q=${encodeURIComponent(query.value)}&limit=5&appid=${API_KEY}`
    )
    suggestions.value = await res.json()
  }, 300)
}

const selectCity = (cityName) => {
  fetchWeatherByCity(cityName)
  emit("citySelected", cityName)
  query.value = cityName
  suggestions.value = []
}
</script>