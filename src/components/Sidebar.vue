<template>
<div class="relative flex min-h-screen">

    <div class="bg-cyan-600 text-cyan-100 w-64 space-y-6 px-2 py-6 absolute inset-y-0 left-0 md:relative md:translate-x-0 transform -translate-x-full
    transition duration-200 ease-in-out font-extrabold">


        <a href="#" class="flex items-center py-3 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-10 w-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
</svg><span class="text-2xl font-extrabold text-white">Weather App</span>

</a>
<nav>
    <a href="#" class=" group flex items-center py-3 px-4 hover:text-cyan-300 hover:bg-cyan-700 hover:rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>
<span class="text-white group-hover:text-cyan-300">Today</span>
</a>
    <a href="#" class=" group hover:text-cyan-300 flex items-center py-3 px-4 hover:bg-cyan-700 hover:rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<span class="text-white group-hover:text-cyan-300">Hourly</span>
    </a>
    <a href="#" class="group hover:text-cyan-300 flex items-center py-3 px-4 hover:bg-cyan-700 hover:rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
<span class="text-white group-hover:text-cyan-300">10-Day</span>

    </a>
    <a href="#" class="group hover:text-cyan-300 flex items-center py-3 px-4 hover:bg-cyan-700 hover:rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
<span class="text-white group-hover:text-cyan-300">Monthly</span>
    </a>
    <a href="#" class="group hover:text-cyan-300 flex items-center py-3 px-4 hover:bg-cyan-700 hover:rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
</svg>
<span class="text-white group-hover:text-cyan-300">Radar</span>
    </a>
</nav>
    </div>

    <div class="flex-1">
        <div class="bg-white shadow px-2 py-4">
            <input type="text" placeholder="Search City" class="flex items-center w-200 px-4 py-3
             border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"/>

            
        </div>
        <div class="p-8 text-cyan-700 font-extrabold">
            
        </div>
    </div>
</div>

<Hourly/>

</template>

<script>
import Hourly from './hourly.vue'

export default {
  components: {
    Hourly
  }
}
</script>

<style>

</style>