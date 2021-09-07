<template>
  <form @submit.prevent="onSubmit" class="main-form">
    <div class="form-holder">
      <input
        type="text"
        id="new-todo-input"
        name="new-todo"
        autocomplete="off"
        v-model.lazy.trim="label"
        maxlength="40"
        class="input-lg"
        @keyup.enter="onSubmit"
        @focus="inputFocus = true"
        placeholder="What's on your mind?"
      />
      <div class="bottom-toolbar" v-show="inputFocus">
        <div v-if="isNotListsView()">
          <select v-model="selected" class="lists-holder list-toggle">
            expand_more
            <option value="" selected>List</option>
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
        <button type="submit" class="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      if (this.label === "") {
        return;
      }
      this.$emit("todo-added", { label: this.label, list: this.selected });
      this.label = "";
      this.inputFocus = false;
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
      inputFocus: false,
    };
  },
  created() {
    this.$axios
      .get(`${this.$baseUrl}/api/lists`, this.$config)
      .then((response) => {
        this.Lists = response.data;
      });
  },
};
</script>
<style>
.main-form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-holder {
  display: grid;
}
.bottom-toolbar {
  display: flex;
  position: relative;
  align-items: stretch;
  justify-content: space-between;
}
.input-lg,
.input-lg:focus {
  width: 50vw;
  height: 40px;
  border: none;
  border-bottom: 2px solid #ccc;
  margin-bottom: 10px;
  outline: none;
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
  border-radius: 10px;
  border: 2px solid black;
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
.btn-primary {
  background: black;
  color: white;
  border: none;
  border-radius: 10px;
  width: 60px;
  height: 40px;
  opacity: 0.9;
}
.btn-primary:hover {
  opacity: 1;
}
</style>
