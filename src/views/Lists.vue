<template>
  <div>
    <modal ref="listOptionsModal">
      <template v-slot:header>
        <h1>List actions</h1>
      </template>

      <template v-slot:body>
        <div class="listbox-items">
          <button
            class="listbox-item option-txt"
            @click="$refs.listOptionsModal.closeModal()"
          >
            <span
              class="material-icons md-24 material-icons-outlined"
              style="margin-right: 0.5rem"
            >
              ios_share
            </span>
            Share
          </button>
          <button class="listbox-item option-txt" @click="deleteList()">
            <span
              class="material-icons md-24 material-icons-outlined"
              style="margin-right: 0.5rem"
            >
              delete
            </span>
            Delete
          </button>
        </div>
      </template>
    </modal>
    <app-navigation></app-navigation>
    <modal ref="listModal">
      <template v-slot:header>
        <h1>Create a new list</h1>
      </template>
      <template v-slot:body>
        <list-form @list-added="createList"></list-form> </template
    ></modal>
    <div class="slide-container">
      <list
        v-for="item in Lists"
        :key="item.key"
        :id="item.id"
        :name="item.name"
        class="slide"
        @openCardOptions="openListOptions(item.id)"
      ></list>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
import Modal from "../components/Modal";
import List from "../components/List.vue";
import ListForm from "../components/ListForm.vue";
import AppNavigation from "../components/AppNavigation.vue";
export default {
  components: {
    List,
    ListForm,
    AppNavigation,
    Modal,
  },
  data() {
    return {
      Lists: [],
      openList: null,
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
      this.$refs.listModal.closeModal();
    },
    deleteList() {
      this.$refs.listOptionsModal.closeModal();
      this.$axios
        .delete(`${this.$baseUrl}/api/lists/` + this.openList, this.$config)
        .then(() => {
          const listToRemove = this.Lists.find(
            (list) => list.id === this.openList
          );
          this.Lists.splice(this.Lists.indexOf(listToRemove), 1);
        });
      this.openList = null;
    },
    openListOptions(selectedList) {
      this.openList = selectedList;
      this.$refs.listOptionsModal.openModal();
    },
    createListOption() {
      this.$refs.listModal.openModal();
    },
  },
  created() {
    this.$axios
      .get(`${this.$baseUrl}/api/lists`, this.$config)
      .then((response) => {
        this.Lists = response.data;
      })
      .catch((error) => console.log(error.response));
    bus.$on("quickAction", this.createListOption);
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
  padding-bottom: 20px;
}
.slide {
  scroll-snap-align: center;
  width: 100vw;
  min-height: 80vh;
  margin-left: 25vw;
  margin-right: 25vw;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.overflow-hidden {
  overflow: hidden;
}
.listbox-items {
  padding: 0.25rem;
  z-index: 100;
}
.listbox-item {
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  align-items: center;
  width: 100%;
  display: flex;
  cursor: pointer;
  background-color: transparent;
  background-image: none;
  -webkit-appearance: button;
  text-transform: none;
  font-family: inherit;
  position: relative;
  z-index: 100;
}
.listbox-item:hover,
.listbox-item:focus {
  outline: none;
  background-color: rgba(95, 99, 104, 0.12);
}
.option-txt {
  font-weight: 600;
  font-size: 1rem;
}
</style>
