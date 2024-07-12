
import { defineStore } from 'pinia';

export const useActivationStore = defineStore('activationStore', {
  state: () => ({
    inputsDisabled: false,
  }),
  actions: {
    disableInputs() {
      this.inputsDisabled = true;
    },
    enableInputs() {
      this.inputsDisabled = false;
    },
  },
});
