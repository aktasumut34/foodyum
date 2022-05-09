<template>
  <Popover v-slot="{ open }" class="fy-relative">
    <PopoverButton
      class="fy-relative fy-p-3 fy-rounded-full fy-transition-colors fy-cursor-pointer fy-group"
      :class="open ? 'fy-bg-slate-300' : ''"
    >
      <fa
        icon="cart-shopping"
        class="fy-text-3xl fy-transition-colors fy-text-slate-800"
        :class="open ? '' : 'fy-text-slate-900'"
      ></fa>
      <div
        class="fy-absolute fy-flex fy-items-center fy-justify-center fy-bg-red-500 fy-rounded-full fy-w-5 fy-h-5 fy-z-10 fy-top-0 fy-right-0"
      >
        <span class="fy-text-white fy-text-sm">{{
          cartStore.cart.length
        }}</span>
      </div>
    </PopoverButton>
    <transition
      enter-active-class="fy-transition fy-duration-200 fy-ease-out"
      enter-from-class="fy-translate-y-1 fy-opacity-0"
      enter-to-class="fy-translate-y-0 fy-opacity-100"
      leave-active-class="fy-transition fy-duration-150 ease-in"
      leave-from-class="fy-translate-y-0 fy-opacity-100"
      leave-to-class="fy-translate-y-1 fy-opacity-0"
    >
      <PopoverPanel
        class="fy-absolute -fy-right-5 fy-py-2 fy-z-10 fy-w-screen fy-max-w-lg fy-px-4 sm:fy-px-0 lg:fy-max-w-xl"
      >
        <div
          class="fy-overflow-hidden fy-rounded-lg fy-shadow-2xl fy-drop-shadow-2xl fy-ring-1 fy-ring-black fy-ring-opacity-5"
        >
          <div
            v-if="cartStore.cart.length > 0"
            class="fy-relative fy-grid fy-gap-8 fy-bg-white fy-p-7"
          >
            <a
              v-for="item in cartStore.cart"
              :key="item.name"
              :href="item.href"
              class="-fy-m-3 fy-flex fy-items-center fy-rounded-lg fy-p-2 fy-transition fy-gap-4 fy-duration-150 fy-ease-in-out fy-hover:bg-gray-50 fy-focus:outline-none fy-focus-visible:ring fy-focus-visible:ring-orange-500 fy-focus-visible:ring-opacity-50"
            >
              <div
                class="fy-flex fy-h-6 fy-w-6 fy-shrink-0 fy-items-center fy-justify-center fy-text-white fy-bg-slate-800"
              >
                <div>{{ item.quantity }}</div>
              </div>
              <div>
                <p class="fy-text-sm fy-font-medium fy-text-slate-900">
                  {{ item.name }}
                </p>
                <p class="fy-text-sm fy-text-slate-500">
                  {{ item.description }}
                </p>
              </div>
              <div class="fy-ml-auto fy-text-right">
                <p class="fy-text-md fy-font-medium fy-text-slate-900">
                  {{ item.quantity }} x ${{ item.price }}
                </p>
                <p class="fy-text-sm fy-text-slate-500">
                  ${{ (item.quantity * item.price).toFixed(2) }}
                </p>
              </div>
              <div>
                <button
                  @click="cartStore.remove(item)"
                  class="fy-p-2 fy-border fy-border-red-500 hover:fy-bg-red-500 fy-transition-colors fy-group"
                >
                  <fa
                    icon="trash"
                    class="fy-text-lg fy-text-red-500 fy-transition-colors group-hover:fy-text-white"
                    fixed-width
                  ></fa>
                </button>
              </div>
            </a>
          </div>
          <div class="fy-p-7 fy-bg-white" v-else>
            <p class="fy-text-center fy-text-slate-700 fy-text-2xl">
              Your cart is empty!
            </p>
          </div>
          <div
            class="fy-bg-gray-50 fy-p-4 fy-flex fy-justify-between fy-items-center"
            v-if="cartStore.cart.length > 0"
          >
            <div class="fy-flow-root fy-px-2 fy-py-2">
              <span class="fy-flex fy-items-center">
                <span class="fy-text-sm fy-font-medium fy-text-gray-900">
                  Total
                </span>
              </span>
              <span class="fy-block fy-text-sm fy-text-gray-500">
                $ {{ cartStore.total }}
              </span>
            </div>
            <div>
              <button
                @click="cartStore.clear"
                class="fy-bg-red-500 fy-text-white fy-rounded-md fy-px-4 fy-py-2 fy-duration-150 hover:fy-bg-red-700 active:fy-bg-red-800 fy-transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition></Popover
  >
</template>
<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { useCart } from "../store/cart";
const cartStore = useCart();
</script>
