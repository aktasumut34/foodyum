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
        <div
          class="fy-text-sm fy-text-red-500 fy-cursor-pointer"
          v-if="userStore.authErrorRegister !== ''"
        >
          {{ userStore.authErrorRegister }}
        </div>
      </div>
      <form @submit.prevent="register" class="fy-flex fy-flex-col fy-gap-4">
        <div
          class="fy-grid fy-grid-cols-1 fy-gap-4 fy-w-full lg:fy-grid-cols-2"
        >
          <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
            <label class="fy-text-slate-600 fy-text-md" for="firstname"
              >First Name</label
            >
            <input
              class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
              :class="{ '!fy-border-red-500 !fy-border-2': errors.firstname }"
              placeholder="First Name"
              type="text"
              v-model="firstname"
              name="firstname"
              autocomplete="off"
            />
          </div>
          <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
            <label class="fy-text-slate-600 fy-text-md" for="lastname"
              >Last Name</label
            >
            <input
              class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
              :class="{ '!fy-border-red-500 !fy-border-2': errors.lastname }"
              placeholder="Last Name"
              type="text"
              v-model="lastname"
              name="lastname"
              autocomplete="off"
            />
          </div>
        </div>
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
          <label class="fy-text-slate-600 fy-text-md" for="password"
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

        <div class="fy-flex fy-flex-col fy-gap-1 fy-w-full">
          <label
            class="fy-text-slate-600 fy-text-md"
            for="password-confirmation"
            >Confirm Password</label
          >
          <input
            class="fy-w-full fy-text-sm fy-text-slate-600 fy-px-4 fy-py-2 fy-border fy-border-slate-700 focus:fy-border-transparent focus:fy-outline-none focus:fy-ring-sky-600 fy-rounded-md fy-ring-2 fy-ring-transparent"
            :class="{
              '!fy-border-red-500 !fy-border-2': errors.password_confirmation,
            }"
            placeholder="Password"
            type="password"
            v-model="passwordConfirmation"
            name="password-confirmation"
            autocomplete="off"
          />
        </div>
        <div>
          <button
            class="fy-w-full fy-bg-slate-600 fy-text-white fy-text-sm fy-px-4 fy-py-2 fy-rounded-md fy-shadow-2xl hover:fy-bg-slate-700 fy-transition-colors"
            type="submit"
          >
            <span v-if="loading"> <fa icon="spinner" spin></fa></span>
            <span v-else> Register </span>
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
const firstname = ref("");
const lastname = ref("");
const passwordConfirmation = ref("");
const loading = ref(false);
const errors = reactive({
  email: false,
  password: false,
  password_confirmation: false,
  firstname: false,
  lastname: false,
});
const emit = defineEmits(["change"]);
const emitChange = () => emit("change");
const register = async () => {
  Object.keys(errors).forEach((key: keyof typeof errors) => {
    errors[key] = false;
  });
  userStore.authErrorRegister = "";
  if (!is.string(firstname.value) || is.empty(firstname.value)) {
    userStore.authErrorRegister = "Please provide your first name!";
    errors.firstname = true;
    return;
  } else if (!is.string(lastname.value) || is.empty(lastname.value)) {
    userStore.authErrorRegister = "Please provide your last name!";
    errors.lastname = true;
    return;
  } else if (!is.email(email.value)) {
    userStore.authErrorRegister = "Invalid email, please provide an email!";
    errors.email = true;
    return;
  } else if (!is.string(password.value) || password.value.length < 6) {
    userStore.authErrorRegister = "Password must be at least 6 characters!";
    errors.password = true;
    return;
  } else if (password.value !== passwordConfirmation.value) {
    userStore.authErrorRegister = "Passwords do not match!";
    errors.password_confirmation = true;
    return;
  }
  loading.value = true;
  await userStore.register({
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
    first_name: firstname.value,
    last_name: lastname.value,
  });
  loading.value = false;
};
</script>
