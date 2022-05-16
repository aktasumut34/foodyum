import { defineStore } from "pinia";
import { ProductCategory } from "../types/app";

interface ICategoriesState {
  product_categories: ProductCategory[];
}

export const useCategories = defineStore("categories", {
  state: (): ICategoriesState => {
    return {
      product_categories: [],
    };
  },
  actions: {
    setCategories(payload: ProductCategory[]): void {
      this.product_categories = payload;
    },
  },
});
