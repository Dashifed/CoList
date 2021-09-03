import Vue from "vue";
import App from "./App.vue";
import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = "https://co-list-app.herokuapp.com"
const token = localStorage.getItem("token");
Vue.prototype.$config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");