import { createRouter, createWebHistory } from 'vue-router'
import Usage from './components/Usage.vue'
import Details from './components/Details.vue'
import LoginForm from './components/LoginForm.vue'

const routes = [
  { path: '/', component: LoginForm },
  { path: '/usage', component: Usage },
  { path: '/other', component: Details }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
