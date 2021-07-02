<template>
  <div>
    <list-form @list-added="createList"></list-form>
    <div>
      <list v-for="item in Lists" :key="item.key" :id="item.id" :name="item.name"></list>
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
