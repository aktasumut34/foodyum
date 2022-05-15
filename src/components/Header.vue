<template>
  <div class="fy-flex fy-justify-between fy-items-center">
    <div class="fy-text-4xl fy-text-slate-700">
      {{ locationInfo.name }}
    </div>
    <div class="fy-flex fy-items-center fy-gap-6">
      <Cart />
      <User />
    </div>
  </div>
</template>
<script setup lang="ts">
import { LocationInfo } from "../types/app";
import Cart from "./Cart.vue";
import User from "./User.vue";

defineProps<{
  locationInfo: LocationInfo;
}>();
</script>
