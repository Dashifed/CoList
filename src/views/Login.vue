<template>
  <div class="signup-app">
    <div class="form-group">
      <label for="email"><b>Email</b></label>
      <input type="text" v-model="email" class="form-input" required />
      <span v-if="email.length > 1">{{ email_msg }}</span>
      <br />
      <label for="psw"><b>Password</b></label>
      <input type="password" v-model="password" class="form-input" required />
    </div>
    <div class="signupbtn-group">
      <button
        type="submit"
        class="signupbtn signup-btn"
        :class="{ active: disable_btn }"
        :disabled="disable_btn"
        @click.prevent="on_login()"
      >
        Log In
      </button>
      <button class="cancelbtn signup-btn" @click="signup_switch()">Sign up instead</button>
      <span v-show="err1" class="form-message">{{ err_msg1 }}</span>
    </div>
  </div>
</template>
<script>
import router from "../router";
export default {
  data() {
    return {
      email: "",
      email_msg: "",
      password: "",
      err_msg1: "",
      err1: true,
      disable_btn: true,
    };
  },
  methods: {
    on_login() {
      this.$axios
        .post(`${this.$baseUrl}/login`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          router.push("/home")
        })
        .catch(() =>
          this.err_msg1 = "Error"
      );
    },
    valid_email(email, msg) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this[msg] = "";
        this.disable_btn = false;
        return true;
      } else {
        this[msg] = "Keep typing...waiting for a valid email";
        return false;
      }
    },
    signup_switch() {
      router.push("/register")
    }
  },
  watch: {
    email: function(value) {
      this.valid_email(value, "email_msg");
    },
  },
};
</script>
