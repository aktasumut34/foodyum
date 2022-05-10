import { defineStore } from "pinia";
import { Product } from "../types/app";

interface IModalState {
  product: Product | null;
  isOpen: boolean;
}

export const useModal = defineStore("modal", {
  state: (): IModalState => {
    return {
      isOpen: false,
      product: null,
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
  },
});
