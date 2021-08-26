<template>
  <div v-if="!isEditing" ref="editButton" @click="toggleToDoEdit">
    <div class="custom-checkbox">
      <input
        type="checkbox"
        class="checkbox"
        :id="id"
        :checked="isDone"
        @change="changeCheckbox"
      />
    </div>
    <label :for="id">
      {{ label }}
      <button type="button" @click="deleteToDo">Delete</button>
    </label>
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
import axios from "axios";

export default {
  components: {
    ToDoEdit,
  },
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String },
    list: {required: true, type: String},
  },
  data() {
    return {
      isEditing: false,
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
      axios.delete("http://localhost:3001/api/notes/" + this.id);
    },
    toggleToDoEdit() {
      this.isEditing = true;
    },
    itemEdited(newLabel) {
      this.$emit("item-edited", newLabel);
      this.isEditing = false;
      this.focusOnEditButton();
    },
    changeCheckbox() {
      this.$emit("checkbox-changed")
      axios.put("http://localhost:3001/api/notes/" + this.id, { label: this.label, done: !this.done })
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
  },
};
</script>
