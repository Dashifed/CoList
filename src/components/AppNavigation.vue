<template>
  <div class="app-nav">
    <div class="menu-items bar-links">
      <router-link
        class="menu-item router-item nav-router app-router"
        to="/home"
        replace
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          /></svg
      ></router-link>
      <router-link
        class="menu-item router-item nav-router app-router"
        to="/lists"
        replace
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          /></svg
      ></router-link>
    </div>
    <div class="header-controls">
      <div class="icon-holder" @click="showListCreation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  methods: {
    showListCreation() {
      bus.$emit("quickAction");
    },
  },
};
</script>
<style>
.app-nav {
  display: grid;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0px;
  padding: 1rem;
  position: sticky;
  grid-template-columns: 0px auto 40px;
  z-index: 50;
}
@media screen and (max-width: 1280px) {
  .bar-links {
    justify-self: start;
  }
}
@media screen and (max-width: 960px) {
  .app-nav {
    grid-template-columns: 1fr;
    padding: 0;
  }
  .bar-links {
    flex-direction: row;
    -moz-box-pack: justify;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 0px;
    right: 50%;
    transform: translate(50%, -50%);
    margin: 0px auto;
  }
  .nav-router {
    margin: 0px !important;
  }
  .header-controls {
    padding-top: 1rem;
    padding-right: 1rem;
  }
}
.app-nav_btn {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  max-width: 30vw;
  border-radius: 1rem;
  padding: 0.2rem;
  user-select: none;
}
.app-nav_btn:hover {
  background: #f5f5f7;
  padding: 10px;
}
.bar-links {
  flex-direction: row;
  align-items: center;
  width: fit-content;
  display: grid;
  grid-auto-flow: column;
  grid-column-start: 2;
  grid-column-end: 3;
  gap: 10px;
}
.header-controls {
  display: flex;
  flex-direction: row;
  -moz-box-align: center;
  align-items: center;
  justify-self: flex-end;
}
.router-item {
  color: #a9b2be;
  background-color: white;
  display: block;
  height: 30px;
  text-decoration: none;
  font-size: large;
  user-select: none;
  border-radius: 10px;
  padding: 5px;
  transition: all 0.2s ease-out;
  outline: none;
  font-weight: 600;
}
.app-router {
  padding-left: 10vw;
  padding-top: 10px;
  padding-right: 10vw;
  padding-bottom: 10px;
  border-radius: 10px;
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 11px -2px rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
}
.app-router:hover,
.app-router:focus {
  transform: scale(1.05);
}
.nav-router {
  margin-left: 30px;
}
@media screen and (max-width: 400px) {
  .app-router {
    padding-left: 30px;
    padding-right: 30px;
  }
}
.h-6 {
  height: 1.5rem;
}
.w-6 {
  height: 1.5rem;
}
.h-5 {
  height: 1.25rem;
}
.w-5 {
  height: 1.25rem;
}
</style>
