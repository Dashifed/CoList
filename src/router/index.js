import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile.vue";
import ProfileToday from "../views/ProfileToday.vue";
import ProfileTomorrow from "../views/ProfileTomorrow.vue";
import ProfileAll from "../views/ProfileAll.vue"
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    beforeEnter: authGuard,
    component: () => import('../views/Lists.vue')
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: authGuard,
    children: [
    {
      path: '',
      component: ProfileAll
    },
    {
      path: 'today',
      component: ProfileToday
    },
    {
      path: 'tomorrow',
      component: ProfileTomorrow
    }
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
