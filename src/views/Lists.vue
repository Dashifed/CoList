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
import axios from "axios";
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
      axios.post("http://localhost:3001/api/lists", {
        name: listName
      })
      .then((response) => {
        console.log(response)
      });
      axios.get("http://localhost:3001/api/lists").then(response => {
        this.Lists = response.data
      })
    },
  },
  mounted() {
    axios.get("http://localhost:3001/api/lists").then(response => {
      this.Lists = response.data
    })
  }
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