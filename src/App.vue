<template>
  <div class="flex flex-col w-full bg-slate-950">
    
    <!-- Header -->
    <searchBar @citySelected="handleCityChange" />
    
     <button 
    @click="isSidebarOpen = true" 
    class="md:hidden p-2 items-start flex text-white z-50">  ☰ 
    </button>
    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      
      <!--Sidebar component for navigation between views -->
      <sideBar 
      :mobileOpen="isSidebarOpen" 
      @close="isSidebarOpen = false"
       />
      
      
      <!-- Router view to display the current route component (Today, Hourly, Monthly, or Radar) -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"
import { ref } from "vue"
import searchBar from "@/components/searchBar.vue"
import sideBar from "@/components/sideBar.vue"

// Get router and route instances for navigation
const router = useRouter()
const route = useRoute()

//Create state to track if sidebar is open
const isSidebarOpen = ref(false);

// Handle city change by navigating to current route with new city parameter
const handleCityChange = (city) => {
  const cityParam = city || "Monrovia"
  // Navigate to current route with new city, or default to today if no route
  const currentRouteName = route.name || "today"
  router.push({ name: currentRouteName, params: { city: cityParam } })
}
</script>
