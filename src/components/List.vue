<template>
  <div>
    <div :for="id" class="list heavy-txt">
      <div class="list-items">
        <div class="spaced-items">
          <h1 class="list-name">{{ name }}</h1>
          <div class="icon-holder" style="align-self: center">
            <span
              class="material-icons md-24 material-icons-outlined"
              @click="openCardOptions(id)"
            >
              more_vert
            </span>
          </div>
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
            <h2 class="light-txt">
              Completed ({{ this.itemsNotFilter.length }})
            </h2>
            <div class="icon-holder">
              <span
                class="material-icons md-24 material-icons-outlined"
                style="display: inline-block; align-self: center"
                @click="showComplete = !showComplete"
                >expand_more</span
              >
            </div>
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
      this.ToDoItems.splice(this.ToDoItems.indexOf(toDoToRemove), 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    openCardOptions(selectedList) {
      this.$emit("openCardOptions", selectedList);
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
  border-radius: 2rem;
  box-sizing: border-box;
  width: 70vw;
}
.list-items {
  margin: 20px;
}
.list-name {
  user-select: none;
  display: flex;
  position: relative;
  align-items: center;
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
  align-items: center;
}
@media screen and (max-width: 960px) {
  .list-name {
    justify-content: center;
  }
}
.icon-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: relative;
}
.icon-holder:hover,
.icon-holder:focus {
  outline: none;
  background-color: rgba(95, 99, 104, 0.12);
}
.box-shadow_menu {
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: white;
}
.z-p {
  position: relative;
  z-index: 100;
}
</style>
