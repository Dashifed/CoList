<template>
  <div>
    <modal ref="listOptionsModal">
      <template v-slot:header>
        <h1>List actions</h1>
      </template>

      <template v-slot:body>
        <div class="listbox-items">
          <button class="listbox-item option-txt" @click="deleteList()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              style="margin-right: 0.5rem"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
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
  -webkit-overflow-scrolling: touch;
  padding-top: 20px;
  padding-bottom: 20px;
}
.slide {
  scroll-snap-align: start;
  min-width: 100vw;
  height: 80vh;
  position: relative;
  text-align: center;
  display: flex;
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
