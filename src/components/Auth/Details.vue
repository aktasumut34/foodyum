<template>
  <div
    class="fy-overflow-hidden fy-rounded-lg fy-shadow-2xl fy-drop-shadow-2xl fy-ring-1 fy-ring-black fy-ring-opacity-5 fy-flex fy-flex-col fy-gap-6 fy-bg-white fy-p-7"
  >
    <div class="fy-relative fy-flex fy-flex-col fy-gap-1">
      <div
        class="fy-flex fy-gap-4 fy-items-center hover:fy-bg-gray-100 fy-py-3 fy-px-4 fy-cursor-pointer fy-rounded-md"
      >
        <fa class="fy-text-xl" icon="user"></fa>
        <span class="fy-text-lg">My Account</span>
      </div>
      <div
        class="fy-flex fy-gap-4 fy-items-center hover:fy-bg-gray-100 fy-py-3 fy-px-4 fy-cursor-pointer fy-rounded-md"
      >
        <fa class="fy-text-xl" icon="history"></fa>
        <span class="fy-text-lg">Order History</span>
      </div>
      <div class="fy-h-[1px] fy-bg-gray-200"></div>
      <div
        class="fy-flex fy-gap-4 fy-items-center hover:fy-bg-gray-100 fy-py-3 fy-px-4 fy-cursor-pointer fy-rounded-md"
      >
        <fa class="fy-text-xl" icon="life-ring"></fa>
        <span class="fy-text-lg">Help Center</span>
      </div>
    </div>
    <button
      class="fy-w-full fy-bg-slate-600 fy-text-white fy-text-sm fy-px-4 fy-py-2 fy-rounded-md fy-shadow-2xl hover:fy-bg-slate-700 fy-transition-colors"
      @click="logout"
    >
      <span v-if="loadingLogout"> <fa icon="spinner" spin></fa></span>
      <span v-else>Logout</span>
    </button>
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
