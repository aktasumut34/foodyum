import { RemovableRef, useStorage } from "@vueuse/core";
import axios from "axios";
import { defineStore } from "pinia";
import { useLocation } from "./location";
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.all.js";
const api = axios.create({
  baseURL: "https://foodyum-dev.fuelm.net/",
});

import { IUser } from "../types/app";

export const useUser = defineStore("user", {
  state: (): {
    user: RemovableRef<IUser>;
    authErrorLogin: string;
    authErrorRegister: string;
    pageLogin: boolean;
    loginButton: { el: HTMLButtonElement; $el: HTMLButtonElement };
  } => {
    return {
      user: useStorage<IUser>("user", {}, localStorage, {
        serializer: {
          read: (v: any) => (v ? JSON.parse(v) : null),
          write: (v: any) => JSON.stringify(v),
        },
      }),
      authErrorLogin: "",
      authErrorRegister: "",
      pageLogin: true,
      loginButton: null,
    };
  },
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      try {
        const response = await api.post("/api/core/user/auth/login", {
          email,
          password,
        });
        if (response.status === 200) {
          const { data } = response;
          this.user = {
            token: data.token,
            user: null,
            isLoggedIn: true,
          };
          await this.me();
          return true;
        }
      } catch (e) {
        this.authErrorLogin = e.response.data.message;
      }
    },
    async register({
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
    }: {
      email: string;
      password: string;
      password_confirmation: string;
      first_name: string;
      last_name: string;
    }) {
      try {
        const locationStore = useLocation();
        const response = await api.post("/api/core/user/auth/register", {
          email,
          password,
          password_confirmation,
          tenant_id: locationStore.tenant.id,
          first_name,
          last_name,
        });
        if (response.status === 200) {
          const { data } = response;
          if (data.result === "success") {
            this.user = {
              token: data.token,
              user: null,
              isLoggedIn: true,
            };
          }
          await this.me();
          return true;
        }
      } catch (e) {
        this.authErrorRegister =
          e.response.data.errors[Object.keys(e.response.data.errors)[0]][0];
      }
    },
    async logout() {
      try {
        const response = await api.get("/api/core/user/logout", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        if (response.status === 200 && response.data.result === "success") {
          this.user = {};
        }
      } catch (e) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        });
      }
    },
    async me() {
      try {
        const locationStore = useLocation();
        const response = await api.get("/api/core/user/me", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        if (response.status === 200) {
          const { data } = response;
          this.user.user = data.user;
          await this.getContacts();
          await locationStore.getConfig();
          await this.getDeliveryAddresses();
        }
      } catch (e) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        });
      }
    },
    async getContacts() {
      try {
        const locationStore = useLocation();
        const response = await api.get("/api/user/user-contacts", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
          params: {
            location_id: locationStore.location.id,
          },
        });
        if (response.status === 200) {
          const { data } = response;
          this.user.contacts = data.data;
        }
      } catch (e) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        });
      }
    },
    async getDeliveryAddresses() {
      try {
        const locationStore = useLocation();
        const response = await api.get("/api/user/user-delivery-addresses", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${this.user.token}`,
          },
          params: {
            location_id: locationStore.location.id,
          },
        });
        if (response.status === 200) {
          const { data } = response;
          this.user.deliveryAddresses = data.data;
        }
      } catch (e) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again later",
          icon: "error",
        });
      }
    },
  },
});
