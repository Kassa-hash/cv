<template>
  <Menu></Menu>
  <div class="p-10 text-center">
    <h1 class="text-3xl font-bold">Welcome</h1>
    <p class="mt-4 text-lg" v-if="user">Hello, {{ user.name }} ({{ user.email }})</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Menu from "./Menu.vue";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

const user = ref(null);
const router = useRouter();

const fetchUser=async()=>{
    try {

        // await axios.get("/sanctum/csrf-cookie");
        const response = await axios.get("/api/user");
        user.value = response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/");
    }
};
onMounted(fetchUser);
</script>