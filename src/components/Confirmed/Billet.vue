<template>
  <div
    class="border border-light shadow-sm d-flex flex-row space-between mt-40 container py-3"
    style="background-color: white"
  >
    <div class="py-5">
      <img src="/src/assets/images/ticketplace.png" alt="" />
    </div>
    <div class="" style="width: 300px">
      <div class="">
        <h3 class="text font-title-2">{{ name }}</h3>
        <div>
          <div class="my-4">
            <span class="d-flex">
              <i class="bi bi-geo-alt-fill mr-10"></i>
              <p class="text font-med">{{ place }}</p>
            </span>
            <span class="d-flex flex-row">
              <i class="bi bi-calendar-fill mr-10"></i>
              <p class="text font-med">{{ date }}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 300px">
      <h3 class="font-title-2">Résumé de la commande</h3>
      <div class="my-4">
        <h5 class="font-small">Numéro commande:</h5>
        <h4 class="text font-med">{{ orderName }}</h4>
        <h5 class="font-small">Date de rservation:</h5>
        <h4 class="text font-med">{{ orderDate }}</h4>
      </div>
    </div>
    <div style="width: 300px">
      <h3 class="font-small">Nom de l'acheteur:</h3>
      <h5 class="text font-med">{{ shop }}</h5>
      <h3 class="font-small">Montant:</h3>
      <h5 class="font-med">{{ total }} MGA</h5>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "../../store/orderStore";
export default {
  setup() {
    const orderStore = useOrderStore();
    const name = localStorage.getItem("event_name");
    const date = localStorage.getItem("event_date");
    const place = localStorage.getItem("place_name");
    const shop = localStorage.getItem("shop_name");
    const total = localStorage.getItem("total");
    const orderName = localStorage.getItem("order_name");
    const orderDate = localStorage.getItem("order_date");

    return {
      name,
      date,
      place,
      shop,
      total,
      orderName,
      orderDate,
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

.text {
  word-wrap: break-word;
  word-break: break-word;
  flex: 1;
}
</style>
