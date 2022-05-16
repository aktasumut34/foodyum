<template>
  <div
    class="fy-overflow-hidden fy-rounded-lg fy-shadow-2xl fy-drop-shadow-2xl fy-ring-1 fy-ring-black fy-ring-opacity-5"
  >
    <div class="fy-relative fy-grid fy-gap-8 fy-bg-white fy-p-7">
      <button
        class="fy-w-full fy-bg-slate-600 fy-text-white fy-text-sm fy-px-4 fy-py-2 fy-rounded-md fy-shadow-2xl hover:fy-bg-slate-700 fy-transition-colors"
        @click="logout"
      >
        <span v-if="loadingLogout"> <fa icon="spinner" spin></fa></span>
        <span v-else> Logout </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useUser } from "../../store/user";
const userStore = useUser();
const loadingLogout = ref(false);
const logout = async () => {
  loadingLogout.value = true;
  await userStore.logout();
  loadingLogout.value = false;
};
</script>
