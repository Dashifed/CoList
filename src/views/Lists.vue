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
              class="h-5 w-5 supp-txt"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Delete
          </button>
          <hr />
          <button
            class="listbox-item option-txt"
            @click="$refs.listOptionsModal.closeModal()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 supp-txt"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Cancel
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
    <modal ref="errorModal">
      <template v-slot:body>
        <h2>{{ listError }}</h2>
        <div class="listbox-items">
          <button
            class="listbox-item option-txt"
            @click="$refs.errorModal.closeModal()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 supp-txt"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Okay
          </button>
        </div>
      </template>
    </modal>
    <div class="center-fixed" v-show="emptyLists">
      <h1>Start creating a list by clicking on the toolbar button</h1>
    </div>
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
      listError: "",
      emptyLists: false,
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
        .then(() => {
          return this.$axios
            .get(`${this.$baseUrl}/api/lists`, this.$config)
            .then((response) => {
              this.Lists = response.data;
              this.emptyLists = false;
            });
        })
        .catch(
          (error) => (
            this.$refs.errorModal.openModal(),
            (this.listError = error.response.data.error)
          )
        );
      this.$refs.listModal.closeModal();
    },
    deleteList() {
      this.$refs.listOptionsModal.closeModal();
      const listToRemove = this.Lists.find((list) => list.id === this.openList);
      this.Lists.splice(this.Lists.indexOf(listToRemove), 1);
      this.$axios.delete(
        `${this.$baseUrl}/api/lists/` + this.openList,
        this.$config
      );
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
        if (!this.Lists.length) {
          this.emptyLists = true;
        }
      });
    bus.$on("quickAction", this.createListOption);
  },
  beforeDestroy() {
    bus.$off("quickAction", this.createListOption);
  },
};
</script>
<style>
html,
body {
  margin: 0;
}
.center-fixed {
  width: 100vw;
  height: 80vh;
  display: grid;
  place-items: center;
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
  min-height: 80vh;
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
  color: black;
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
.supp-txt {
  margin-right: 0.5rem;
}
</style>
