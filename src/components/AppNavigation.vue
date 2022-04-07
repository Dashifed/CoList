<template>
  <div class="app-nav">
    <div class="menu-items bar-links">
      <router-link
        class="menu-item router-item nav-router app-router"
        to="/home"
        replace
        >Home</router-link
      >
      <router-link
        class="menu-item router-item nav-router app-router"
        to="/lists"
        replace
      >
        Lists</router-link
      >
    </div>
    <div class="header-controls">
      <div class="icon-holder">
        <span
          class="material-icons md-24 material-icons-outlined"
          @click="showListCreation"
        >
          add_circle_outline
        </span>
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
    grid-template-columns: 48px 1fr 1fr;
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
@media screen and (max-width: 700px) {
  .app-nav {
    grid-template-columns: 1fr;
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
.tooltip {
  position: relative;
}
.tooltip:before,
.tooltip:after {
  display: block;
  opacity: 0;
  pointer-events: none;
  position: absolute;
}
.tooltip:after {
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(0, 0, 0, 0.75);
  border-left: 6px solid transparent;
  content: "";
  height: 0;
  top: 50px;
  left: 20px;
  width: 0;
}
.tooltip:before {
  background: rgba(0, 0, 0, 0.75);
  border-radius: 2px;
  color: #fff;
  content: attr(data-title);
  font-size: 14px;
  padding: 6px 10px;
  top: 56px;
  white-space: nowrap;
}
.tooltip.fade:after,
.tooltip.fade:before {
  transform: translate3d(0, -10px, 0);
  transition: all 0.15s ease-in-out;
}
.tooltip.fade:hover:after,
.tooltip.fade:hover:before {
  opacity: 1;
  transform: translate3d(0, 0, 0);
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
}
.router-item:hover,
.router-item:focus {
  color: black;
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
  background: #e8f2ed;
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
</style>
