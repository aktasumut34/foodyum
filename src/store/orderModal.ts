import { defineStore } from "pinia";
import { useLocation } from "./location";
import { useUser } from "./user";
import axios from "axios";
import { useCart } from "./cart";

interface IOrderModalState {
  isOpen: boolean;
  isLoading: boolean;
  isLoadingAddContact: boolean;
  addContactModal: boolean;
}
const api = axios.create({
  baseURL: "https://foodyum-dev.fuelm.net/",
});
export const useOrderModal = defineStore("orderModal", {
  state: (): IOrderModalState => {
    return {
      isOpen: false,
      isLoading: false,
      isLoadingAddContact: false,
      addContactModal: false,
    };
  },
  actions: {
    open(): void {
      this.isOpen = true;
    },
    close(): void {
      this.isOpen = false;
    },
    openContactModal(): void {
      this.addContactModal = true;
    },
    closeContactModal(): void {
      this.addContactModal = false;
    },
    async addContact({
      firstname,
      lastname,
      phone,
      email,
    }: {
      firstname: string;
      lastname: string;
      phone: string;
      email: string;
    }) {
      try {
        this.isLoadingAddContact = true;
        const userStore = useUser();
        const locationStore = useLocation();
        const res = await api.post(
          "/api/user/user-contacts",
          {
            first_name: firstname,
            last_name: lastname,
            phone,
            email,
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
          await userStore.getContacts();
          this.isLoadingAddContact = false;
          this.closeContactModal();
        }
      } catch (e) {
        console.error("FOODYUM ERROR: ", e);
      }
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
