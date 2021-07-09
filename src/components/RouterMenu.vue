<template>
  <div>
    <div id="router-menu" class="animate__animated animate__bounceIn" v-show="showMenu">
      <div class="menu-items">
        <router-link class="menu-item" to="/profile">Home</router-link>
        <router-link class="menu-item" to="/lists">Lists</router-link>
      </div>
    </div>
    <div v-show="showMenu" id="back-cover" @click="showMenu = !showMenu"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    openMenu() {
      this.showMenu = !this.showMenu
    }
  },
  mounted() {
    this._keyListener = function(e) {
      const inputs = [...document.querySelectorAll("input")];
      const focusedInput = inputs.includes(document.activeElement);
        if (e.key === "m" && focusedInput === false) {
          this.openMenu();
        }
    };

    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener);
  }
}
</script>
<style>
#router-menu {
  position: absolute;
  left: 35vw;
  top: 50px;
  background: linear-gradient(90deg,#5522fa 0%,#0074e4 100%) !important;
  box-sizing: border-box;
  border-radius: 2rem;
  width: 30vw;
  height: 200px;
  z-index: 150;
}
#back-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
}
.menu-items {
  margin-top: 20px;
}
.menu-item {
  color: #b6dbff;
  display: block;
  height: 30px;
  text-decoration: none;
  font-size: large;
}
.menu-item:hover {
  color: #fff;
}
</style>