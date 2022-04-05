<template>
  <div v-if="!isEditing">
    <div class="custom-checkbox">
      <input
        type="checkbox"
        class="checkbox"
        :id="id"
        :checked="isDone"
        @change="changeCheckbox"
      />
      <div class="item-labels">
        <label class="todo-label" :for="id">
          {{ label }}
        </label>
        <label class="todo-list" :for="id" v-show="list">
          {{ list }}
        </label>
      </div>
    </div>
    <div>
      <div class="icon-holder">
        <span
          class="material-icons md-24 material-icons-outlined"
          @click="openMenu"
          >more_horiz</span
        >
      </div>
      <div
        class="listbox-items menu-buttons box-shadow_menu"
        v-show="menu_open"
      >
        <button
          type="button"
          class="listbox-item"
          ref="editButton"
          @click="toggleToDoEdit"
        >
          Edit
        </button>
        <button type="button" class="listbox-item" @click="deleteToDo">
          Delete
        </button>
      </div>
    </div>
    <div v-show="menu_open" id="back-cover" @click="closeMenu"></div>
  </div>
  <div v-else>
    <to-do-edit
      :id="id"
      :label="label"
      @item-edited="itemEdited"
      @edit-cancelled="editCancelled"
    ></to-do-edit>
    <div v-show="menu_open" id="back-cover"></div>
  </div>
</template>
<script>
import ToDoEdit from "./ToDoEdit.vue";

export default {
  components: {
    ToDoEdit,
  },
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String },
    list: { required: true, type: String },
  },
  data() {
    return {
      isEditing: false,
      menu_open: false,
    };
  },
  computed: {
    isDone() {
      return this.done;
    },
  },
  methods: {
    deleteToDo() {
      return this.$axios
        .delete(`${this.$baseUrl}/api/notes/` + this.id, this.$config)
        .then(() => {
          this.menu_open = false;
          this.$emit("remove");
        })
        .catch((error) => console.log(error.response));
    },
    toggleToDoEdit() {
      this.isEditing = true;
    },
    itemEdited(newLabel) {
      this.$emit("item-edited", newLabel);
      this.isEditing = false;
      this.menu_open = false;
      this.focusOnEditButton();
    },
    changeCheckbox() {
      this.$axios
        .put(
          `${this.$baseUrl}/api/notes/` + this.id,
          { label: this.label, done: !this.done },
          this.$config
        )
        .then(() => {
          this.$emit("checkbox-changed");
        })
        .catch((error) => console.log(error.response));
    },
    editCancelled() {
      this.isEditing = false;
      this.menu_open = false;
      this.focusOnEditButton();
    },
    focusOnEditButton() {
      this.$nextTick(() => {
        const editButtonRef = this.$refs.editButton;
        editButtonRef.focus();
      });
    },
    openMenu() {
      this.menu_open = true;
    },
    closeMenu() {
      this.menu_open = false;
      this.isEditing = false;
    },
  },
};
</script>
