<template>
  <div class="home">
    <nav class="nav">
      <div class="logo-wrapper">
        <div class="list-logo">
          <img
            alt="List logo"
            src="../assets/favicon.svg"
            style="width: 42px; height: 42px"
          />
        </div>
        <div style="display: flex; align-items: center">
          <h2 style="user-select: none; margin-left: 20px">colist</h2>
        </div>
      </div>
      <div class="router-links">
        <router-link class="router-item nav-router" to="/home">app</router-link>
        <router-link class="router-item nav-router" to="/">home</router-link>
        <div
          class="router-item nav-router"
          style="cursor: pointer"
          @click="login"
        >
          log in
        </div>
        <div
          class="router-item nav-router"
          style="cursor: pointer"
          @click="logout"
        >
          log out
        </div>
      </div>
    </nav>
    <div class="main-content">
      <h1 class="headline">Your Todo List. Reimagined</h1>
    </div>
    <form class="button-wrapper" @submit.prevent="showSignup">
      <input
        class="form-input field-email"
        type="text"
        placeholder="Email Address"
        autocomplete="off"
        v-model.lazy.trim="email"
        required
      />
      <button
        class="link-button"
        :class="{ active: disable_btn }"
        :disabled="disable_btn"
        type="submit"
      >
        Sign Up
      </button>
    </form>
    <span v-if="email.length > 1" style="font-size: 1em; font-weight: 600">{{
      email_msg
    }}</span>
    <div class="divider"></div>
    <div class="footer">
      <div class="links-column">
        <router-link class="router-item" to="/home">app</router-link>
        <router-link class="router-item" to="/">home</router-link>
        <div class="router-item" style="cursor: pointer" @click="login">
          log in
        </div>
        <div class="router-item" style="cursor: pointer" @click="logout">
          log out
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "homepage",
  data() {
    return {
      email: "",
      email_msg: "",
      disable_btn: true,
    };
  },
  methods: {
    valid_email(email, msg) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this[msg] = "";
        this.disable_btn = false;
        return true;
      } else {
        this[msg] = "Keep typing...waiting for a valid email";
        this.disable_btn = true;
        return false;
      }
    },
    showSignup() {
      if (this.email === "") {
        return;
      }
      localStorage.setItem("formUserEmail", this.email);
      router.push("/register");
    },
    // Log the user in
    login() {
      router.push("/login");
    },
    // Log the user out
    logout() {
      localStorage.removeItem("token");
    },
  },
  watch: {
    email: function (value) {
      this.valid_email(value, "email_msg");
    },
  },
};
</script>
<style>
.nav {
  flex-direction: row;
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 50px;
  margin: 24px auto 0;
}
.logo-wrapper {
  display: flex;
  flex-direction: row;
  margin-left: 42px;
  align-items: center;
}
.list-logo {
  cursor: pointer;
  flex-direction: row;
  height: 42px;
  left: 42px;
  margin-bottom: 0px;
  top: 2px;
  transition: transform 0.2s ease-in-out 0s;
  user-select: none;
  width: 42px;
  will-change: transform;
  z-index: 50;
}
.list-logo:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.router-links {
  display: flex;
  flex-direction: row;
  margin-right: 42px;
  align-items: center;
}
.main-content {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
.button-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.headline {
  font-size: 3.75em;
  font-weight: 800;
  line-height: 1.175em;
  max-width: 666px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.field-email {
  font-size: 1.25em;
  font-weight: 600;
  background: none !important;
  padding-right: 25px !important;
  transition: transform 0.2s ease-in-out 0s;
  border: none;
  outline: none;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
}
.field-email:focus,
.field-email:hover {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
.link-button {
  font-size: 1rem;
  font-weight: 600;
  background: black;
  color: white;
  border: none;
  border-radius: 16px;
  padding-top: 18px;
  padding-right: 50px;
  padding-bottom: 18px;
  padding-left: 50px;
  margin: 5px 0 22px 10px;
  display: inline-block;
  transition: transform 0.2s ease-in-out 0s;
}
.link-button:hover,
.link-button:focus {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.divider {
  background: hsla(222, 6%, 43%, 0.04);
  border-radius: 1px;
  display: none;
  height: 2px;
  margin: 100px auto 30px;
  width: 100px;
}
.footer {
  text-align: center;
}
.links-column {
  width: 100%;
  display: none;
  flex-direction: column !important;
  padding: 0px;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: justify;
  justify-content: space-between;
}
@media screen and (max-width: 400px) {
  .headline {
    font-size: 2.5em;
    margin: 42px auto 30px;
  }
}
@media screen and (max-width: 750px) {
  .headline {
    padding: 0 42px;
  }
  .router-links {
    display: none;
  }
  .nav {
    justify-content: center;
  }
  .logo-wrapper {
    margin-left: 0;
  }
  .links-column {
    display: flex;
  }
  .divider {
    display: block;
  }
  .main-content {
    margin-top: 50px;
  }
}
</style>
