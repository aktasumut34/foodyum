<template>
  <div>
    <Popover v-slot="{ open }" class="fy-relative">
      <PopoverButton
        class="fy-relative fy-p-3 fy-rounded-sm fy-transition-colors fy-cursor-pointer fy-group"
        :class="open ? 'fy-bg-slate-100' : ''"
      >
        <span v-if="userStore.user.isLoggedIn" class="text-2xl">{{
          userStore.user.user.first_name
        }}</span>

        <span class="text-2xl" v-else>Login / Register</span>
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
import { ref } from "vue";
import { useUser } from "../store/user";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import Auth from "./Auth/Auth.vue";
import Details from "./Auth/Details.vue";
const userStore = useUser();
const email = ref("");
const password = ref("");
const login = () => {
  userStore.login({ email: email.value, password: password.value });
};
</script>
