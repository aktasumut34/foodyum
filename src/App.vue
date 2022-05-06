<template>
  <div v-if="isLoading">Loading..</div>
  <div class="fy-flex fy-flex-col fy-py-4 fy-px-8 fy-gap-8" v-else>
    <div class="fy-flex fy-justify-between">
      <div class="fy-text-6xl fy-text-slate-700">
        {{ locationInfo.data.name }}
      </div>
    </div>
    <div class="fy-grid fy-grid-cols-1 lg:fy-grid-cols-2 fy-gap-6">
      <MenuCategory
        v-for="category in productCategories"
        :key="category.id"
        :category="category"
      ></MenuCategory>
    </div>

    <Modal />
  </div>
</template>

<script setup lang="ts">
import { AxiosInstance } from "axios";
import { inject, ref, onMounted } from "vue";
import MenuCategory from "./components/MenuCategory.vue";
import Modal from "./components/Modal.vue";
import { useCart } from "./store/cart";
import { locationInfo } from "./fakeData";
const isLoading = ref(true);
const cart = useCart();
const productCategories = ref([]);
onMounted(async () => {
  const api: AxiosInstance = inject("api")!;
  const response = await api.get("product-menu");
  productCategories.value = response.data.data.product_categories;
  isLoading.value = false;
});
</script>

<style scoped></style>
