<template>
  <div
    class="h-96 rounded-lg dark:bg-slate-900 dark:text-white"
    :class="isUserOnMobile && 'relative'"
  >
    <div
      class="flex h-16 items-center justify-between px-3 md:border-b md:px-6 dark:border-slate-600"
    >
      <img
        class="size-8"
        src="https://citrusui.in/media/citrusui_logo.svg"
        alt="Your Brand"
      />

      CVCREATION

      <div class="flex items-center justify-center">
        <nav
          v-if="showSidebar || !isUserOnMobile"
          class="flex flex-col gap-4 md:flex-row"
          :class="
            isUserOnMobile &&
            'absolute inset-y-0 right-0 mt-0 h-full w-full bg-white p-3 dark:bg-slate-900'
          "
        >
          <div v-if="isUserOnMobile" class="flex h-10 items-center justify-end">
            <XMarkIcon
              class="size-6 cursor-pointer"
              v-if="showSidebar"
              @click="showSidebar = false"
            />
          </div>
          <button
            class="text-nowrap rounded-md bg-orange-500 px-4 py-1 text-sm text-white hover:bg-orange-600"
            :class="isUserOnMobile && 'py-2 text-base'"
            v-on:click="createCV"
          >
            Créer un CV
          </button>
          <button
            class="text-nowrap rounded-md bg-orange-500 px-4 py-1 text-sm text-white hover:bg-orange-600"
            :class="isUserOnMobile && 'py-2 text-base'"
            v-on:click="myCVs"
          >
            Mes CV
          </button>
          <button
            class="text-nowrap rounded-md bg-orange-500 px-4 py-1 text-sm text-white hover:bg-orange-600"
            :class="isUserOnMobile && 'py-2 text-base'"
            v-on:click="uploadCV"
          >
            Uploader un CV existant
          </button>
        </nav>

        <div class="flex items-center gap-2">
          <!-- Menu Icon On Mobile -->

          <div v-if="isUserOnMobile">
            <Bars2Icon
              class="size-6 cursor-pointer"
              v-if="!showSidebar"
              @click="showSidebar = true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Bars2Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
const router = useRouter();


const showSidebar = ref(false);
const isUserOnMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isUserOnMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const createCV = () => {
  console.log("Create CV clicked");
  router.push("/showcvform");
};

const myCVs = () => {
  console.log("My CVs clicked");
  router.push("/showmycvs");
};

const uploadCV = () => {
  console.log("Upload CV clicked");
  router.push("/showuploadcvform");
};
</script>
