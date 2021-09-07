import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomePage from '../views/HomePage.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Lists from '../views/Lists.vue'
import axios from 'axios'

Vue.use(VueRouter)

function guardMyroute(to, from, next) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  axios.get("https://co-list-app.herokuapp.com/auth", config)
  .then(() => {
    next()
  })
  .catch(() => {
    next('/login')
  })
}
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { title: 'Home' },
  },
  {
    path: '/lists',
    name: 'Lists',
    component: Lists,
    beforeEnter: guardMyroute,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: guardMyroute,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: 'Register' },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: 'Login' },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
