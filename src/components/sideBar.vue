<template>
  <aside class="w-56 bg-slate-900 text-white flex flex-col p-4 space-y-4">
        <!-- App Title -->
    <h1 class="text-xl font-bold whitespace-nowrap">
      Weather
    </h1>
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

    <!--I remove radar and put it in Views-->
  </aside>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRouter, useRoute } from "vue-router"

// Added: Get router and route instances for navigation and route tracking
const router = useRouter()
const route = useRoute()

// Added: Define navigation tabs with their corresponding route names
const tabs = [
  { key: "today", label: "Today", routeName: "today" },
  { key: "hourly", label: "Hourly", routeName: "hourly" },
  { key: "monthly", label: "Monthly", routeName: "monthly" },
  { key: "radar", label: "Radar", routeName: "radar" }
]

// Added: Computed property to get active tab based on current route name
const activeTab = computed(() => {
  const routeName = route.name
  const tab = tabs.find(t => t.routeName === routeName)
  return tab ? tab.key : "today"
})

// Added: Function to navigate to selected tab using Vue Router
function selectTab(key) {
  const tab = tabs.find(t => t.key === key)
  if (tab) {
    // Get current city from route params or use default
    const city = route.params.city || "Monrovia"
    // Navigate to the selected route with city parameter
    router.push({ name: tab.routeName, params: { city } })
  }
}
</script>