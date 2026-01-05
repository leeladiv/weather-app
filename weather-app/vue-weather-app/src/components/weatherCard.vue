<template>
  <div class="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
    <!-- City Header -->
    <div class="bg-linear-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 p-6 md:p-8 text-white flex items-center justify-between">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold">{{ city }}</h2>
        <p class="text-blue-100 dark:text-blue-200 text-sm md:text-base mt-1">{{ weather.condition }}</p>
      </div>
      <!-- Added favorite button -->
      <button 
        @click="$emit('addFavorite')"
        class="text-3xl hover:scale-110 transition transform"
      >
        ⭐
      </button>
    </div>

    <!-- Weather Content -->
    <div class="p-6 md:p-8">
      <!-- Main Temperature Section -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex-1">
          <div class="flex items-baseline">
            <span class="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white">{{ weather.temperature }}</span>
            <span class="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 ml-2">°C</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2">Temperature</p>
        </div>

        <!-- Weather Icon -->
        <div class="text-7xl md:text-8xl animate-pulse">
          {{ getWeatherIcon(weather.weatherCode) }}
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-200 dark:border-slate-700 my-8"></div>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-3">
            <div class="text-3xl">💨</div>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Wind Speed</p>
          </div>
          <p class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{{ weather.windSpeed }}<span class="text-sm ml-1">km/h</span></p>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-3">
            <div class="text-3xl">💧</div>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Humidity</p>
          </div>
          <p class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{{ weather.humidity }}<span class="text-sm ml-1">%</span></p>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center gap-3 mb-3">
            <div class="text-3xl">🌡️</div>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Feels Like</p>
          </div>
          <p class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{{ weather.feelsLike }}<span class="text-sm ml-1">°C</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    required: true
  },
  city: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['addFavorite'])

const getWeatherIcon = (code) => {
  if (code === 0) return '☀️'
  if (code === 1 || code === 2) return '🌤️'
  if (code === 3) return '☁️'
  if (code === 45 || code === 48) return '🌫️'
  if (code >= 51 && code <= 67) return '🌦️'
  if (code >= 71 && code <= 77) return '❄️'
  if (code >= 80 && code <= 82) return '⛈️'
  if (code >= 85 || code === 86) return '🌨️'
  if (code >= 95) return '⛈️'
  return '🌡️'
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
