<template>
  <div
    class="fy-flex fy-justify-between fy-items-center fy-group hover:fy-bg-slate-200 fy-py-4 fy-px-8 fy-rounded-sm fy-transition-colors fy-cursor-pointer fy-gap-4"
    @click="addToCart"
  >
    <div class="flex flex-col fy-flex-1">
      <div
        class="fy-text-slate-700 fy-text-2xl group-hover:fy-text-slate-900 fy-flex-1"
      >
        {{ item.name }}
      </div>
      <div class="fy-text-slate-500 fy-text-lg group-hover:fy-text-slate-700">
        {{ item.description }}
      </div>
    </div>
    <div>${{ item.price || 0 }}</div>
    <div class="fy-transform group-hover:fy-scale-150 fy-transition-transform">
      <fa icon="add"></fa>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product, ProductCategory } from "../types/app";
import { useModal } from "../store/modal";
const modal = useModal();
const props = defineProps<{
  item: Product;
  category: ProductCategory;
}>();
const addToCart = () => {
  modal.setProduct(props.item);
  modal.setCategory(props.category);
  modal.open();
};
</script>

<style scoped></style>
