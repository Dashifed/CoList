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
        {
          name: "title",
          content: "CoList",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "CoList is a todolist reimagined for an intuitive experience",
        },
        {
          property: "og:image",
          content: "https://co-list.vercel.app/opengraph.jpg",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "CoList",
        },
        {
          name: "twitter:site",
          content: "@colovskii",
        },
        {
          name: "twitter:image",
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
