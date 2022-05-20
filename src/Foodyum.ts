import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import css from "./style.css";
// @ts-expect-error
import styleInject from "style-inject";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAdd,
  faCartShopping,
  faTrash,
  faSpinner,
  faUser,
  faHistory,
  faLifeRing,
} from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";

type FoodyumConfig = {
  apiKey: string;
};

export class Foodyum {
  private $el = "#foodyum";
  private $element: HTMLElement | null;
  private $apiKey = "";
  public $app = createApp(App);
  constructor(el: string, config: FoodyumConfig) {
    this.$el = el;
    this.$apiKey = config.apiKey;
    this.$element = document.querySelector(this.$el);
    if (this.$element) {
      if (this.$apiKey.length === 64) {
        this.init();
      } else {
        throw new Error(
          `FOODYUM: API key is invalid. Please check your config.`
        );
      }
    } else {
      throw new Error(
        `FOODYUM: Could not find element with selector ${this.$el}`
      );
    }
  }
  private init(): void {
    if (!this.$element) return;
    library.add(
      faAdd,
      faCartShopping,
      faTrash,
      faSpinner,
      faUser,
      faHistory,
      faLifeRing
    );
    const api = axios.create({
      baseURL: "https://foodyum-dev.fuelm.net/api/external-services",
      params: {
        api_key: this.$apiKey,
      },
    });
    this.$app.provide("api", api);
    this.$app.provide("apiKey", this.$apiKey);
    this.$app.component("fa", FontAwesomeIcon);
    this.$app.use(createPinia());
    this.$app.mount(this.$element);
    styleInject(css);
  }
  public removeApp(): void {
    if (!this.$element) return;
    this.$app.unmount();
  }
}
