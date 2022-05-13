<template>
  <TransitionRoot appear :show="modal.isOpen" as="template">
    <Dialog as="div" @close="modal.close" class="fy-relative fy-z-10">
      <TransitionChild
        as="template"
        enter="fy-duration-300 fy-ease-out"
        enter-from="fy-opacity-0"
        enter-to="fy-opacity-100"
        leave="fy-duration-200 fy-ease-in"
        leave-from="fy-opacity-100"
        leave-to="fy-opacity-0"
      >
        <div class="fy-fixed fy-inset-0 fy-bg-black fy-bg-opacity-25" />
      </TransitionChild>

      <div class="fy-fixed fy-inset-0 fy-overflow-y-auto">
        <div
          class="fy-flex fy-min-h-full fy-items-center fy-justify-center fy-p-4 fy-text-center"
        >
          <TransitionChild
            as="template"
            enter="fy-duration-300 fy-ease-out"
            enter-from="fy-opacity-0 fy-scale-95"
            enter-to="fy-opacity-100 fy-scale-100"
            leave="fy-duration-200 fy-ease-in"
            leave-from="fy-opacity-100 fy-scale-100"
            leave-to="fy-opacity-0 fy-scale-95"
          >
            <DialogPanel
              class="fy-w-full fy-max-w-2xl fy-transform fy-overflow-hidden fy-rounded-2xl fy-bg-white fy-p-6 fy-text-left fy-align-middle fy-shadow-xl fy-transition-all"
            >
              <DialogTitle
                as="h3"
                class="fy-text-xl fy-font-medium fy-leading-6 fy-text-slate-900"
              >
                {{ product.name }}
                <span
                  class="fy-block fy-fon-light fy-leading-4 fy-text-sm fy-text-slate-600"
                  >{{ product.description }}</span
                >
              </DialogTitle>
              <div class="fy-my-4 fy-flex fy-flex-col fy-gap-4">
                <!-- Product Type -->
                <div v-if="product.product_types.length">
                  <RadioGroup v-model="selected">
                    <RadioGroupLabel class="fy-text-slate-700 fy-text-lg"
                      >Product Type</RadioGroupLabel
                    >
                    <div class="fy-grid fy-grid-cols-2 fy-space-x-4 fy-mt-2">
                      <RadioGroupOption
                        as="template"
                        v-for="(productType, $index) in product.product_types"
                        :key="productType.id"
                        :value="$index"
                        v-slot="{ checked }"
                      >
                        <div
                          :class="[
                            checked
                              ? 'fy-bg-green-700 fy-bg-opacity-75 fy-text-white '
                              : 'fy-bg-slate-100 ',
                          ]"
                          class="fy-relative fy-flex fy-cursor-pointer fy-rounded-lg fy-px-5 fy-py-4 fy-shadow-md focus:fy-outline-none"
                        >
                          <div
                            class="fy-flex fy-w-full fy-items-center fy-justify-between"
                          >
                            <div class="fy-flex fy-items-center">
                              <div class="fy-text-sm">
                                <RadioGroupLabel
                                  as="p"
                                  :class="
                                    checked
                                      ? 'fy-text-white'
                                      : 'fy-text-gray-900'
                                  "
                                  class="fy-font-medium"
                                >
                                  {{ productType.name }}
                                </RadioGroupLabel>
                                <RadioGroupDescription
                                  as="span"
                                  :class="
                                    checked
                                      ? 'fy-text-sky-100'
                                      : 'fy-text-gray-500'
                                  "
                                  class="fy-inline"
                                >
                                  <span> ${{ productType.price }}</span>
                                </RadioGroupDescription>
                              </div>
                            </div>
                            <div
                              v-show="checked"
                              class="fy-shrink-0 fy-text-white"
                            >
                              <svg
                                class="fy-h-6 fy-w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="12"
                                  fill="#fff"
                                  fill-opacity="0.2"
                                />
                                <path
                                  d="M7 13l3 3 7-7"
                                  stroke="#fff"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                </div>
                <div class="fy-flex fy-flex-col">
                  <span class="fy-text-slate-700 fy-text-lg"
                    >Product Addons</span
                  >
                  <div class="fy-flex fy-gap-2 fy-flex-col">
                    <div
                      class="fy-flex fy-flex-col fy-gap-1"
                      v-for="s in selectable"
                    >
                      <span class="fy-text-semibold fy-text-sm">{{
                        s.name
                      }}</span>
                      <div class="fy-flex fy-gap-4 fy-flex-wrap">
                        <SwitchGroup v-for="choice in s.product_choices">
                          <div
                            class="fy-flex fy-gap-1 fy-items-center fy-justify-center"
                          >
                            <Switch
                              v-model="choice.is_selected"
                              :class="
                                choice.is_selected
                                  ? 'fy-bg-green-700 fy-bg-opacity-75'
                                  : 'fy-bg-slate-100'
                              "
                              class="fy-h-5 fy-w-5 fy-flex fy-items-center fy-justify-center fy-border fy-border-green-700 focus:fy-outline-none fy-border-opacity-75"
                            >
                              <svg
                                v-if="choice.is_selected"
                                xmlns="http://www.w3.org/2000/svg"
                                class="fy-h-4 fy-w-4 fy-text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </Switch>
                            <SwitchLabel class="fy-text-slate-700 fy-text-xs">
                              {{ choice.name }}
                            </SwitchLabel>
                          </div>
                        </SwitchGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  class="fy-inline-flex fy-justify-center fy-rounded-md fy-border fy-border-transparent fy-bg-green-100 fy-px-4 fy-py-2 fy-text-sm fy-font-medium fy-text-green-900 hover:fy-bg-green-200 active:fy-bg-green-300 focus:fy-outline-none fy-transition-colors"
                  @click="addToCart()"
                >
                  Add to cart
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
  Switch,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";
import { watch, ref, computed, Ref } from "vue";
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useCart } from "../store/cart";
import { useModal } from "../store/modal";
import { ProductAddon, ProductChoice, ProductAddonChoice } from "../types/app";
const modal = useModal();
const cart = useCart();
const selected = ref(null);
const selectable: Ref<ProductAddon[]> = ref([]);
const checked: Ref<{ addon: ProductAddon; choice: ProductChoice[] }[]> = ref(
  []
);
const product = computed(() => modal.product);
const category = computed(() => modal.category);
watch(product, () => {
  if (product.value) {
    if (product.value.product_types.length) {
      const selectedProductType = product.value.product_types.findIndex(
        (productType) => {
          return productType.is_selected;
        }
      );
      if (selectedProductType >= 0) {
        selected.value = selectedProductType;
      }
    }
  }
  refreshAddons();
});
watch(selected, () => {
  refreshAddons();
});
const refreshAddons = () => {
  let selectables: ProductAddonChoice[] = [
    ...category.value.product_addon_choices,
    ...product.value.product_addon_choices,
  ];
  if (product.value.product_types[selected.value]) {
    selectables = [
      ...selectables,
      ...product.value.product_types[selected.value].product_addon_choices,
    ];
  }
  selectable.value = [];
  selectables.forEach((s) => {
    if (!selectable.value.find((a) => a.id === s.product_addon.id)) {
      selectable.value.push(s.product_addon);
    }
  });
  checked.value = [];
  selectable.value.forEach((s) => {
    s.product_choices.forEach((c) => {
      const x = checked.value.find((a) => a.addon.id === s.id);
      if (x) x.choice.push(c);
      else checked.value.push({ addon: s, choice: [c] });
    });
  });
};
const addToCart = () => {
  const checkChecked = cart.add(product.value, selected.value, checked.value);
  if (!checkChecked.success)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: checkChecked.message,
    });
  else modal.close();
};
</script>
