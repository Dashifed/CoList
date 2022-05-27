<template>
  <div>
    <app-navigation></app-navigation>
    <modal ref="taskModal">
      <template v-slot:header>
        <h1>Create a new task</h1>
      </template>
      <template v-slot:body>
        <to-do-form
          @todo-added="addToDo"
          class="parent"
        ></to-do-form> </template
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
        <div class="completed-center">
          <div class="spaced-items">
            <h1 class="light-txt">Completed items</h1>
            <div class="icon-holder ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#7F7F7F"
                style="display: inline-block; align-self: center"
                @click="showComplete = !showComplete"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <ul class="task-list-items" v-show="showComplete">
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
import AppNavigation from "../components/AppNavigation.vue";
export default {
  components: {
    ToDo,
    ToDoForm,
    AppNavigation,
    Modal,
  },
  data() {
    return {
      ToDoItems: [],
      showComplete: false,
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
            });
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
      this.$refs.taskModal.closeModal();
    },
    createTaskOption() {
      this.$refs.taskModal.openModal();
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
      });
    bus.$on("quickAction", this.createTaskOption);
  },
  beforeDestroy() {
    bus.$off("quickAction", this.createTaskOption);
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
  font-weight: 600;
  color: #42b983;
  text-decoration: none;
}
.parent > .form-holder > .input-lg {
  width: initial;
}
.custom-checkbox {
  margin-right: 1rem;
  display: flex;
}
.form-control {
  font-family: inherit;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
}
input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: black;
  width: 1.15rem;
  height: 1.15rem;
  border: 0.15rem solid black;
  border-radius: 1rem;
  transform: translateY(-0.075rem);
  display: grid;
  place-content: center;
  align-self: center;
  position: absolute;
}
input[type="checkbox"]::before {
  content: "";
  width: 0.65rem;
  height: 0.65rem;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1rem 1rem black;
  background-color: #fff;
  border-radius: 1rem;
}
input[type="checkbox"]:checked::before {
  transform: scale(1);
}
input[type="checkbox"]:focus {
  outline: max(2px, 0.15rem) solid black;
  outline-offset: max(2px, 0.15rem);
}
.form-control + .form-control {
  margin-top: 1rem;
}
.completed-center {
  width: 50vw;
  display: inline-grid;
  justify-self: center;
}
@media screen and (max-width: 960px) {
  .completed-center {
    width: 80vw;
  }
}
.center-items {
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-left: 2rem;
  display: grid;
}
.todo-label {
  display: flex;
  align-items: center;
  text-align: start;
  font-weight: 600;
  line-height: 1.1;
}
.todo-list {
  font-size: 12px;
  display: flex;
}
</style>
