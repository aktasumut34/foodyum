import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
// @ts-expect-error
import css from "./style.css";
import styleInject from "style-inject";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";

type FoodyumConfig = {
  apiKey?: string;
};

export class Foodyum {
  private $el = "#foodyum";
  private $element: HTMLElement | null;
  private $apiKey = "";
  constructor(el?: string, config?: FoodyumConfig) {
    this.$el = el || this.$el;
    this.$apiKey = config?.apiKey || this.$apiKey;
    this.$element = document.querySelector(this.$el);
    if (this.$element) {
      this.init();
    } else {
      throw new Error(
        `FOODYUM: Could not find element with selector ${this.$el}`
      );
    }
  }
  private init(): void {
    if (!this.$element) return;
    const app = createApp(App);
    library.add(faAdd);
    const api = axios.create({
      baseURL: "https://foodyum-dev.fuelm.net/api/external-services",
      params: {
        api_key: this.$apiKey,
      },
    });
    app.provide("api", api);
    app.component("fa", FontAwesomeIcon);
    app.use(createPinia());
    app.mount(this.$element);
    styleInject(css);
  }
}
