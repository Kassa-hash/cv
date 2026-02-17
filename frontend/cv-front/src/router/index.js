import { createRouter, createWebHistory } from "vue-router"
import Login from "@/components/Login.vue"
import Welcome from "@/components/Welcome.vue"
const routes = [
    { path: "/", component: Login },
    { path: "/welcome", component: Welcome },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
