<template>
  <div>
    <app-navigation></app-navigation>
    <list-form @list-added="createList"></list-form>
    <div class="slide-container">
      <list
        v-for="item in Lists"
        :key="item.key"
        :id="item.id"
        :name="item.name"
        class="slide"
      ></list>
    </div>
  </div>
</template>
<script>
import List from "../components/List.vue";
import ListForm from "../components/ListForm.vue";
import AppNavigation from "../components/AppNavigation.vue";
export default {
  components: {
    List,
    ListForm,
    AppNavigation,
  },
  data() {
    return {
      Lists: [],
    };
  },
  methods: {
    createList(listName) {
      this.$axios
        .post(
          `${this.$baseUrl}/api/lists`,
          {
            name: listName,
          },
          this.$config
        )
        .then((response) => {
          console.log(response);
          return this.$axios
            .get(`${this.$baseUrl}/api/lists`, this.$config)
            .then((response) => {
              this.Lists = response.data;
            })
            .catch((error) => console.log(error.response));
        })
        .catch((error) => console.log(error.response));
    },
  },
  created() {
    this.$axios
      .get(`${this.$baseUrl}/api/lists`, this.$config)
      .then((response) => {
        this.Lists = response.data;
      })
      .catch((error) => console.log(error.response));
  },
};
</script>
<style>
html,
body {
  margin: 0;
}
.slide-container {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
  padding-top: 20px;
}
.slide {
  scroll-snap-align: center;
  width: 100vw;
  min-height: 70vh;
  margin-left: 25vw;
  margin-right: 25vw;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>
