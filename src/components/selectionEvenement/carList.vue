<template>
  <div>
    <cartSansResa />
    <Cart />
    <promoCode />
    <orderSummary />
    <information />
    <Print />
    <div class="d-flex justify-center">
      <v-btn @click="createOrder" color="#0a5da6" class="text-white mb-5 font-helvetica"
        >VALIDER ACHAT
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import cartSansResa from "../../components/selectionEvenement/Cart/cartSansResa.vue";
import Cart from "./Cart/Cart.vue";
import promoCode from "./Cart/promoCode.vue";
import orderSummaryVue from "./Cart/orderSummary.vue";
import orderSummary from "./Cart/orderSummary.vue";
import information from "./Cart/information.vue";
import Print from "./Cart/Print.vue";
import { computed } from "vue";
import { useEventStore } from "../../store/eventStore";
import { useCartStore } from "../../store/cartStore";
import { useUserStore } from "../../store/userStore";
import { useOrderStore } from "../../store/orderStore";
import { useTicketStore } from "../../store/ticketStore";
import router from "../../router/router";

const eventStore = useEventStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const orderStore = useOrderStore();
const ticketStore = useTicketStore();

const createUid = computed(() => eventStore.getCreateUid);
const writeUid = computed(() => eventStore.getWriteUid);
const currencyId = computed(() => eventStore.getCurrencyId);
const partnerId = computed(() => eventStore.getPartnerId);
const _state = computed(() => eventStore.getState);
localStorage.setItem("write_Uid", writeUid.value);
localStorage.setItem("create_uid", createUid.value);

const reenableAllTickets = () => {
  ticketStore.ticketDisabled.forEach((index) => {
    ticketStore.enableTicket(index);
  });
  ticketStore.ticketDisabled = [];
};

const createOrder = async () => {
  const total = localStorage.getItem("total");
  const token = localStorage.getItem("token");

  const shopId = localStorage.getItem("shop_id");
  const buyerName = userStore.getUserName;
  console.log("total depuis local storage:", total);
  console.log("write UID:", writeUid.value);

  try {
    // créer les orders
    const orderData = {
      shop_id: shopId,
      partner_id: partnerId.value,
      state: _state.value,
      create_uid: createUid.value,
      write_uid: writeUid.value,
      amount_total: total,
      buyer_name: buyerName,
      currency_id: currencyId.value,
      source: "POS",
    };
    const orderResponse = await fetch("http://localhost:3000/orders/create", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log("Order created successfully", orderData);

      orderStore.setOrderResponse(orderData.data);
      console.log("order response depuis le store:", orderStore.getOrderResponse());

      const orderId = orderStore.getOrderId();
      const orderName = orderStore.getOrderName();
      const orderDate = orderStore.getOrderDate();
      localStorage.setItem("order_name", orderName);
      localStorage.setItem("order_date", orderDate);
      localStorage.setItem("order_id", orderId);
      console.log("Order ID:", orderId);

      const event_Id = localStorage.getItem("event_id");
      const place = localStorage.getItem("place_name");
      const create_Uid = localStorage.getItem("create_uid");
      const write_Uid = localStorage.getItem("write_Uid");

      //créer les orderLines
      const items = cartStore.cartItems;
      for (const item of items) {
        const orderLineData = {
          order_id: orderId,
          ticket_type_id: item.id,
          qty: item.quantity,
          event_id: event_Id,
          price_unit: item.unitPrice,
          create_uid: create_Uid,
          write_uid: write_Uid,
          place: place,
        };
        console.log("Order Line Data:", orderLineData);

        const orderLineResponse = await fetch("http://localhost:3000/orderLines/create", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderLineData),
        });

        if (orderLineResponse.ok) {
          const orderLineData = await orderLineResponse.json();
          console.log("order line created successfully", orderLineData);
        } else {
          console.log("Failed to create orderline:", response.statusText);
        }
      }
      router.push({ name: "confirmed" });
      // cartStore.clearCart();
      reenableAllTickets();
    } else {
      console.log("Failed to create order:", response.statusText);
    }
  } catch (error) {
    console.log("Error creating order:", error);
  }
};
</script>

<style setup scoped lang="scss">
.btn-1:hover {
  background-color: #074377;
}

.card-col {
  background-color: rgb(255, 255, 255);
}
</style>
