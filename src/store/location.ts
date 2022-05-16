import { defineStore } from "pinia";
import { LocationInfo, TenantInfo } from "../types/app";

interface ILocationState {
  location: LocationInfo | null;
  tenant: TenantInfo | null;
}

export const useLocation = defineStore("location", {
  state: (): ILocationState => {
    return {
      location: null,
      tenant: null,
    };
  },
  actions: {
    setLocation(payload: LocationInfo): void {
      this.location = payload;
    },
    setTenant(payload: TenantInfo): void {
      this.tenant = payload;
    },
  },
});
