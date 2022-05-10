import { RemovableRef, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Product } from "../types/app";

interface ICartItem extends Product {
  quantity?: number;
}

export const useCart = defineStore("cart", {
  state: (): { cart: RemovableRef<ICartItem[]> } => {
    return {
      cart: useStorage<ICartItem[]>("cart", [], localStorage, {
        serializer: {
          read: (v: any) => (v ? JSON.parse(v) : null),
          write: (v: any) => JSON.stringify(v),
        },
      }),
    };
  },
  getters: {
    total: (state): string => {
      return state.cart
        .reduce(
          (acc: number, item: ICartItem) => acc + item.price * item.quantity,
          0
        )
        .toFixed(2);
    },
  },
  actions: {
    add(item: Product) {
      const cur = this.cart.find((i: Product) => i.id === item.id);
      cur ? cur.quantity++ : this.cart.push({ ...item, quantity: 1 });
    },
    remove(item: Product): void {
      this.cart.splice(this.cart.indexOf(item), 1);
    },
    clear(): void {
      this.cart = [];
    },
  },
});
