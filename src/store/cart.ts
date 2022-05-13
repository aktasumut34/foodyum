import { RemovableRef, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Product, ProductAddon, ProductChoice } from "../types/app";
import _ from "lodash";
interface ICartItem extends Product {
  quantity?: number;
  product_choices?: { addon: ProductAddon; choice: ProductChoice[] }[];
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
    add(
      item: Product,
      checkedList: { addon: ProductAddon; choice: ProductChoice[] }[]
    ): { message: string; success: boolean } {
      let status: { message: string; success: boolean } = {
        message: "",
        success: true,
      };
      checkedList.forEach(({ addon, choice }) => {
        let selectedChoiceLength = choice.filter((c) => c.is_selected).length;
        if (addon.force_max && selectedChoiceLength > addon.force_max) {
          status = {
            message: `${addon.name} can only be selected ${addon.force_max} times`,
            success: false,
          };
        } else if (addon.force_min && selectedChoiceLength < addon.force_min) {
          status = {
            message: `${addon.name} must be selected at least ${addon.force_min} times`,
            success: false,
          };
        }
      });
      if (status.success) {
        const cur = this.cart.find(
          (i: ICartItem) =>
            i.id === item.id && _.isEqual(i.product_choices, checkedList)
        );
        cur
          ? cur.quantity++
          : this.cart.push({
              ...item,
              quantity: 1,
              product_choices: checkedList,
            });
      }
      return status;
    },
    remove(item: Product): void {
      this.cart.splice(this.cart.indexOf(item), 1);
    },
    clear(): void {
      this.cart = [];
    },
  },
});
