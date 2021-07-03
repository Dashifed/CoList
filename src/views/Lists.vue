<template>
  <div>
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
export default {
  components: {
    List,
    ListForm
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
  margin: 20px;
}.slide {
  scroll-snap-align: start;
  min-width: 40vw;
  max-height: 80vh;
  margin-right: 50px;
  display: flex;
  text-align: center;
  justify-content: center;
}
</style>