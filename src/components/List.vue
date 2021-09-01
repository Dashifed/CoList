<template>
  <div :for="id" class="list heavy-txt">
    <div class="list-items">
      <h1 class="list-name">{{ name }}</h1>
      <to-do-form @todo-added="addToDo"></to-do-form>
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
        <h2 class="light-txt">Completed</h2>
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
import ToDo from "./ToDo.vue";
import ToDoForm from "./ToDoForm.vue";
export default {
  components: {
    ToDo,
    ToDoForm,
  },
  props: {
    name: { required: true, type: String },
    id: { required: true, type: String },
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
            list: this.name,
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
    filter() {
      return this.ToDoItems.filter((item) => item.list === this.name);
    },
    itemsFilter() {
      return this.filter.filter((item) => !item.done);
    },
    itemsNotFilter() {
      return this.filter.filter((item) => item.done);
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
.list {
  padding: 20px;
  border: 2px dotted black;
  border-radius: 20px;
  box-sizing: border-box;
}
.list-items {
  width: 100%;
  height: 100%;
  margin: 0;
}
.list-name {
  user-select: none;
  display: flex;
  position: relative;
  height: 30px;
  justify-content: center;
}
.heavy-txt {
  font-weight: 500;
}
.light-txt {
  color: #ccc;
}
.completed-items {
  justify-content: center;
}
</style>
