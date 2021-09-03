<template>
  <div class="app-nav">
    <div
      class="app-nav_btn tooltip fade"
      data-title="Press 'm' to show the menu"
      @click="emitMenu"
    >
      Menu
      <span class="material-icons md-24 material-icons-outlined"
        >expand_more</span
      >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    emitMenu() {
      this.$root.$emit("nav-changed");
    },
  },
};
</script>
<style>
.app-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  height: 50px;
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
</style>
