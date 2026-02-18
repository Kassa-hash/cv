<template>
  <Menu />
  <div class="p-10">
    <h2 class="mb-6 text-2xl font-bold">Mes CVs</h2>

    <p v-if="loading" class="text-slate-400">Chargement...</p>
    <p v-else-if="cvs.length === 0" class="text-slate-400">Aucun CV uploadé pour le moment.</p>

    <div v-else class="flex flex-col gap-8">
      <div
        v-for="cv in cvs"
        :key="cv.id"
        class="rounded-lg border border-slate-200 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950"
      >
        <div class="mb-3 flex items-center justify-between">
          <p class="truncate text-sm font-semibold">{{ cv.path }}</p>
          <p class="text-xs text-slate-400">
            {{ new Date(cv.created_at).toLocaleDateString() }}
          </p>
        </div>

        <!-- Affichage PDF inline -->
        <iframe
          :src="`http://localhost:8000/storage/${cv.path}`"
          class="h-[600px] w-full rounded-md border border-slate-200"
          type="application/pdf"
        />

        
          <a :href="`http://localhost:8000/storage/${cv.path}`"
          target="_blank"
          class="mt-3 inline-block rounded-md bg-orange-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Ouvrir dans un nouvel onglet
        </a>
      </div>
    </div>

    <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axios.js";
import Menu from "./Menu.vue";

const cvs = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const fetchCvs = async () => {
    try {
        const response = await axios.get("/api/my-cvs");
        cvs.value = response.data;
    } catch (error) {
        console.error(error);
        errorMessage.value = "Impossible de récupérer vos CVs.";
    } finally {
        loading.value = false;
    }
};

onMounted(fetchCvs);
</script>