<template>
  <div>
    <div v-if="C && C.length > 0" class="">
      <div class="card card-col rounded-3 m-3 px-4">
        <div class="py-3">
          <h1 class="my-2 font-title-blue">AJOUTER DES TICKETS SANS RÉSERVATION</h1>
        </div>
        <div>
          <div v-for="(ticket, index) in C" :key="index" class="ticket-item">
            <div class="border-top py-3">
              <p class="font-title-2">Type de billet: {{ ticket.ticket_type_name }}</p>
              <div class=" ">
                <p class="w-50 font-content">Prix Unitaire: {{ ticket.price_unit }}</p>
                <div class="d-flex align-center container">
                  <v-col cols="6" class="mx-2">
                    <v-number-input
                      v-model="quantities[index]"
                      :max="10"
                      :min="1"
                      :reverse="false"
                      controlVariant="split"
                      label=""
                      :hideInput="false"
                      :inset="false"
                      variant="solo"
                      :disabled="isTicketDisabled(index)"
                    >
                    </v-number-input>
                  </v-col>
                  <v-btn
                    @click="ajouter(ticket, index)"
                    color="#0a5da6"
                    class="text-white font-helvetica"
                    :disabled="isTicketDisabled(index)"
                    >AJOUTER
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useTicketStore } from "../../../store/ticketStore";
import { useCartStore } from "../../../store/cartStore";

export default {
  setup() {
    const cartStore = useCartStore();
    const ticketStore = useTicketStore();
    const C = computed(() => ticketStore.getC);
    const quantities = computed(() => ticketStore.getQuantity);
    const isTicketDisabled = (index) => ticketStore.isTicketDisabled(index);

    const ajouter = (ticket, index) => {
      const quantity = quantities.value[index];
      const unitPrice = ticket.price_unit;
      const name = ticket.ticket_type_name;
      const id = ticket.ticket_type_id;

      console.log(`Quantity for ticket at index ${index}:`, quantity);
      console.log(`Unit Price for ticket at index ${index}:`, unitPrice);
      console.log(`name for ticket at index ${index}:`, name);
      console.log(`id for ticket at index ${index}:`, id);

      const ticketData = {
        quantity: quantity,
        unitPrice: unitPrice,
        name: name,
        id: id,
      };
      cartStore.addItemToCart(ticketData);
      ticketStore.disableTicket(index);
      ticketStore.resetQuantities();
    };

    return {
      C,
      quantities,
      ajouter,
      isTicketDisabled,
    };
  },
};
</script>

<style scoped>
form {
  margin: 20px;
}

.custom-select-wrapper {
  position: relative;
  display: inline-block;
  width: 200px;
}

.custom-select {
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  appearance: none; /* Supprime l'apparence par défaut du navigateur */
  -webkit-appearance: none; /* Safari et Chrome */
  -moz-appearance: none; /* Firefox */
  cursor: pointer;
  outline: none;
}

/* Ajouter une flèche personnalisée */
.custom-select-wrapper::after {
  content: "\25BC"; /* Code Unicode pour une flèche vers le bas */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  color: #aaa;
}
</style>
