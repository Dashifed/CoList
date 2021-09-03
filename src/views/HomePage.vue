<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <br/>
    <router-link class="router-item" to="/home">App</router-link>
    <router-link class="router-item" to="/">Home</router-link>
    <div>
      <button class="btn-primary" @click="login">Log in</button>
      <button class="btn-primary" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "homepage",
  methods: {
    // Log the user in
    login() {
      router.push("/login")
    },
    // Log the user out
    logout() {
      localStorage.removeItem("token")
    }
  }
};
</script>
