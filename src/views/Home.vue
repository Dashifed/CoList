<template>
  <div>
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
    <div id="main-area">
      <to-do-form @todo-added="addToDo"></to-do-form>
      <router-view></router-view>
      <ul class="task-list-items">
        <to-do
          v-for="item in itemsFilter"
          :id="item.id"
          :label="item.label"
          :key="item.id"
          :done="item.done"
          :list="item.list"
          @checkbox-changed="updateDoneStatus(item.id)"
          @remove="removeTodo(item.id)"
          @item-edited="editToDo(item.id, $event)"
          class="task-list-item"
        ></to-do>
      </ul>
      <div>
        <h1 class="light-txt">
          Completed items ({{ this.itemsNotFilter.length }})
        </h1>
        <ul class="task-list-items">
          <to-do
            v-for="item in itemsNotFilter"
            :id="item.id"
            :label="item.label"
            :key="item.id"
            :done="item.done"
            :list="item.list"
            @checkbox-changed="updateDoneStatus(item.id)"
            @remove="removeTodo(item.id)"
            @item-edited="editToDo(item.id, $event)"
            class="task-list-item"
          ></to-do>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
import Modal from "../components/Modal";
import ToDo from "../components/ToDo.vue";
import ToDoForm from "../components/ToDoForm.vue";
import ListForm from "../components/ListForm.vue";
import AppNavigation from "../components/AppNavigation.vue";
export default {
  components: {
    ToDo,
    ToDoForm,
    AppNavigation,
    ListForm,
    Modal,
  },
  data() {
    return {
      ToDoItems: [],
    };
  },
  methods: {
    addToDo(toDoLabel) {
      this.$axios
        .post(
          `${this.$baseUrl}/api/notes`,
          {
            label: toDoLabel.label,
            done: false,
            list: toDoLabel.list,
          },
          this.$config
        )
        .then(() => {
          return this.$axios
            .get(`${this.$baseUrl}/api/notes`, this.$config)
            .then((response) => {
              this.ToDoItems = response.data;
            })
            .catch((error) => console.log(error.response));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
    },
    removeTodo(toDoId) {
      const toDoToRemove = this.ToDoItems.find((item) => item.id === toDoId);
      this.ToDoItems.splice(this.ToDoItems.indexOf(toDoToRemove), 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    createList(listName) {
      this.$axios
        .post(
          `${this.$baseUrl}/api/lists`,
          {
            name: listName,
          },
          this.$config
        )
        .catch(
          (error) => (
            this.$refs.errorModal.openModal(),
            (this.listError = error.response.data.error)
          )
        );
      this.$refs.listModal.closeModal();
    },
    createListOption() {
      this.$refs.listModal.openModal();
    },
  },
  computed: {
    itemsFilter() {
      return this.ToDoItems.filter((item) => !item.done);
    },
    itemsNotFilter() {
      return this.ToDoItems.filter((item) => item.done);
    },
  },
  created() {
    this.$axios
      .get(`${this.$baseUrl}/api/notes`, this.$config)
      .then((response) => {
        this.ToDoItems = response.data;
      })
      .catch((error) => console.log(error.response));
    bus.$on("quickAction", this.createListOption);
  },
};
</script>
<style>
input {
  font-size: 16px;
}
#main-area {
  padding-top: 36px;
}
#nav {
  display: flex;
  height: 40px;
  align-items: space-between;
  line-height: 40px;
  background-color: #506578;
  padding-left: 35px;
  padding-right: 35px;
  align-items: center;
}
#nav a {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}
.custom-checkbox {
  margin-right: 1rem;
  display: flex;
}
.task-list-items {
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.task-list-item {
  display: flex;
  position: relative;
  align-items: stretch;
  justify-content: space-between;
  width: 50vw;
  height: 50px;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  border-bottom: 1px solid #f0f0f0;
}
@media screen and (max-width: 720px) {
  .input-lg {
    font-weight: normal !important;
  }
}
.menu-buttons {
  position: absolute;
  top: 3rem;
}
.item-labels {
  margin-left: 1rem;
  display: grid;
}
.todo-label {
  display: flex;
  align-items: center;
  text-align: start;
}
.todo-list {
  font-size: 12px;
  display: flex;
}
</style>
