<template>
  <form @submit.prevent="onSubmit">
    <h2>
      <div for="new-list-input">
        Create a list
      </div>
    </h2>
    <input
      type="text"
      id="new-list-input"
      name="new-list"
      autocomplete="off"
      v-model.lazy.trim="name"
    />
    <button type="submit">
      Add
    </button>
  </form>
</template>
<script>
export default {
  methods: {
    onSubmit() {
      if(this.name === "") {
        return;
      }
      this.$emit('list-added', this.name);
      this.name = "";
    }
  },
  data() {
    return {
      name: ""
    };
  }
};
</script>
