<template>
  <div class="fy-flex fy-flex-col fy-py-4 fy-px-8 fy-gap-8">
    <div class="fy-flex fy-justify-between">
      <div class="fy-text-6xl fy-text-slate-700">
        {{ locationInfo.data.name }}
      </div>
    </div>
    <div class="fy-grid fy-grid-cols-1 lg:fy-grid-cols-2 fy-gap-6">
      <MenuCategory
        v-for="category in productMenu.data.product_categories"
        :key="category.id"
        :category="category"
      ></MenuCategory>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { inject } from "vue";
// import { AxiosInstance } from "axios";
// const api: AxiosInstance = inject("api")!;
import MenuCategory from "./components/MenuCategory.vue";
import { locationInfo, productMenu } from "./fakeData";
</script>

<style scoped></style>
