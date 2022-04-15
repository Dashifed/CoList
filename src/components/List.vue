<template>
  <div>
    <div :for="id" class="list heavy-txt">
      <div class="list-items">
        <div class="spaced-items">
          <h1 class="list-name">{{ name }}</h1>
          <div
            class="icon-holder"
            style="align-self: center"
            @click="openCardOptions(id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
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
  width: 60vw;
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
  color: #7f7f7f;
}
.spaced-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 960px) {
  .list {
    width: 80vw;
  }
  .list-name {
    justify-content: center;
  }
  .task-list-item {
    width: 70vw;
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
  cursor: pointer;
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
  height: 40px !important;
}
</style>
