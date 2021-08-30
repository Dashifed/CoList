<template>
  <div>
    <div>
      <input
        :id="id"
        ref="labelInput"
        type="text"
        autocomplete="off"
        @keyup.enter="onSubmit"
        @keyup.esc="onCancel"
        v-model.lazy.trim="newLabel"
      />
    </div>
    <div>
      <button @click="onCancel">Cancel</button>
      <button @click="onSubmit">Save</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    id: { required: true, type: String },
    done: { default: false, type: Boolean },
  },
  data() {
    return {
      newLabel: this.label,
    };
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit("item-edited", this.newLabel);
        this.$axios.put(
          "http://localhost:3001/api/notes/" + this.id,
          { label: this.newLabel, done: this.done },
          this.$config
        );
      }
    },
    onCancel() {
      this.$emit("edit-cancelled");
    },
  },
  mounted() {
    const labelInputRef = this.$refs.labelInput;
    labelInputRef.focus();
  },
};
</script>
