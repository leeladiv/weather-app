<template>
  <div class="h-screen flex flex-col bg-slate-950">
    <!-- Header -->
    <searchBar @citySelected="handleCityChange" />

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar 
      <sideBar @changeView="activeView = $event" />
-->
<sideBar />
      <!-- Main Content 
      <mainPage
        :city="selectedCity"
        :view="activeView"
      />
      -->
      <mainPage />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

import searchBar from "@/components/searchBar.vue"
import sideBar from "@/components/sideBar.vue"
import mainPage from "@/components/mainPage.vue"

// Global state
const selectedCity = ref("Monrovia") // default city
const activeView = ref("today")

const handleCityChange = (city) => {
  selectedCity.value = city
}
console.log(handleCityChange)
</script>