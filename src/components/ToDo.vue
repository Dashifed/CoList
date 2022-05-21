<template>
  <div v-if="!isEditing">
    <div class="custom-checkbox">
      <input
        type="checkbox"
        class="form-control"
        :id="id"
        :checked="isDone"
        @change="changeCheckbox"
      />
      <div class="item-labels">
        <label class="todo-label" :for="id">
          {{ label }}
        </label>
      </div>
    </div>
    <div class="self-center">
      <div class="icon-holder">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="openMenu"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
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
        });
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
        });
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
