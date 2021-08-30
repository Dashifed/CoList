<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <br/>
    <router-link to="/home">App</router-link>
    <br>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <div>
      <!-- show login when not authenticated -->
      <button @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button @click="logout">Log out</button>
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
