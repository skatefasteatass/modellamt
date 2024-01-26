import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView
    }

  ]
})

export default router
