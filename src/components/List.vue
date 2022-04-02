<template>
  <div :for="id" class="list heavy-txt">
    <div class="list-items">
      <div class="spaced-items">
        <h1 class="list-name">{{ name }}</h1>
        <span
          class="material-icons md-24 material-icons-outlined"
          style="display: inline-block; align-self: center"
          @click="openCardOptions"
        >
          more_vert
        </span>
        <div class="menu-buttons"></div>
      </div>
      <to-do-form @todo-added="addToDo"></to-do-form>
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
        <div class="spaced-items">
          <h2 class="light-txt">Completed</h2>
          <span
            class="material-icons md-24 material-icons-outlined"
            style="display: inline-block; align-self: center"
            @click="showComplete = !showComplete"
            >expand_more</span
          >
        </div>
        <ul class="task-list-items tasks-complete" v-show="showComplete">
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
      showComplete: false,
      cardOptions: false,
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
            list: this.name,
          },
          this.$config
        )
        .then((response) => {
          console.log(response);
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
      return this.$axios
        .get(`${this.$baseUrl}/api/notes`, this.$config)
        .then((response) => {
          this.ToDoItems.splice(toDoToRemove, 1);
          this.ToDoItems = response.data;
        })
        .catch((error) => console.log(error.response));
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    openCardOptions() {
      this.cardOptions = !this.cardOptions;
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
      .get(`${this.$baseUrl}/api/notes`, this.$config)
      .then((response) => {
        this.ToDoItems = response.data;
      })
      .catch((error) => console.log(error.response));
  },
};
</script>
<style>
.list {
  padding: 20px;
  box-shadow: 0 4px 11px -2px rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
  border-radius: 20px;
  box-sizing: border-box;
}
.list-items {
  width: 100%;
  height: 100%;
  margin: 20px;
}
.list-name {
  user-select: none;
  display: flex;
  position: relative;
  height: 30px;
  justify-content: flex-start;
}
.heavy-txt {
  font-weight: 500;
}
.light-txt {
  color: #ccc;
}
.spaced-items {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 960px) {
  .list-name {
    justify-content: center;
  }
}
</style>
