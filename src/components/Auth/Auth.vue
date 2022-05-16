<template>
  <Login @change="change(false)" v-if="login" />
  <Register @change="change(true)" v-else />
</template>

<script lang="ts" setup>
import Login from "./Login.vue";
import Register from "./Register.vue";
import { useUser } from "../../store/user";
import { computed } from "@vue/reactivity";
const userStore = useUser();
const login = computed(() => userStore.pageLogin);
const change = (val: boolean) => {
  userStore.pageLogin = val;
};
</script>
