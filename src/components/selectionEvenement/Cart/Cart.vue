<template>
  <div class="col">
    <div class="card card-col rounded-3 shadow-sm m-3 px-4">
      <p class="my-0 font-title-blue border-bottom py-3">VOTRE PANIER</p>
      <v-table height="auto" fixed-header>
        <thead>
          <tr>
            <th class="text-left">Type</th>
            <th class="text-left">Quantité</th>
            <th class="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unitPrice * item.quantity }}</td>
          </tr>
          <tr>
            <td colspan="2" class="font-weight-bold text-right">Total</td>
            <td class="font-weight-bold">
              <!-- {{ getTotal }} -->
              {{ calculateTotal }}
            </td>
          </tr>
        </tbody>
      </v-table>

      <div class="col text-center my-3">
        <v-btn
          variant="outlined"
          class="font-helvetica"
          style="color: #074377; border-color: #074377"
          @click="clearCart"
          >Vider le panier
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useCartStore } from "../../../store/cartStore";
import { useTicketStore } from "../../../store/ticketStore";

export default {
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cartItems);
    const ticketStore = useTicketStore();

    const total = ref(0);
    const calculateTotal = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0);
    });

    watchEffect(() => {
      total.value = calculateTotal.value;
      localStorage.setItem("total", total.value);
    });

    const clearCart = () => {
      cartStore.clearCart();
      reenableAllTickets();
    };

    const reenableAllTickets = () => {
      ticketStore.ticketDisabled.forEach((index) => {
        ticketStore.enableTicket(index);
      });
      ticketStore.ticketDisabled = [];
    };

    const isDisabled = computed(() => {
      return (index) => ticketStore.isTicketDisabled(index);
    });

    return {
      cartItems,
      clearCart,
      calculateTotal,
    };
  },
};
</script>
