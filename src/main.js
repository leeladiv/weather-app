import './assets/main.css'
// Removed: Leaflet CSS import since we're no longer using Leaflet for radar view

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
