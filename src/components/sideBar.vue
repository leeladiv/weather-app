<template>
  <aside class="w-56 bg-slate-900 text-white hidden md:flex flex-col p-4 space-y-4">
        <!-- App Title -->
    <div class="flex justify-between items-center">
     <h1 class="text-xl font-bold whitespace-nowrap">
      Weather</h1>
    </div>

            <!-- Close Button (Visible only on mobile) -->
    <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden text-white">☰</button>

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
  </aside>

    <!-- New: Overlay backdrop for mobile (closes sidebar when clicked) -->
  <div 
    v-if="isSidebarOpen" 
    @click="$emit('close')"
    class="fixed inset-0 bg-white/50 z-40 md:hidden"
  ></div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRouter, useRoute } from "vue-router"

// Receive the prop from App.vue
defineProps({
  isSidebarOpen: Boolean
})

//Define emits to tell App.vue to close the menu
const emit = defineEmits(['close'])

//Get router and route instances for navigation and route tracking
const router = useRouter()
const route = useRoute()

// Define navigation tabs with their corresponding route names
const tabs = [
  { key: "today", label: "Today", routeName: "today" },
  { key: "hourly", label: "Hourly", routeName: "hourly" },
  { key: "monthly", label: "Monthly", routeName: "monthly" },
  { key: "radar", label: "Radar", routeName: "radar" }
]

// Computed property to get active tab based on current route name
const activeTab = computed(() => {
  const routeName = route.name
  const tab = tabs.find(t => t.routeName === routeName)
  return tab ? tab.key : "today"
})

// Function to navigate to selected tab using Vue Router
function selectTab(key) {
  const tab = tabs.find(t => t.key === key)
  if (tab) {
    // Get current city from route params or use default
    const city = route.params.city || "Monrovia"

    // Navigate to the selected route with city parameter
    router.push({ name: tab.routeName, params: { city } })

        // Close sidebar on mobile after clicking a link
    emit('close') 
  }
}
</script>