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
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <option value="" selected>Unlisted</option>
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
        <button type="submit" class="btn btn-primary">Save</button>
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
  border: medium none;
  margin-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 16px;
  outline: none;
  -webkit-appearance: none;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  line-height: 1;
  height: 54px;
  box-sizing: inherit;
}
.input-lg:focus {
  box-shadow: inset 0px 0px 0px 3px #000000;
}
.input-sm {
  width: 50% !important;
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
  width: 80px;
  height: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  outline: none;
}
.btn-primary {
  background: black;
  color: white;
  border: none;
  border-radius: 10px;
  width: 60px;
  height: 40px;
  transition: transform 0.1s ease-in-out;
  cursor: pointer;
  outline: none;
}
.btn-primary:hover,
.btn-primary:focus {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  box-shadow: 0 4px 11px -2px rgba(37, 44, 97, 0.15),
    0 1px 3px 0 rgba(93, 100, 148, 0.2);
}
#back-cover {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
}
</style>
