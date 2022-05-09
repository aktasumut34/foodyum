<template>
  <div class="fy-flex fy-gap-3 fy-flex-col hover:fy-bg-slate-100 fy-p-4">
    <span class="fy-text-slate-700 fy-text-4xl">{{ category.name }}</span>
    <div>
      <img
        :src="category.img_url"
        class="fy-w-full fy-h-auto fy-object-cover"
      />
    </div>
    <div class="fy-flex fy-flex-col">
      <CategoryItem
        v-for="item in category.products"
        :item="item"
      ></CategoryItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryItem from "./CategoryItem.vue";
import { ProductCategory } from "../types/app";
defineProps<{
  category: ProductCategory;
}>();
</script>
