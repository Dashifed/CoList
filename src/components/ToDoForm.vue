<template>
  <form @submit.prevent="onSubmit" class="main-form">
    <div v-if="isNotListsView()">
      <select
        v-model="selected"
        class="lists-holder list-toggle"
      >
        expand_more
        <option
          class="list-item"
          v-for="list in Lists"
          :key="list.id"
          :name="list.name"
          :id="list.id"
          :value="list.name"
        >
          {{ list.name }}
        </option>
      </select>
    </div>
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="label"
      maxlength="40"
      class="input__lg"
    />
    <button type="submit" class="btn btn__primary btn__lg">
      Save
    </button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    onSubmit() {
      if (this.label === "") {
        return;
      }
      this.$emit("todo-added", { label: this.label, list: this.selected });
      this.label = "";
    },
    isNotListsView() {
      return this.$router.history.current["path"] !== "/lists";
    },
  },
  data() {
    return {
      label: "",
      selected: "",
      Lists: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3001/api/lists").then(response => {
      this.Lists = response.data
    })
  }
};
</script>
<style>
.main-form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input__lg {
  width: 50vw;
  height: 40px;
}
.list-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
  min-width: 30vw;
  max-width: 40vw;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
.list-item:hover {
  background-color: rgb(248, 248, 249);
}
.lists-holder {
  align-items: center;
  justify-content: center;
  text-align: center;
  display: grid;
  max-height: 15vh;
  border-radius: 5px;
  border: 1px solid black;
  z-index: 100;
  background: #fff;
  overflow-y: auto;
}
.list-toggle {
  display: flex;
  width: 60px;
  height: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
</style>
