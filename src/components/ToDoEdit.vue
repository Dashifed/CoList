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
      <button class="delete-btn" @click="onCancel">Cancel</button>
      <button class="delete-btn" @click="onSubmit">Save</button>
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
        this.$axios
          .put(
            `${this.$baseUrl}/api/notes/` + this.id,
            { label: this.newLabel, done: this.done },
            this.$config
          )
          .then(() => {
            this.$emit("item-edited", this.newLabel);
          })
          .catch((error) => console.log(error.response));
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
