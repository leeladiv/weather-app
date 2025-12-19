import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Added: Router configuration with routes for Today, Hourly, Monthly, and Radar views
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Added: Redirect root path to today view with default city
    {
      path: '/',
      redirect: { name: 'today', params: { city: 'Monrovia' } }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  
    // Added: Route for Today view with optional city parameter
    {
      path: '/today/:city?',
      name: 'today',
      component: () => import('../views/TodayView.vue'),
    },
    // Added: Route for Hourly view with optional city parameter
    {
      path: '/hourly/:city?',
      name: 'hourly',
      component: () => import('../views/HourlyView.vue'),
    },
    // Added: Route for Monthly view with optional city parameter
    {
      path: '/monthly/:city?',
      name: 'monthly',
      component: () => import('../views/MonthlyView.vue'),
    },
    // Added: Route for Radar view with optional city parameter (no Leaflet dependency)
    {
      path: '/radar/:city?',
      name: 'radar',
      component: () => import('../views/RadarView.vue'),
    },
  ],
})

export default router
