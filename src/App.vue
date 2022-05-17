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
    <ProductModal />
    <OrderModal />
  </div>
</template>

<script setup lang="ts">
import { AxiosInstance } from "axios";
import { inject, ref, onMounted, computed } from "vue";
import MenuCategory from "./components/MenuCategory.vue";
import ProductModal from "./components/ProductModal.vue";
import OrderModal from "./components/OrderModal.vue";
import Header from "./components/Header.vue";
import { ProductCategory, LocationInfo, TenantInfo } from "./types/app";
import { useLocation } from "./store/location";
import { useCategories } from "./store/categories";

const isLoading = ref(true);
const locationStore = useLocation();
const categoriesStore = useCategories();
const locationInfo = computed(() => locationStore.location);
const productCategories = computed(() => categoriesStore.product_categories);
onMounted(async () => {
  const api: AxiosInstance = inject("api")!;
  const locationResponse = await api.get<{
    data: {
      location: LocationInfo;
      tenant: TenantInfo;
    };
  }>("location");
  locationStore.setLocation(locationResponse.data.data.location);
  locationStore.setTenant(locationResponse.data.data.tenant);
  const menuResponse = await api.get<{
    data: {
      product_categories: ProductCategory[];
    };
  }>("product-menu");
  categoriesStore.setCategories(menuResponse.data.data.product_categories);

  isLoading.value = false;
});
</script>

<style scoped></style>
