<template>
  <div>
    <div>
      <input
        :id="id"
        ref="labelInput"
        class="z-p input-lg"
        type="text"
        autocomplete="off"
        @keyup.enter="onSubmit"
        @keyup.esc="onCancel"
        v-model.lazy.trim="newLabel"
        maxlength="40"
      />
    </div>
    <div class="listbox-items menu-buttons box-shadow_menu">
      <button class="listbox-item" @click="onCancel">Cancel</button>
      <button class="listbox-item" @click="onSubmit">Save</button>
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
          });
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
