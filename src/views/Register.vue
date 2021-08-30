<template>
  <div class="signup-app">
    <div class="form-group">
      <label for="email"><b>Email</b></label>
      <input type="text" v-model="email" class="form-input" required />
      <span v-if="email.length > 1">{{ email_msg }}</span>
      <br />
      <label for="psw"><b>Password</b></label>
      <input type="password" v-model="password1" class="form-input" required />
      <span v-show="msg1" class="form-message">{{ pwd1_msg }}</span>
      <label for="psw2"><b>Repeat Password</b></label>
      <input type="password" v-model="password2" class="form-input" required />
      <span v-show="msg2" class="form-message">{{ pwd2_msg }}</span>
    </div>
    <div class="signupbtn-group">
      <button type="button" class="cancelbtn signup-btn" @click="on_cancel()">
        Cancel
      </button>
      <button
        type="submit"
        class="signupbtn signup-btn"
        :class="{ active: disable_btn }"
        :disabled="disable_btn"
        @click.prevent="on_signup()"
      >
        Sign Up
      </button>
      <button class="cancelbtn signup-btn" @click="signup_switch()">Log in instead</button>
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
      password1: "",
      pwd1_msg: "",
      password2: "",
      pwd2_msg: "",
      disable_btn: true,
      msg1: true,
      msg2: true,
      err1: true,
      err_msg1: "",
    };
  },
  methods: {
    valid_email(email, msg) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this[msg] = "";
        return true;
      } else {
        this[msg] = "Keep typing...waiting for a valid email";
        return false;
      }
    },
    check_password_length(value, msg, total) {
      var length = value.length;
      var sum = 0;
      var display;

      sum = total - length;

      switch (sum) {
        case 0:
          display = "";
          break;
        case 1:
          display = "Keep going - just need " + sum + " more character.";
          break;
        default:
          display = "Keep going - just need " + sum + " more characters";
      }

      if (length >= total) {
        this[msg] = "";
        return true;
      } else {
        this[msg] = display;
        return false;
      }
    },
    check_passwords_match() {
      if (this.password1.length > 5 && this.password2.length > 5) {
        if (this.password2 != this.password1) {
          this.pwd2_msg = "Passwords do not match";
          this.disable_btn = true;
          return true;
        } else {
          this.pwd2_msg = "";
          this.disable_btn = false;
          return false;
        }
      }
    },
    on_signup() {
      this.$axios
        .post("http://localhost:3001/register", {
          email: this.email,
          password: this.password1,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          router.push("/home")
        })
        .catch((error) =>
          console.log(error.response),
          this.err_msg1 = "Error"
      );
      this.$emit("change_comp", "results");
    },
    on_cancel() {
      router.push("/");
    },
    signup_switch() {
      router.push("/login")
    }
  },
  watch: {
    email: function(value) {
      this.valid_email(value, "email_msg");
    },
    password1: function(value) {
      if (this.check_password_length(value, "pwd1_msg", 6)) {
        this.check_passwords_match();
      }
    },
    password2: function(value) {
      if (this.check_password_length(value, "pwd2_msg", 6)) {
        this.check_passwords_match();
      }
    },
  },
};
</script>
<style>
.form-group {
  display: grid;
  align-items: center;
  justify-content: center;
}
.form-input {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 60px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  border-radius: 1rem;
}
.form-input:focus {
  background-color: #ddd;
  outline: none;
}
.signup-btn {
  background-color: black;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}
.signup-btn:hover {
  opacity: 1;
}
.signupbtn {
  color: white;
  border: 1px solid black;
}
.cancelbtn {
  padding: 14px 20px;
  background-color: white;
  border: 1px solid #f1f1f1;
}
.cancelbtn,
.signupbtn {
  float: left;
  width: 20vw;
  border-radius: 1rem;
}
.form-message {
  color: red;
}
.signupbtn-group {
  display: grid;
  align-items: center;
  justify-content: center;
}
.signup-app {
  margin: 50px;
}
@media screen and (max-width: 400px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>
