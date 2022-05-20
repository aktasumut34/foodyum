import { defineStore } from "pinia";
import { useLocation } from "./location";
import { useUser } from "./user";
import axios from "axios";
import { useCart } from "./cart";
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.all.js";

interface IOrderModalState {
  isOpen: boolean;
  isLoading: boolean;
  isLoadingAddContact: boolean;
  addContactModal: boolean;
  isLoadingAddDeliveryAddress: boolean;
  addDeliveryAddressModal: boolean;
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
      isLoadingAddDeliveryAddress: false,
      addDeliveryAddressModal: false,
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
    openDeliveryAddressModal(): void {
      this.addDeliveryAddressModal = true;
    },
    closeDeliveryAddressModal(): void {
      this.addDeliveryAddressModal = false;
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
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        }).then(() => {
          this.isLoadingAddContact = false;
        });
      }
    },
    async addDeliveryAddress({
      address_title,
      city_area,
      street,
      zipcode,
    }: {
      address_title: string;
      city_area: string;
      street: string;
      zipcode: string;
    }) {
      try {
        this.isLoadingAddDeliveryAddress = true;
        const userStore = useUser();
        const locationStore = useLocation();
        const res = await api.post(
          "/api/user/user-delivery-addresses",
          {
            address_title,
            city_area,
            street,
            zipcode,
            location_id: locationStore.location.id,
            is_selected: 0,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userStore.user.token}`,
            },
          }
        );
        if (res.status === 200) {
          await userStore.getDeliveryAddresses();
          this.isLoadingAddDeliveryAddress = false;
          this.closeDeliveryAddressModal();
        }
      } catch (e) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        }).then(() => {
          this.isLoadingAddDeliveryAddress = false;
        });
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
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        }).then(() => {
          this.isLoading = false;
        });
      }
    },
  },
});
