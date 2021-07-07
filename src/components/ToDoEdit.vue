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
