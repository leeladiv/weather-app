<template>
  <aside class="w-56 bg-slate-900 text-white flex flex-col p-4 space-y-4">
    <nav class="flex flex-col space-y-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="selectTab(tab.key)"
        :class="[
          'text-left px-3 py-2 rounded-md',
          activeTab === tab.key ? 'bg-slate-700 font-bold' : 'hover:bg-slate-700'
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>

    <div v-if="activeTab === 'radar'" class="mt-4 flex-1">
      <p class="mb-2 text-sm text-slate-400">Radar Preview</p>
      <div ref="radarMap" class="w-full h-48 rounded-md border border-slate-700"></div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import L from "leaflet"

const tabs = [
  { key: "today", label: "Today" },
  { key: "hourly", label: "Hourly" },
  { key: "monthly", label: "Monthly" },
  { key: "radar", label: "Radar" }
]

const activeTab = ref("today")
const emit = defineEmits(["changeView"])

const radarMap = ref(null)
let mapInstance = null
let radarLayer = null

function selectTab(key) {
  activeTab.value = key
  emit("changeView", key)
}

function initializeRadarMap() {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }

  mapInstance = L.map(radarMap.value, {
    center: [6.3, -10.8], // Default Monrovia coords (lat, lon)
    zoom: 6,
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    tap: false,
    touchZoom: false
  })

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance)

  radarLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=b099a1ea337770b899243842cf9d70a2`,
    { opacity: 0.7 }
  )
  radarLayer.addTo(mapInstance)
}

watch(activeTab, (newTab) => {
  if (newTab === "radar") {
    // Initialize or refresh radar map when Radar tab is selected
    if (radarMap.value) {
      initializeRadarMap()
    }
  } else {
    // If switching away from radar, remove map to free resources
    if (mapInstance) {
      mapInstance.remove()
      mapInstance = null
    }
  }
})

// Initialize radar map if Sidebar loads with radar active
onMounted(() => {
  if (activeTab.value === "radar" && radarMap.value) {
    initializeRadarMap()
  }
})
</script>

<style scoped>
/* Set leaflet map height & width */
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>