<template>
  <div class="app-nav">
    <div class="app-nav_btn" @click="emitMenu">
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
    }
  }
}
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
}
.app-nav_btn:hover {
  background: #f5f5f7;
  padding: 10px;
}
</style>
