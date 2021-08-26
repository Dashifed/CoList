<template>
  <div :for="id" class="list heavy-txt">
    <div class="list-items">
    <h1 class="list-name">{{ name }}</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
      <ul class="todo-list-items">
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
          class="todo-list-item"
        ></to-do>
      </ul>
      <div class="completed-items">
        <h2>Completed</h2>
        <ul class="todo-list-items">
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
            class="todo-list-item"
          ></to-do>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ToDo from "./ToDo.vue";
import ToDoForm from "./ToDoForm.vue";
export default {
  components: {
    ToDo,
    ToDoForm
  },
  props: {
    name: {required: true, type: String},
    id: {required: true, type: String}
  },
  data() {
    return {
      ToDoItems: []
    }
  },
  methods: {
    addToDo(toDoLabel) {
      axios.post(`http://localhost:3001/api/notes`, {
        label: toDoLabel.label,
        done: false,
        list: this.name
      })
      .then((response) => {
        console.log(response)
      });
      axios.get("http://localhost:3001/api/notes").then(response => {
        this.ToDoItems = response.data
      })
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find(item => item.id === toDoId);
      toDoToUpdate.done = !(toDoToUpdate.done)
    },
    removeTodo(index) {
      this.ToDoItems.splice(index, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
      toDoToEdit.label = newLabel;
    }
  },
  computed: {
    filter() {
      return this.ToDoItems.filter(item => item.list === this.name)
    },
    itemsFilter() {
      return this.filter.filter((item) => !item.done);
    },
    itemsNotFilter() {
      return this.filter.filter((item) => item.done);
    },
  },
  mounted() {
    axios.get("http://localhost:3001/api/notes").then(response => {
      this.ToDoItems = response.data
    })
  }
}
</script>
<style>
.list {
  width: 50vw;
  height: 80vh;
  padding: 20px;
  border: 1px solid black;
  border-radius: 1rem;
  box-sizing: border-box;
}
.list-items {
  width: 100%;
  height: 100%;
  margin: 0;
}
.list-name {
  user-select: none;
  display:flex;
  position:relative;
  height:30px;
  justify-content:center;
}
.heavy-txt {
  font-weight: 500;
}
.todo-list-items {
  width: 100%;
  display: grid;
  padding: 0;
}
.completed-items {
  justify-content: center;
}
.todo-list-item {
  display: flex;
  position: relative;
  align-items: stretch;
  width: 100%;
  height: 50px;
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  cursor: pointer;
  outline: none;
  border-bottom: 1px solid #f0f0f0;
  z-index: 50;
}
</style>
