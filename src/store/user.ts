import { RemovableRef, useStorage } from "@vueuse/core";
import axios from "axios";
import { defineStore } from "pinia";
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
          this.user.set({
            token: data.token,
            user: data.user,
            isLoggedIn: true,
          });
          return true;
        }
      } catch (e) {
        this.authErrorLogin = "Invalid email or password";
      }
    },
    async register({
      email,
      password,
      password_confirmation,
    }: {
      email: string;
      password: string;
      password_confirmation: string;
    }) {
      const response = await api.post("/api/core/user/auth/register", {
        email,
        password,
        password_confirmation,
      });
      console.log(response);
    },
  },
});
