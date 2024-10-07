import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import FileDetails from '@/views/FileDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/file/:id',
    name: 'FileDetails',
    component: FileDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router