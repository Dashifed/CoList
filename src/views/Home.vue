<template>
  <div>
    <app-navigation></app-navigation>
    <router-menu></router-menu>
    <div id="main-area">
      <to-do-form @todo-added="addToDo"></to-do-form>
      <router-view></router-view>
      <ul class="task-list-items">
        <to-do
          v-for="(item, index) in itemsFilter"
          :id="item.id"
          :label="item.label"
          :key="item.id"
          :done="item.done"
          :list="item.list"
          @checkbox-changed="updateDoneStatus(item.id)"
          @remove="removeTodo(index)"
          @item-edited="editToDo(item.id, $event)"
          class="task-list-item"
        ></to-do>
      </ul>
      <div class="completed-items">
        <h1 class="light-txt">Completed</h1>
        <ul class="task-list-items">
          <to-do
            v-for="(item, index) in itemsNotFilter"
            :id="item.id"
            :label="item.label"
            :key="item.id"
            :done="item.done"
            :list="item.list"
            @checkbox-changed="updateDoneStatus(item.id)"
            @remove="removeTodo(index)"
            @item-edited="editToDo(item.id, $event)"
            class="task-list-item"
          ></to-do>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ToDo from "../components/ToDo.vue";
import ToDoForm from "../components/ToDoForm.vue";
import RouterMenu from "../components/RouterMenu.vue";
import AppNavigation from "../components/AppNavigation.vue";
export default {
  components: {
    ToDo,
    ToDoForm,
    RouterMenu,
    AppNavigation,
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
          `http://localhost:3001/api/notes`,
          {
            label: toDoLabel.label,
            done: false,
            list: toDoLabel.list,
          },
          this.$config
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
    },
    removeTodo(index) {
      this.ToDoItems.splice(index, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
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
      .get("http://localhost:3001/api/notes", this.$config)
      .then((response) => {
        this.ToDoItems = response.data;
      })
      .catch((error) => console.log(error.response));
  },
  updated() {
    this.$nextTick(function() {
      this.$axios
        .get("http://localhost:3001/api/notes", this.$config)
        .then((response) => {
          this.ToDoItems = response.data;
        })
        .catch((error) => console.log(error.response));
    });
  },
};
</script>
<style>
.material-icons {
  cursor: pointer;
}
.material-icons.md-18 {
  font-size: 18px;
}
.material-icons.md-24 {
  font-size: 24px;
  user-select: none;
}
.material-icons.md-36 {
  font-size: 36px;
}
.material-icons.md-48 {
  font-size: 48px;
}
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
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  outline: none;
  border-bottom: 1px solid #f0f0f0;
  z-index: 50;
}
.delete-btn {
  display: inline-block;
  cursor: pointer;
  width: 50px;
  padding: 3px;
  background-color: white;
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  margin-bottom: 2px;
}
.menu-buttons {
  display: inline-block;
  position: absolute;
  z-index: 100;
}
.item-labels {
  margin-left: 1rem;
  display: grid;
}
.todo-label {
  display: flex;
  align-items: center;
}
.todo-list {
  font-size: 12px;
}
.list-form {
  margin: 20px;
}
</style>
