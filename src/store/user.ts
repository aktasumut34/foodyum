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
  state: (): { user: RemovableRef<IUser> } => {
    return {
      user: useStorage<IUser>("user", {}, localStorage, {
        serializer: {
          read: (v: any) => (v ? JSON.parse(v) : null),
          write: (v: any) => JSON.stringify(v),
        },
      }),
    };
  },
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const response = await api.post("/api/core/user/auth/login", {
        email,
        password,
      });
      console.log(response);
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
