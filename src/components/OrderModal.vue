<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="orderModalStore.close" class="fy-relative fy-z-10">
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
              class="fy-w-full fy-max-w-2xl fy-transform fy-overflow-hidden fy-rounded-2xl fy-bg-white fy-p-6 fy-text-left fy-align-middle fy-shadow-xl fy-transition-all fy-flex fy-flex-col fy-gap-4"
            >
              <DialogTitle
                as="h3"
                class="fy-text-xl fy-font-medium fy-leading-6 fy-text-slate-900"
              >
                Confirm Order
              </DialogTitle>
              <div class="fy-flex fy-flex-col fy-gap-2">
                <div v-if="userStore.user.contacts.length > 0">
                  <RadioGroup v-model="selectedContactInfo">
                    <RadioGroupLabel
                      class="fy-text-slate-700 fy-text-lg fy-flex fy-items-center fy-gap-2"
                      ><span>Contact Info</span>
                      <button
                        class="fy-text-xs fy-text-white fy-rounded-lg fy-py-1 fy-px-2 fy-bg-green-400"
                        @click="addContactInfo"
                      >
                        Add New
                      </button></RadioGroupLabel
                    >
                    <div class="fy-grid fy-grid-cols-3 fy-space-x-4 fy-mt-2">
                      <RadioGroupOption
                        as="template"
                        v-for="(contact, $index) in userStore.user.contacts"
                        :key="contact.id"
                        :value="contact.id"
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
                                  Contact {{ $index + 1 }}
                                </RadioGroupLabel>
                                <RadioGroupDescription
                                  as="span"
                                  :class="
                                    checked
                                      ? 'fy-text-sky-100'
                                      : 'fy-text-gray-500'
                                  "
                                  class="fy-flex fy-flex-col fy-text-sm"
                                >
                                  <span>
                                    {{
                                      contact.first_name +
                                      " " +
                                      contact.last_name
                                    }}
                                  </span>
                                  <span> {{ contact.email }} </span
                                  ><span>
                                    {{ contact.phone }}
                                  </span>
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
              </div>
              <div class="fy-flex fy-flex-col fy-gap-2">
                <div
                  v-if="locationStore.config && locationStore.config.length > 0"
                >
                  <RadioGroup v-model="selectedDeliveryMethod">
                    <RadioGroupLabel
                      class="fy-text-slate-700 fy-text-lg fy-flex fy-items-center fy-gap-2"
                      >Delivery Method</RadioGroupLabel
                    >
                    <div class="fy-grid fy-grid-cols-3 fy-space-x-4 fy-mt-2">
                      <RadioGroupOption
                        as="template"
                        v-for="(method, $index) in locationStore.config"
                        :key="method.id"
                        :value="method.id"
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
                                  {{ method.service.name }}
                                </RadioGroupLabel>
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
              </div>
              <div>
                <button
                  type="button"
                  class="fy-inline-flex fy-justify-center fy-rounded-md fy-border fy-border-transparent fy-bg-green-100 fy-px-4 fy-py-2 fy-text-sm fy-font-medium fy-text-green-900 hover:fy-bg-green-200 active:fy-bg-green-300 focus:fy-outline-none fy-transition-colors"
                  @click="completeOrder"
                >
                  <span v-if="orderModalStore.isLoading">
                    <fa icon="spinner" spin></fa
                  ></span>
                  <span v-else> Complete Order </span>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
      <AddContact v-if="orderModalStore.addContactModal" />
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
} from "@headlessui/vue";
import { ref, watch, computed } from "vue";
import { useOrderModal } from "../store/orderModal";
import { useUser } from "../store/user";
import { useLocation } from "../store/location";
import AddContact from "./AddContact.vue";
const orderModalStore = useOrderModal();
const userStore = useUser();
const locationStore = useLocation();
const selectedContactInfo = ref(0);
const selectedDeliveryMethod = ref(0);
const isOpen = computed(() => orderModalStore.isOpen);
watch(isOpen, async () => {
  await userStore.getContacts();
});
const completeOrder = () => {
  orderModalStore.orderNow();
};
const addContactInfo = () => {
  orderModalStore.openContactModal();
};
</script>
