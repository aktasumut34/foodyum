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
              class="fy-w-full fy-max-w-md fy-transform fy-overflow-hidden fy-rounded-2xl fy-bg-white fy-p-6 fy-text-left fy-align-middle fy-shadow-xl fy-transition-all"
            >
              <DialogTitle
                as="h3"
                class="fy-text-lg fy-font-medium fy-leading-6 fy-text-gray-900"
              >
                {{ modal.product.name }}
              </DialogTitle>
              <div class="fy-mt-2">
                {{ modal.product.product_addon_choices }}
              </div>

              <div class="fy-mt-4">
                <button
                  type="button"
                  class="fy-inline-flex fy-justify-center fy-rounded-md fy-border fy-border-transparent fy-bg-green-100 fy-px-4 fy-py-2 fy-text-sm fy-font-medium fy-text-green-900 hover:fy-bg-green-200 focus:fy-outline-none focus-visible:fy-ring-2 focus-visible:fy-ring-green-500 focus-visible:fy-ring-offset-2"
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
} from "@headlessui/vue";
import { useCart } from "../store/cart";
import { useModal } from "../store/modal";
const modal = useModal();
const cart = useCart();
const addToCart = () => {
  cart.add(modal.product);
  modal.close();
};
</script>
