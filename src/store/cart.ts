import { RemovableRef, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Product, ProductAddon, ProductChoice } from "../types/app";
import _ from "lodash";
import axios from "axios";
import { useUser } from "./user";
import { useLocation } from "./location";

interface ICartItem extends Product {
  quantity?: number;
  type?: number | null;
  product_choices?: { addon: ProductAddon; choice: ProductChoice[] }[];
  cart_to_send_index: number;
  totalPriceCalculated?: number;
}

interface ICartToSend {
  product_id: number;
  quantity: number;
  product_type_id: number | null;
  product_choice_ids: number[];
  special_instruction: string;
}

const api = axios.create({
  baseURL: "https://foodyum-dev.fuelm.net/",
});

export const useCart = defineStore("cart", {
  state: (): {
    cart: RemovableRef<ICartItem[]>;
    cartToSend: RemovableRef<ICartToSend[]>;
  } => {
    return {
      cart: useStorage<ICartItem[]>("cart", [], localStorage, {
        serializer: {
          read: (v: any) => (v ? JSON.parse(v) : null),
          write: (v: any) => JSON.stringify(v),
        },
      }),
      cartToSend: useStorage<ICartToSend[]>("cartToSend", [], localStorage, {
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
          (acc: number, item: ICartItem) =>
            acc + item.totalPriceCalculated * item.quantity,
          0
        )
        .toFixed(2);
    },
  },
  actions: {
    add(
      item: Product,
      type: number | null,
      checkedList: { addon: ProductAddon; choice: ProductChoice[] }[],
      total: number
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
        const checkedList2: typeof checkedList = [];
        checkedList.forEach(({ addon, choice }) => {
          checkedList2.push({
            addon,
            choice: choice.filter((c) => c.is_selected),
          });
        });
        const choice_ids = checkedList2
          .map(({ choice }) => {
            return choice.map((c) => c.id);
          })
          .flat();
        const final = {
          product_id: item.id,
          quantity: 1,
          product_type_id: type,
          product_choice_ids: choice_ids,
          special_instruction: "Normal",
        };
        const cur = this.cartToSend.find((i: ICartToSend) =>
          _.isEqual({ ...i, quantity: final.quantity }, final)
        );
        if (cur) {
          cur.quantity += final.quantity;
          const currentItem = this.cart.find((i: ICartItem) => {
            return (
              i.id === item.id &&
              _.isEqual(i.product_choices, checkedList2) &&
              i.type === type
            );
          });
          currentItem.quantity += final.quantity;
        } else {
          const finalIndex = this.cartToSend.push(final);
          this.cart.push({
            ...item,
            quantity: 1,
            type,
            product_choices: checkedList2,
            cart_to_send_index: finalIndex - 1,
            totalPriceCalculated: total,
          });
        }
      }
      return status;
    },
    remove(item: ICartItem): void {
      this.cartToSend.splice(item.cart_to_send_index, 1);
      this.cart.splice(this.cart.indexOf(item), 1);
    },
    clear(): void {
      this.cart = [];
      this.cartToSend = [];
    },
    async orderNow() {
      try {
        const userStore = useUser();
        const locationStore = useLocation();
        const cartToSend = this.cartToSend;
        const res = await api.post(
          "/api/user/ordering-carts",
          {
            ordering_cart_products: cartToSend,
            location_id: locationStore.location.id,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userStore.user.token}`,
            },
          }
        );
        if (res.status === 200) {
          this.clear();
          this.cartToSend = [];
          this.cart = [];
        }
      } catch (e) {
        console.error("FOODYUM ERROR: ", e);
      }
    },
  },
});
