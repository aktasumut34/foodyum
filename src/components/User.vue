<template>
  <div>
    <Popover v-slot="{ open }" class="fy-relative">
      <PopoverButton
        class="fy-relative fy-p-3 fy-rounded-md fy-transition-colors fy-cursor-pointer fy-group"
        :class="open ? 'fy-bg-slate-100' : ''"
      >
        <span class="text-2xl">{{ name }}</span>
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
          class="fy-absolute -fy-right-5 fy-py-2 fy-z-10 fy-w-screen fy-px-4 sm:fy-px-0 lg:fy-max-w-md"
        >
          <Details v-if="userStore.user.isLoggedIn" />
          <Auth v-else />
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from "../store/user";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import Auth from "./Auth/Auth.vue";
import Details from "./Auth/Details.vue";
import { computed } from "vue";
const userStore = useUser();
const name = computed(() => {
  return userStore.user.isLoggedIn && userStore.user.user
    ? userStore.user.user.first_name + " " + userStore.user.user.last_name
    : "Login / Register";
});
</script>
