import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = process.env.VUE_APP_ROOT_API;
const token = localStorage.getItem("token");
Vue.prototype.$config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
Vue.config.productionTip = false;
export const bus = new Vue();
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
