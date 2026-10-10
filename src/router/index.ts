import { createRouter, createWebHistory } from 'vue-router'
import { recettesRoutes } from '@/modules/recettes/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...recettesRoutes],
})

export default router
