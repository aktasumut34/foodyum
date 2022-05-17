<template>
  <TransitionRoot
    appear
    :show="orderModalStore.addDeliveryAddressModal"
    as="template"
  >
    <Dialog as="div" class="fy-relative fy-z-10">
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
              class="fy-w-full fy-max-w-md fy-transform fy-overflow-hidden fy-rounded-2xl fy-bg-white fy-p-6 fy-text-left fy-align-middle fy-shadow-xl fy-transition-all fy-flex fy-flex-col fy-gap-4"
            >
              <DialogTitle
                as="h3"
                class="fy-text-xl fy-font-medium fy-leading-6 fy-text-slate-900"
              >
                Add Contact Information
              </DialogTitle>
              <form
                @submit.prevent="addDeliveryAddress"
                class="fy-flex fy-flex-col fy-gap-2"
              >
                <div
                  class="fy-grid fy-grid-cols-1 fy-gap-4 fy-w-full lg:fy-grid-cols-2"
                >
                  <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
                    <label
                      class="fy-text-slate-600 fy-text-md"
                      for="address_title"
                      >Address Title</label
                    >
                    <input
                      class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
                      :class="{
                        '!fy-border-red-500 !fy-border-2': errors.address_title,
                      }"
                      placeholder="Address Title"
                      type="text"
                      v-model="address_title"
                      name="address_title"
                      autocomplete="off"
                    />
                  </div>
                  <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
                    <label class="fy-text-slate-600 fy-text-md" for="city_area"
                      >City Area</label
                    >
                    <input
                      class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
                      :class="{
                        '!fy-border-red-500 !fy-border-2': errors.city_area,
                      }"
                      placeholder="City Area"
                      type="text"
                      v-model="city_area"
                      name="city_area"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
                  <label class="fy-text-slate-600 fy-text-md" for="street"
                    >Street</label
                  >
                  <input
                    class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
                    :class="{
                      '!fy-border-red-500 !fy-border-2': errors.street,
                    }"
                    placeholder="Street"
                    type="text"
                    v-model="street"
                    name="street"
                    autocomplete="off"
                  />
                </div>
                <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
                  <label class="fy-text-slate-600 fy-text-md" for="zipcode"
                    >Zip Code</label
                  >
                  <input
                    class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
                    :class="{
                      '!fy-border-red-500 !fy-border-2': errors.zipcode,
                    }"
                    placeholder="Zip Code"
                    type="text"
                    v-model="zipcode"
                    name="zipcode"
                    autocomplete="off"
                  />
                </div>

                <div class="fy-flex fy-mt-2 fy-gap-2">
                  <button
                    type="button"
                    class="fy-inline-flex fy-justify-center fy-rounded-md fy-border fy-border-transparent fy-bg-green-100 fy-px-4 fy-py-2 fy-text-sm fy-font-medium fy-text-green-900 hover:fy-bg-green-200 active:fy-bg-green-300 focus:fy-outline-none fy-transition-colors"
                    @click="addDeliveryAddress()"
                  >
                    <span v-if="orderModalStore.isLoadingAddDeliveryAddress">
                      <fa icon="spinner" spin></fa
                    ></span>
                    <span v-else> Add Delivery Address </span>
                  </button>
                  <button
                    type="button"
                    class="fy-inline-flex fy-justify-center fy-rounded-md fy-border fy-border-transparent fy-bg-gray-200 fy-px-4 fy-py-2 fy-text-sm fy-font-medium fy-text-gray-900 hover:fy-bg-gray-300 active:fy-bg-gray-400 focus:fy-outline-none fy-transition-colors"
                    @click="closeDeliveryAddress()"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
import { useOrderModal } from "../store/orderModal";
import { ref, reactive } from "vue";
const orderModalStore = useOrderModal();
const address_title = ref("");
const city_area = ref("");
const zipcode = ref("");
const street = ref("");
const errors = reactive({
  address_title: false,
  city_area: false,
  zipcode: false,
  street: false,
});
const addDeliveryAddress = () => {
  orderModalStore.addDeliveryAddress({
    address_title: address_title.value,
    city_area: city_area.value,
    zipcode: zipcode.value,
    street: street.value,
  });
};
const closeDeliveryAddress = () => {
  orderModalStore.closeDeliveryAddressModal();
};
</script>
