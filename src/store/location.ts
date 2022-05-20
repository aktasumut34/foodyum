import { defineStore } from "pinia";
import { IDeliveryMethod, LocationInfo, TenantInfo } from "../types/app";
import axios from "axios";
import { useUser } from "./user";
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.all.js";
const api = axios.create({
  baseURL: "https://foodyum-dev.fuelm.net/",
});
interface ILocationState {
  location: LocationInfo | null;
  tenant: TenantInfo | null;
  config?: IDeliveryMethod[];
}

export const useLocation = defineStore("location", {
  state: (): ILocationState => {
    return {
      location: null,
      tenant: null,
      config: null,
    };
  },
  actions: {
    setLocation(payload: LocationInfo): void {
      this.location = payload;
    },
    setTenant(payload: TenantInfo): void {
      this.tenant = payload;
    },
    setConfig(payload: IDeliveryMethod): void {
      this.config = payload;
    },
    async getConfig() {
      try {
        const userStore = useUser();
        const { data } = await api.get("/api/user/location-service-configs", {
          params: {
            location_id: this.location.id,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userStore.user.token}`,
          },
        });
        this.setConfig(data.data);
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
