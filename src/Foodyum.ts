import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
// @ts-expect-error
import css from "./style.css";
import styleInject from "style-inject";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type FoodyumConfig = {
  publicKey?: string;
};

export class Foodyum {
  private $el = "#foodyum";
  private $element: HTMLElement | null;
  private $publicKey = "";
  constructor(el?: string, config?: FoodyumConfig) {
    this.$el = el || this.$el;
    this.$publicKey = config?.publicKey || this.$publicKey;
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
      baseURL: "http://foodyum-dev.fuelm.net",
      headers: {
        "X-Public-Key": this.$publicKey,
      },
    });
    app.provide("api", api);
    app.component("fa", FontAwesomeIcon);
    app.mount(this.$element);
    styleInject(css);
  }
}
