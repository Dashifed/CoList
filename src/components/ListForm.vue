<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      name="new-list"
      autocomplete="off"
      v-model.lazy.trim="name"
      class="input-lg input-sm"
      maxlength="15"
      placeholder="Type to create a new list"
      @focus="inputFocus = true"
    />
    <button type="submit" class="btn-primary" v-show="inputFocus">Add</button>
  </form>
</template>
<script>
export default {
  methods: {
    onSubmit() {
      if (this.name === "") {
        return;
      }
      this.$emit("list-added", this.name);
      this.name = "";
    },
  },
  data() {
    return {
      name: "",
      inputFocus: false,
    };
  },
};
</script>
