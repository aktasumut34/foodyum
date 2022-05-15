<template>
  <div v-if="!userStore.user.isLoggedIn">
    <input type="text" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUser } from "../store/user";
const userStore = useUser();
const email = ref("");
const password = ref("");
const login = () => {
  userStore.login({ email: email.value, password: password.value });
};
</script>
