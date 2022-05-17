import { defineStore } from "pinia";
import { useLocation } from "./location";
import { useUser } from "./user";
import axios from "axios";
import { useCart } from "./cart";

interface IOrderModalState {
  isOpen: boolean;
  isLoading: boolean;
}
const api = axios.create({
  baseURL: "https://foodyum-dev.fuelm.net/",
});
export const useOrderModal = defineStore("order", {
  state: (): IOrderModalState => {
    return {
      isOpen: false,
      isLoading: false,
    };
  },
  actions: {
    open(): void {
      this.isOpen = true;
    },
    close(): void {
      this.isOpen = false;
    },
    async orderNow() {
      try {
        this.isLoading = true;
        const userStore = useUser();
        const locationStore = useLocation();
        const cartStore = useCart();
        const cartToSend = cartStore.cartToSend;
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
          cartStore.clear();
          cartStore.cartToSend = [];
          cartStore.cart = [];
          this.isLoading = false;
          this.close();
        }
      } catch (e) {
        console.error("FOODYUM ERROR: ", e);
      }
    },
  },
});
