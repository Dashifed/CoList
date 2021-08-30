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
      <label :for="id">
        {{ label }}
      </label>
    </div>
    <div>
      <span class="material-icons md-24 material-icons-outlined" @click="openMenu">more_horiz</span>
      <div class="menu-buttons">
        <button type="button" class="delete-btn" v-show="menu_open" ref="editButton" @click="toggleToDoEdit">Edit</button>
        <button type="button" class="delete-btn" v-show="menu_open" @click="deleteToDo">Delete</button>
      </div>
    </div>
    <div v-show="menu_open" id="back-cover" @click="menu_open = !menu_open"></div>
  </div>
  <to-do-edit
    v-else
    :id="id"
    :label="label"
    @item-edited="itemEdited"
    @edit-cancelled="editCancelled"
  ></to-do-edit>
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
      menu_open: false
    };
  },
  computed: {
    isDone() {
      return this.done;
    },
  },
  methods: {
    deleteToDo() {
      this.$emit("remove");
      this.$axios.delete(
        "http://localhost:3001/api/notes/" + this.id,
        this.$config
      );
      this.menu_open = false
    },
    toggleToDoEdit() {
      this.isEditing = true;
      this.menu_open = false;
    },
    itemEdited(newLabel) {
      this.$emit("item-edited", newLabel);
      this.isEditing = false;
      this.focusOnEditButton();
    },
    changeCheckbox() {
      this.$emit("checkbox-changed");
      this.$axios.put(
        "http://localhost:3001/api/notes/" + this.id,
        { label: this.label, done: !this.done },
        this.$config
      );
    },
    editCancelled() {
      this.isEditing = false;
      this.focusOnEditButton();
    },
    focusOnEditButton() {
      this.$nextTick(() => {
        const editButtonRef = this.$refs.editButton;
        editButtonRef.focus();
      });
    },
    openMenu() {
      this.menu_open = !this.menu_open
    }
  },
};
</script>
