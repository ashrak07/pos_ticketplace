<!-- Modal.vue -->
<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <button class="modal-close" @click="closeModal"><i class="bi bi-x-circle-fill"></i></button>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script >
    export default {
        name: 'Modal',
        props: {
            isVisible: {
            type: Boolean,
            required: true
            }
        },
        emits: ['close'],
        methods: {
            closeModal() {
            this.$emit('close')
            }
        }
    }
  </script>
  
  <style scoped>

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-container {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    position: relative;
  }
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  
  