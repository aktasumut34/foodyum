<template>
  <Login @change="change(false)" v-if="login" />
  <Register @change="change(true)" v-else />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";
const login = ref(false);
const change = (val: boolean) => {
  login.value = val;
};
</script>
