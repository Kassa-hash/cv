<template>
  <Menu />
  <div class="p-10 text-center">
    <h1 class="text-3xl font-bold">Welcome</h1>
    <p v-if="user" class="mt-4 text-lg">
      Hello, {{ user.name }} ({{ user.email }})
    </p>
    <p v-else class="mt-4 text-gray-400">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios.js";
import Menu from "./Menu.vue";

const user = ref(null);
const router = useRouter();

const fetchUser = async () => {
    try {
        const response = await axios.get("/api/user");
        user.value = response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/");
    }
};

onMounted(fetchUser);
</script>