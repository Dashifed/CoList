<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header" />
        </div>

        <div class="modal__body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
  },
};
</script>


<style scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.modal__backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.modal__dialog {
  background-color: #ffffff;
  position: relative;
  width: 420px;
  max-height: 90vh;
  margin: 30vw auto;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  z-index: 2;
  align-self: self-end;
}
@media screen and (max-width: 960px) {
  .modal__dialog {
    width: 100vw;
    transform: translateY(0px);
    border-radius: 20px 20px 0px 0px;
    margin: 0;
  }
}
.modal__header {
  padding: 0px 20px 0px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.modal__body {
  padding: 0.25rem 0.25rem 0.5rem 0.25rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>