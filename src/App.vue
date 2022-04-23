<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "CoList",
  htmlAttrs: {
    lang: "en-US",
  },
  metaInfo() {
    return {
      title: "CoList",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "og:title",
          content: "CoList",
        },
        {
          property: "og:description",
          content:
            "CoList is a todolist reimagined for an intuitive experience",
        },
        {
          property: "og:image",
          content: "https://co-list.vercel.app/opengraph.jpg",
        },
      ],
    };
  },
};
</script>
<style>
#app {
  font-family: "Suisse", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0;
  height: 100%;
}

a.router-link-exact-active {
  background: #000000;
  color: white;
}
</style>
