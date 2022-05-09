import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Product } from "../types/app";

export const useCart = defineStore("cart", {
  state: () => {
    return {
      // Reactive localStorage, magic!
      cart: useStorage("cart", [], undefined, {
        serializer: {
          read: (v: any) => (v ? JSON.parse(v) : null),
          write: (v: any) => JSON.stringify(v),
        },
      }),
    };
  },
  getters: {
    total: (state) => {
      return state.cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  actions: {
    add(item: Product) {
      const cur = this.cart.find((i) => i.id === item.id);
      cur ? cur.quantity++ : this.cart.push({ ...item, quantity: 1 });
    },
    remove(item: Product) {
      this.cart.splice(this.cart.indexOf(item), 1);
    },
    clear() {
      this.cart = [];
    },
  },
});
