<template>
  <form @submit.prevent="handleSubmit" class="w-full">
    <div class="flex flex-col sm:flex-row gap-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Enter city name..."
        class="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition border border-slate-200 dark:border-slate-700"
        :disabled="loading"
        autocomplete="off"
      />
      <button
        type="submit"
        :disabled="loading || !searchQuery.trim()"
        class="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transition duration-200 whitespace-nowrap"
      >
        <span v-if="!loading">Search</span>
        <span v-else class="inline-flex items-center gap-2">
          <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Searching...
        </span>
      </button>
    </div>
  </form>

  <!--<weatherCard /> -->

</template>

<script setup>
import { ref } from 'vue'
//import weatherCard from './weatherCard.vue'

defineProps({
  loading: Boolean
})

const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSubmit = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    searchQuery.value = ''
  }
}
</script>
