<template>
  <div>
    <div class="d-flex flex-row space-between mt-40">
      <div class="col">
        <button class="btn-1 font-1 w-50 p-2">
          <i class="bi bi-backspace-fill"></i>
          Fermer et revenir sur la page de vente
        </button>
      </div>
      <div class="space-between d-flex w-50 flex-row align-items-center">
        <div class="col text-center">
          <button class="btn-1-outline font-btn w-100 p-2" @click="showModal = true">
            <i class="bi bi-printer-fill"></i>
            Imprimer les billets
          </button>
        </div>
        <div class="col text-center mx-5">
          <button class="btn-1-outline font-btn w-100 p-2" @click="createTicket">
            <i class="bi bi-printer-fill"></i>
            Imprimer reçus
          </button>
        </div>
        <div class="col text-center">
          <button class="btn-1 font-1 w-100 p-2">
            <i class="bi bi-envelope-fill"></i>
            Envoyer par email
          </button>
        </div>
      </div>
    </div>
    <Modal :isVisible="showModal" @close="showModal = false">
      <div class="font-title-3 my-2">Type de papier</div>
      <div class="d-flex flex-column font-med flex-start">
        <button class="row btn-none">Ticket bleu horizontal 80X192</button>
        <button class="row btn-none">Ticket blanc horizontal 80X152</button>
        <button class="row btn-none">Ticket blanc vertical avec 2 QR codes 80x152</button>
        <button class="row btn-none">Ticket bleu vertical avec 2 QR codes 80x192</button>
        <button class="row btn-none">
          Ticket blanc horizontal avec 2 QR codes 80x152
        </button>
        <button class="row btn-none">
          Ticket bleu horizontal avec 2 QR codes 80x192
        </button>
      </div>
    </Modal>
  </div>
</template>
npm

<script>
import { ref } from "vue";
import Modal from "./Modal.vue";
import axios from "axios";

export default {
  components: {
    Modal,
  },
  setup() {
    const showModal = ref(false);
    const orderId = localStorage.getItem("order_id");
    console.log("order id:", orderId);
    const token = localStorage.getItem("token");
    const createTicket = async () => {
      try {
        const ticketResponse = await fetch("http://localhost:3000/tickets/create", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: JSON.stringify({
            order_id: orderId,
          }),
        });
        if (ticketResponse.ok) {
          const ticketData = await ticketResponse.json();
          console.log("ticket created successfully", ticketData);
        } else {
          console.log("Failed to create order:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating ticket:", error);
      }
    };
    return {
      showModal,
      createTicket,
    };
  },
};
</script>

<style scoped></style>
