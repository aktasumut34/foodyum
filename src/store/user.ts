import { RemovableRef, useStorage } from "@vueuse/core";
import axios from "axios";
import { defineStore } from "pinia";
import { useLocation } from "./location";
type UserData = Record<string, any> | null;
const api = axios.create({
  baseURL: "https://foodyum-dev.fuelm.net/",
});
interface IUser {
  token?: string;
  user?: UserData;
  isLoggedIn?: boolean;
}

export const useUser = defineStore("user", {
  state: (): {
    user: RemovableRef<IUser>;
    authErrorLogin: string;
    authErrorRegister: string;
    pageLogin: boolean;
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
          this.me();
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
        const location = useLocation();
        const response = await api.post("/api/core/user/auth/register", {
          email,
          password,
          password_confirmation,
          tenant_id: location.tenant.id,
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
          this.me();
          return true;
        }
      } catch (e) {
        this.authErrorRegister =
          e.response.data.errors[Object.keys(e.response.data.errors)[0]][0];
      }
    },
    async logout() {
      const response = await api.get("/api/core/user/logout", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      if (response.status === 200 && response.data.result === "success") {
        this.user = {};
      }
    },
    async me() {
      const response = await api.get("/api/core/user/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      if (response.status === 200) {
        const { data } = response;
        this.user.user = data.user;
      }
    },
  },
});
