// store/cartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [],
    // total: '',
  }),
  actions: {
    
    addItemToCart(item) {
      this.cartItems.push(item);
      this.calculateTotal;
    },
    clearCart(){
      this.cartItems = []
      // this.total = '';
    },
    /* calculateTotal() {
      this.total = this.cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    }, */

    
  },
  getters:{
    getCartItems() {
      return this.cartItems
    },
    /* getTotal() {
      return this.total;
    }, */
  }
});
