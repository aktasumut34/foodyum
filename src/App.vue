<template>
  <div v-if="isLoading">Loading..</div>
  <div class="fy-flex fy-flex-col fy-py-4 fy-px-8 fy-gap-8" v-else>
    <Header :location-info="locationInfo" />
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
import { inject, ref, onMounted, Ref } from "vue";
import MenuCategory from "./components/MenuCategory.vue";
import Modal from "./components/Modal.vue";
import Header from "./components/Header.vue";
import { ProductCategory, LocationInfo } from "./types/app";

const isLoading = ref(true);
const productCategories: Ref<ProductCategory[]> = ref([]);
const locationInfo: Ref<LocationInfo | null> = ref(null);

onMounted(async () => {
  const api: AxiosInstance = inject("api")!;

  const locationResponse = await api.get<{
    data: LocationInfo;
  }>("location");
  locationInfo.value = locationResponse.data.data;

  const menuResponse = await api.get<{
    data: {
      product_categories: ProductCategory[];
    };
  }>("product-menu");
  productCategories.value = menuResponse.data.data.product_categories;

  isLoading.value = false;
});
</script>

<style scoped></style>
