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
              class="fy-w-full fy-max-w-2xl fy-transform fy-overflow-hidden fy-rounded-2xl fy-bg-white fy-p-6 fy-text-left fy-align-middle fy-shadow-xl fy-transition-all fy-flex fy-flex-col fy-gap-6"
            >
              <DialogTitle
                as="h3"
                class="fy-text-xl fy-font-medium fy-leading-6 fy-text-slate-900"
              >
                Confirm Order
              </DialogTitle>
              <div class="fy-flex fy-flex-col fy-gap-2">
                <div v-if="userStore.user">
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
                    <div
                      class="fy-grid fy-grid-cols-3 fy-gap-4 fy-mt-2"
                      v-if="userStore.user.contacts.length > 0"
                    >
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
                              <CheckCircle class="fy-h-6 fy-w-6" />
                            </div>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>
                    <div class="fy-mt-2 fy-text-slate-600" v-else>
                      You don't have any contact info. Please add one.
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
                              <CheckCircle class="fy-h-6 fy-w-6" />
                            </div>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div
                v-if="
                  locationStore.config &&
                  selectedDeliveryMethodDetails &&
                  selectedDeliveryMethodDetails.service.alias === 'delivery'
                "
                class="fy-flex fy-flex-col fy-gap-2"
              >
                <div
                  v-if="locationStore.config && locationStore.config.length > 0"
                >
                  <RadioGroup v-model="selectedDeliveryAddress">
                    <RadioGroupLabel
                      class="fy-text-slate-700 fy-text-lg fy-flex fy-items-center fy-gap-2"
                      ><span>Delivery Address</span>
                      <button
                        class="fy-text-xs fy-text-white fy-rounded-lg fy-py-1 fy-px-2 fy-bg-green-400"
                        @click="addDeliveryAddress"
                      >
                        Add New
                      </button></RadioGroupLabel
                    >
                    <div
                      class="fy-grid fy-grid-cols-3 fy-gap-4 fy-mt-2"
                      v-if="userStore.user.deliveryAddresses.length > 0"
                    >
                      <RadioGroupOption
                        as="template"
                        v-for="(address, $index) in userStore.user
                          .deliveryAddresses"
                        :key="address.id"
                        :value="address.id"
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
                                  {{ address.address_title }}
                                </RadioGroupLabel>
                              </div>
                            </div>
                            <div
                              v-show="checked"
                              class="fy-shrink-0 fy-text-white"
                            >
                              <CheckCircle class="fy-h-6 fy-w-6" />
                            </div>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>

                    <div class="fy-mt-2 fy-text-slate-600" v-else>
                      You don't have any delivery address. Please add one.
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div
                v-if="locationStore.config && timeChoices.length > 0"
                class="fy-flex fy-flex-col fy-gap-2"
              >
                <div
                  v-if="locationStore.config && locationStore.config.length > 0"
                >
                  <RadioGroup v-model="selectedTimeChoice">
                    <RadioGroupLabel
                      class="fy-text-slate-700 fy-text-lg fy-flex fy-items-center fy-gap-2"
                      ><span>Time Choice</span>
                    </RadioGroupLabel>
                    <div
                      class="fy-grid fy-grid-cols-3 fy-gap-4 fy-mt-2"
                      v-if="userStore.user.deliveryAddresses.length > 0"
                    >
                      <RadioGroupOption
                        as="template"
                        v-for="time in timeChoices"
                        :key="time"
                        :value="time"
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
                                  {{ time }}
                                </RadioGroupLabel>
                              </div>
                            </div>
                            <div
                              v-show="checked"
                              class="fy-shrink-0 fy-text-white"
                            >
                              <CheckCircle class="fy-h-6 fy-w-6" />
                            </div>
                          </div>
                        </div>
                      </RadioGroupOption>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div
                v-if="
                  locationStore.config &&
                  selectedDeliveryMethod &&
                  selectedTimeChoice &&
                  selectedTimeChoice === 'Later'
                "
                class="fy-flex fy-flex-col fy-gap-2"
              >
                <div
                  class="fy-text-slate-700 fy-text-sm fy-flex fy-items-center fy-gap-2"
                >
                  <span>Please select delivery time.</span>
                </div>
                <Datepicker
                  ref="datetimepicker"
                  v-model="selectedDateTime"
                  :format="formatDate"
                  @cleared="datetimepickerResetDate"
                  @update:modelValue="datetimepickerUpdateDate"
                  :disabledDates="disabledDates"
                  :disabledWeekDays="disabledWeekDays"
                >
                </Datepicker>
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
      <AddDeliveryAddress v-if="orderModalStore.addDeliveryAddressModal" />
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
import Datepicker from "@vuepic/vue-datepicker";
import CheckCircle from "./Icons/check-circle.svg";
import dayjs from "dayjs";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed } from "vue";
import { useOrderModal } from "../store/orderModal";
import { useUser } from "../store/user";
import { useLocation } from "../store/location";
import AddContact from "./AddContact.vue";
import AddDeliveryAddress from "./AddDeliveryAddress.vue";
const orderModalStore = useOrderModal();
const userStore = useUser();
const locationStore = useLocation();
const selectedContactInfo = ref(userStore.user.contacts?.[0].id || 0);
const selectedDeliveryMethod = ref(locationStore.config?.[0].id || 0);
const selectedDeliveryAddress = ref(0);
const selectedTimeChoice = ref(null);
const selectedDateTime = ref(dayjs().minute(0).add(2, "hour").toString());
const datetimepicker = ref(null);
const selectedDeliveryMethodDetails = computed(() => {
  const deliveryMethod = locationStore.config.find(
    (method) => method.id === selectedDeliveryMethod.value
  );
  return deliveryMethod;
});
const timeChoices = computed(() => {
  if (locationStore.config && selectedDeliveryMethodDetails.value) {
    if (selectedDeliveryMethodDetails.value.service.is_schedule)
      return ["Now", "Later"];
    else return ["Now"];
  }
  return [];
});
const isOpen = computed(() => orderModalStore.isOpen);
const completeOrder = () => {
  orderModalStore.orderNow();
};
const addContactInfo = () => {
  orderModalStore.openContactModal();
};
const addDeliveryAddress = () => {
  orderModalStore.openDeliveryAddressModal();
};
const formatDate = (date: Date) => {
  if (dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
    return "Today, " + dayjs(date).format("HH:mm");
  } else if (
    dayjs(date).format("YYYY-MM-DD") ===
    dayjs().add(1, "day").format("YYYY-MM-DD")
  ) {
    return "Tomorrow, " + dayjs(date).format("HH:mm");
  } else return dayjs(date).format("MMM DD, YYYY, HH:mm");
};
const datetimepickerResetDate = () => {
  selectedDateTime.value = dayjs().minute(0).add(2, "hour").toString();
};
const datetimepickerUpdateDate = (date: Date) => {
  if (dayjs(date) < dayjs().minute(0).add(2, "hour")) {
    datetimepickerResetDate();
  } else if (
    selectedDeliveryMethodDetails.value &&
    selectedDeliveryMethodDetails.value.service.opening_hours.length > 0
  ) {
    const openingHours =
      selectedDeliveryMethodDetails.value.service.opening_hours;
    const day = dayjs(date).format("dddd").toLowerCase();
    const openingHour = openingHours.find((hour) =>
      hour.days.split(",").includes(day)
    );
    if (openingHour) {
      const startHour = parseInt(openingHour.start_time.split(":")?.[0]);
      const endHour = parseInt(openingHour.end_time.split(":")?.[0]);
      const startMinute = parseInt(openingHour.start_time.split(":")?.[1]);
      const endMinute = parseInt(openingHour.end_time.split(":")?.[1]);
      const selected = dayjs(date);
      if (
        !(
          (selected.hour() > startHour ||
            (selected.hour() === startHour &&
              selected.minute() >= startMinute)) &&
          (selected.hour() < endHour ||
            (selected.hour() === endHour && selected.minute() < endMinute))
        )
      ) {
        if (selected.hour() < startHour) {
          selectedDateTime.value = dayjs(date)
            .minute(startMinute)
            .hour(startHour)
            .toString();
        } else {
          selectedDateTime.value = dayjs(date)
            .minute(endMinute)
            .hour(endHour)
            .toString();
        }
      }
    }
  }
};
const disabledDates = (date: Date) => {
  if (dayjs(date).add(1, "day") < dayjs()) {
    return true;
  }
  return false;
};
const dayNameToWeekDay = (dayName: string) => {
  switch (dayName) {
    case "monday":
      return 1;
    case "tuesday":
      return 2;
    case "wednesday":
      return 3;
    case "thursday":
      return 4;
    case "friday":
      return 5;
    case "saturday":
      return 6;
    case "sunday":
      return 0;
  }
};
const disabledWeekDays = computed(() => {
  if (
    selectedDeliveryMethodDetails.value &&
    selectedDeliveryMethodDetails.value.service.is_schedule &&
    selectedDeliveryMethodDetails.value.service.opening_hours.length > 0
  ) {
    const disabledDates = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    selectedDeliveryMethodDetails.value.service.opening_hours.forEach(
      (item) => {
        const days = item.days.split(",");
        days.forEach((day) => {
          if (disabledDates.indexOf(day) > -1) {
            disabledDates.splice(disabledDates.indexOf(day), 1);
            return;
          }
        });
      }
    );
    return disabledDates.map((day) => dayNameToWeekDay(day));
  }
  return [];
});
</script>
