<template>
  <div class="p-10 text-center">
    <h2 class="mb-6 text-2xl font-bold">Upload your CV</h2>

    <input
      type="file"
      @change="handleFile"
      class="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-600"
    />

    <p v-if="selectedFile" class="mb-4 text-sm text-slate-500">
      Selected: {{ selectedFile.name }}
    </p>

    <button
      @click="uploadFile"
      :disabled="loading"
      class="rounded-md bg-orange-500 px-6 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
    >
      {{ loading ? "Uploading..." : "Upload" }}
    </button>

    <p v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios.js";

const selectedFile = ref(null);
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const handleFile = (event) => {
    selectedFile.value = event.target.files[0];
    successMessage.value = "";
    errorMessage.value = "";
};

const uploadFile = async () => {
    if (!selectedFile.value) {
        errorMessage.value = "Please select a file first.";
        return;
    }

    loading.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    const formData = new FormData();
    formData.append("file", selectedFile.value);

    try {
        const response = await axios.post("/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        successMessage.value = "File uploaded successfully!";
        selectedFile.value = null;
        console.log("Upload response:", response.data);
    } catch (error) {
        console.error("Upload error:", error.response);
        errorMessage.value = error.response?.data?.message || "Error uploading file.";
    } finally {
        loading.value = false;
    }
};
</script>