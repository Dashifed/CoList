<template>
  <div>
    <app-navigation></app-navigation>
    <router-menu></router-menu>
    <list-form @list-added="createList"></list-form>
    <div class="slide-container">
      <list v-for="item in Lists" :key="item.key" :id="item.id" :name="item.name" class="slide"></list>
    </div>
  </div>
</template>
<script>
import uniqueId from "lodash.uniqueid";
import List from "../components/List.vue";
import ListForm from "../components/ListForm.vue";
import RouterMenu from '../components/RouterMenu.vue';
import AppNavigation from '../components/AppNavigation.vue';
export default {
  components: {
    List,
    ListForm,
    RouterMenu,
    AppNavigation
  },
  data() {
    return {
      Lists: []
    }
  },
  methods: {
    createList(listName) {
      this.Lists.push({ id: uniqueId("list-"), name: listName });
    },
  },
};
</script>
<style>
html, body {
  margin: 0;
}
.slide-container {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
  margin-top: 20px;
}.slide {
  scroll-snap-align: start;
  min-width: 100vw;
  max-height: 80vh;
  margin-left: 10vw;
  margin-right: 10vw;
  display: flex;
  text-align: center;
  justify-content: center;
}
</style>