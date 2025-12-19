<template>
  <div class="flex flex-col bg-slate-950">
    <!-- Header -->
    <searchBar @citySelected="handleCityChange" />

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Added: Sidebar component for navigation between views -->
      <sideBar />
      <!-- Added: Router view to display the current route component (Today, Hourly, Monthly, or Radar) -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"
import searchBar from "@/components/searchBar.vue"
import sideBar from "@/components/sideBar.vue"

// Added: Get router and route instances for navigation
const router = useRouter()
const route = useRoute()

// Added: Handle city change by navigating to current route with new city parameter
const handleCityChange = (city) => {
  const cityParam = city || "Monrovia"
  // Navigate to current route with new city, or default to today if no route
  const currentRouteName = route.name || "today"
  router.push({ name: currentRouteName, params: { city: cityParam } })
}
</script>