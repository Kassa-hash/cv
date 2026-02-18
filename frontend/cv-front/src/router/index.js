import { createRouter, createWebHistory } from "vue-router"
import Login from "@/components/Login.vue"
import Welcome from "@/components/Welcome.vue"
import CvForm from "@/components/CvForm.vue"
import CvList from "@/components/CvList.vue"
import UploadCv from "@/components/UploadCv.vue"
const routes = [
    { path: "/", component: Login },
    { path: "/welcome", component: Welcome },
    { path: "/showcvform", component: CvForm },
    { path: "/showmycvs", component: CvList },
    { path: "/showuploadcvform", component: UploadCv },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
