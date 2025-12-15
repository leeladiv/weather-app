<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

      <!-- Weather Content -->
      <div class="max-h-150 overflow-y-auto">
        <div v-for="day in forecast" :key="day.date" class="border-b">
          <!-- Day Header -->
          <div class="bg-gray-100 px-4 py-3 font-semibold text-gray-700 sticky top-0">
            {{ day.date }}
          </div>

          <!-- Hourly Forecast -->
          <div v-for="hour in day.hours" :key="hour.time" 
               class="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100">
            <!-- Time -->
            <div class="w-16 text-gray-700 font-medium">
              {{ hour.time }}
            </div>

            <!-- Temperature -->
            <div class="w-12 text-gray-900 font-semibold">
              {{ hour.temp }}°
            </div>

            <!-- Weather Icon -->
            <div class="w-12 flex justify-center">
              <component :is="getWeatherIcon(hour.condition)" class="w-8 h-8" />
            </div>

            <!-- Condition -->
            <div class="flex-1 text-gray-600 text-sm ml-3">
              {{ hour.condition }}
            </div>

            <!-- Precipitation -->
            <div class="flex items-center text-gray-600 text-sm mr-4">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.074 1.632.74 2.047A3.989 3.989 0 007 15a3.989 3.989 0 002.078-.127c.666-.415.99-1.267.74-2.047L9 10.274V7a1 1 0 10-2 0v3.274z" clip-rule="evenodd"/>
              </svg>
              {{ hour.precipitation }}%
            </div>

            <!-- Wind -->
            <div class="flex items-center text-gray-600 text-sm w-24">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
              {{ hour.wind }}
            </div>

            <!-- Plus Icon -->
            <div class="text-gray-400 cursor-pointer hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="p-4 bg-gray-50 border-t">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search City or Postcode"
            class="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg class="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Location with Star -->
      <div class="px-4 py-3 bg-white border-t flex items-center text-gray-700">
        <span class="font-medium">{{ location }}</span>
        <svg class="w-5 h-5 ml-2 text-gray-400 cursor-pointer hover:text-yellow-400" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const location = ref('Monrovia')
const searchQuery = ref('')

const forecast = ref([
  {
    date: 'Monday, 15 December',
    hours: [
      { time: '16:00', temp: 27, condition: 'Mostly Cloudy', precipitation: 14, wind: 'SW 10 km/h' },
      { time: '17:00', temp: 27, condition: 'Mostly Cloudy', precipitation: 12, wind: 'SW 11 km/h' },
      { time: '18:00', temp: 26, condition: 'Mostly Cloudy', precipitation: 13, wind: 'SW 9 km/h' },
      { time: '19:00', temp: 26, condition: 'Mostly Cloudy', precipitation: 14, wind: 'SW 8 km/h' },
      { time: '20:00', temp: 25, condition: 'Cloudy', precipitation: 15, wind: 'SSW 9 km/h' },
      { time: '21:00', temp: 25, condition: 'Mostly Cloudy', precipitation: 14, wind: 'S 8 km/h' },
      { time: '22:00', temp: 25, condition: 'Few Showers', precipitation: 31, wind: 'SE 7 km/h' },
      { time: '23:00', temp: 25, condition: 'Showers', precipitation: 48, wind: 'ENE 7 km/h' }
    ]
  },
  {
    date: 'Tuesday, 16 December',
    hours: [
      { time: '00:00', temp: 25, condition: 'Showers', precipitation: 45, wind: 'E 7 km/h' },
      { time: '01:00', temp: 25, condition: 'Showers', precipitation: 46, wind: 'ENE 7 km/h' },
      { time: '02:00', temp: 25, condition: 'Showers', precipitation: 44, wind: 'ENE 6 km/h' },
      { time: '03:00', temp: 25, condition: 'Showers', precipitation: 40, wind: 'NE 8 km/h' },
      { time: '04:00', temp: 25, condition: 'Showers', precipitation: 57, wind: 'NE 8 km/h' },
      { time: '05:00', temp: 24, condition: 'Rain', precipitation: 64, wind: 'NE 8 km/h' },
      { time: '06:00', temp: 24, condition: 'Showers', precipitation: 46, wind: 'ENE 10 km/h' },
      { time: '07:00', temp: 24, condition: 'Showers', precipitation: 39, wind: 'ENE 7 km/h' },
      { time: '08:00', temp: 24, condition: 'Mostly Cloudy', precipitation: 23, wind: 'ENE 7 km/h' },
      { time: '09:00', temp: 25, condition: 'Mostly Cloudy', precipitation: 23, wind: 'ENE 7 km/h' },
      { time: '10:00', temp: 27, condition: 'Mostly Cloudy', precipitation: 23, wind: 'ENE 7 km/h' },
      { time: '11:00', temp: 28, condition: 'Mostly Cloudy', precipitation: 21, wind: 'ENE 11 km/h' },
      { time: '12:00', temp: 28, condition: 'Mostly Cloudy', precipitation: 24, wind: 'ENE 12 km/h' }
    ]
  },
  {
    date: 'Wednesday, 17 December',
    hours: [
      { time: '00:00', temp: 25, condition: 'Mostly Cloudy', precipitation: 16, wind: 'W 5 km/h' },
      { time: '01:00', temp: 25, condition: 'Mostly Cloudy', precipitation: 11, wind: 'WNW 5 km/h' },
      { time: '12:00', temp: 29, condition: 'Mostly Cloudy', precipitation: 9, wind: 'W 7 km/h' },
      { time: '13:00', temp: 30, condition: 'Mostly Cloudy', precipitation: 24, wind: 'WSW 8 km/h' },
      { time: '14:00', temp: 30, condition: 'Mostly Cloudy', precipitation: 24, wind: 'WSW 10 km/h' },
      { time: '15:00', temp: 29, condition: 'Mostly Cloudy', precipitation: 19, wind: 'WSW 12 km/h' }
    ]
  }
])

const getWeatherIcon = (condition) => {
  const icons = {
    'Mostly Cloudy': 'CloudyIcon',
    'Cloudy': 'CloudIcon',
    'Showers': 'RainIcon',
    'Few Showers': 'RainIcon',
    'Rain': 'HeavyRainIcon'
  }
  return icons[condition] || 'CloudIcon'
}

// Weather Icon Components
const CloudyIcon = {
  template: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="24" r="11" fill="#FDB813"/>
      <path d="M16 38c0-4.4 3.6-8 8-8 1.3 0 2.5.3 3.6.9C28.8 28.2 31.8 26 35.5 26c5 0 9.1 4.1 9.1 9.1 0 .3 0 .6-.1.9 2.8.8 4.9 3.3 4.9 6.3 0 3.6-2.9 6.5-6.5 6.5H22c-3.3 0-6-2.7-6-6z" fill="#9CA3AF"/>
    </svg>
  `
}

const CloudIcon = {
  template: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 40c0-4.4 3.6-8 8-8 1.3 0 2.5.3 3.6.9C28.8 30.2 31.8 28 35.5 28c5 0 9.1 4.1 9.1 9.1 0 .3 0 .6-.1.9 2.8.8 4.9 3.3 4.9 6.3 0 3.6-2.9 6.5-6.5 6.5H22c-3.3 0-6-2.7-6-6z" fill="#6B7280"/>
    </svg>
  `
}

const RainIcon = {
  template: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 36c0-4.4 3.6-8 8-8 1.3 0 2.5.3 3.6.9C28.8 26.2 31.8 24 35.5 24c5 0 9.1 4.1 9.1 9.1 0 .3 0 .6-.1.9 2.8.8 4.9 3.3 4.9 6.3 0 3.6-2.9 6.5-6.5 6.5H22c-3.3 0-6-2.7-6-6z" fill="#6B7280"/>
      <path d="M26 48l-2 6m8-6l-2 6m8-6l-2 6" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `
}

const HeavyRainIcon = {
  template: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 36c0-4.4 3.6-8 8-8 1.3 0 2.5.3 3.6.9C28.8 26.2 31.8 24 35.5 24c5 0 9.1 4.1 9.1 9.1 0 .3 0 .6-.1.9 2.8.8 4.9 3.3 4.9 6.3 0 3.6-2.9 6.5-6.5 6.5H22c-3.3 0-6-2.7-6-6z" fill="#4B5563"/>
      <path d="M24 48l-2 8m8-8l-2 8m8-8l-2 8m8-8l-2 8" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `
}
</script>