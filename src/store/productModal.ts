import { defineStore } from "pinia";
import { Product, ProductCategory } from "../types/app";

interface IModalState {
  product: Product | null;
  category: ProductCategory | null;
  isOpen: boolean;
}

export const useProductModal = defineStore("modal", {
  state: (): IModalState => {
    return {
      isOpen: false,
      product: null,
      category: null,
    };
  },
  actions: {
    open(): void {
      this.isOpen = true;
    },
    close(): void {
      this.isOpen = false;
    },
    setProduct(product: Product): void {
      this.product = product;
    },
    setCategory(category: ProductCategory): void {
      this.category = category;
    },
  },
});
