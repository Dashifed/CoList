<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "CoList",
  title: "CoList",
  htmlAttrs: {
    lang: "en-US",
  },
  meta: [
    { charset: "utf-8" },
    {
      name: "title",
      content: "CoList",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content: "CoList is a todolist reimagined for an intuitive experience",
    },
  ],
};
</script>
<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0;
  height: 100%;
}

a.router-link-exact-active {
  background: #e8f2ed;
  color: black;
}
</style>
