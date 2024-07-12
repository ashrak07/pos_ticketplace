<template>
  <div>
    <div v-if="B && B.length > 0" class="">
      <div class="card card-col rounded-3 m-3 px-5">
        <div class="py-3">
          <h1 class="my-2 font-title-blue">RESERVATION</h1>
        </div>
        <div>
          <div v-for="(ticket, index) in B" :key="index" class="ticket-item">
            <div class="border-top py-3">
              <p class="font-title-2">Type de billet: {{ ticket.ticket_type_name }}</p>
              <div class="d-flex align-center justify-space-between">
                <p class="w-50 font-content">Prix Unitaire: {{ ticket.price_unit }}</p>
                <div class="container d-flex flex-end align-center">
                  <v-btn
                    color="#0a5da6"
                    class="text-white font-helvetica"
                    @click="showSeat()"
                    >Voir le plan de salle
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script>
import { computed, onMounted, ref } from "vue";
import seat from "../Place/seat.vue";
import { useTicketStore } from "../../../store/ticketStore";
import router from "../../../router/router";

export default {
  setup() {
    const ticketStore = useTicketStore();
    const B = computed(() => ticketStore.getB);

    const showSeat = () => {
      router.push({ name: "seat" });
    };

    return {
      B,
      showSeat,
    };
  },
};
</script>
