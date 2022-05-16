<template>
  <div
    class="fy-overflow-hidden fy-rounded-lg fy-shadow-2xl fy-drop-shadow-2xl fy-ring-1 fy-ring-black fy-ring-opacity-5"
  >
    <div class="fy-relative fy-flex fy-flex-col fy-gap-4 fy-bg-white fy-p-6">
      <div class="fy-flex fy-flex-col fy-gap-1">
        <div class="fy-text-xl fy-text-slate-700 fy-font-semibold">Login</div>
        <div
          class="fy-text-sm fy-text-slate-500 fy-cursor-pointer"
          @click="emitChange"
        >
          Don't have an account? Register.
        </div>
        <div
          class="fy-text-sm fy-text-red-500 fy-cursor-pointer"
          v-if="userStore.authErrorLogin !== ''"
        >
          {{ userStore.authErrorLogin }}
        </div>
      </div>
      <form @submit.prevent="login" class="fy-flex fy-flex-col fy-gap-4">
        <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
          <label class="fy-text-slate-600 fy-text-md" for="email">E-Mail</label>
          <input
            class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
            :class="{ '!fy-border-red-500 !fy-border-2': errors.email }"
            placeholder="E-Mail"
            type="email"
            v-model="email"
            name="email"
            autocomplete="off"
          />
        </div>
        <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
          <label class="fy-text-slate-600 fy-text-md" for="email"
            >Password</label
          >
          <input
            class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
            :class="{ '!fy-border-red-500 !fy-border-2': errors.password }"
            placeholder="Password"
            type="password"
            v-model="password"
            name="password"
            autocomplete="off"
          />
        </div>
        <div>
          <button
            class="fy-w-full fy-bg-slate-600 fy-text-white fy-text-sm fy-px-4 fy-py-2 fy-rounded-md fy-shadow-2xl hover:fy-bg-slate-700 fy-transition-colors"
            type="submit"
          >
            <span v-if="loading"> <fa icon="spinner" spin></fa></span>
            <span v-else> Login </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useUser } from "../../store/user";
import is from "is_js";
const userStore = useUser();
const email = ref("");
const password = ref("");
const loading = ref(false);
const errors = reactive({
  email: false,
  password: false,
});
const emit = defineEmits(["change"]);
const emitChange = () => emit("change");
const login = async () => {
  Object.keys(errors).forEach((key: keyof typeof errors) => {
    errors[key] = false;
  });
  userStore.authErrorLogin = "";
  if (!is.email(email.value)) {
    userStore.authErrorLogin = "Invalid email, please provide an email!";
    errors.email = true;
    return;
  } else if (is.string(password.value) && password.value.length < 6) {
    userStore.authErrorLogin = "Password must be at least 6 characters!";
    errors.password = true;
    return;
  }
  loading.value = true;
  await userStore.login({ email: email.value, password: password.value });
  loading.value = false;
};
</script>
