<template>
  <div
    class="fy-overflow-hidden fy-rounded-lg fy-shadow-2xl fy-drop-shadow-2xl fy-ring-1 fy-ring-black fy-ring-opacity-5"
  >
    <div class="fy-relative fy-flex fy-flex-col fy-gap-4 fy-bg-white fy-p-6">
      <div class="fy-flex fy-flex-col fy-gap-1">
        <div class="fy-text-xl fy-text-slate-700 fy-font-semibold">
          Register
        </div>
        <div
          class="fy-text-sm fy-text-slate-500 fy-cursor-pointer"
          @click="emitChange"
        >
          Already have an account? Sign in.
        </div>
      </div>
      <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
        <label class="fy-text-slate-600 fy-text-md" for="email">E-Mail</label>
        <input
          class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
          placeholder="E-Mail"
          type="email"
          v-model="email"
          name="email"
        />
      </div>
      <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
        <label class="fy-text-slate-600 fy-text-md" for="password"
          >Password</label
        >
        <input
          class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
          placeholder="Password"
          type="password"
          v-model="password"
          name="password"
        />
      </div>

      <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
        <label class="fy-text-slate-600 fy-text-md" for="password-confirmation"
          >Confirm Password</label
        >
        <input
          class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
          placeholder="Password"
          type="password"
          v-model="passwordConfirmation"
          name="password-confirmation"
        />
      </div>
      <div>
        <button
          class="fy-w-full fy-bg-slate-600 fy-text-white fy-text-sm fy-px-4 fy-py-2 fy-rounded-md fy-shadow-2xl hover:fy-bg-slate-700 fy-transition-colors"
          @click="register"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUser } from "../../store/user";
const userStore = useUser();
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const emit = defineEmits(["change"]);
const emitChange = () => emit("change");
const register = () => {
  userStore.register({
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
  });
};
</script>
