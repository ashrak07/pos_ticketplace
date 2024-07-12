<template>
  <div>
    <Header />
    <div class="g1">
      <HeaderEvent class="head" />
      <cartList class="cart" />
      <ListEvenement class="list" />
      <Place class="b8 place" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/selectionPOS/Header.vue";
import HeaderEvent from "../components/selectionEvenement/HeaderEvent.vue";
import ListEvenement from "../components/selectionEvenement/ListEvenement.vue";
import cartList from "../components/selectionEvenement/Cart/../carList.vue";
import Place from "../components/selectionEvenement/Place/Place.vue";
</script>

<style setup lang="scss" scoped>
.g1 {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;
}

.head {
  grid-column: 1 / span 2;
  grid-row: 1;
  border-bottom: var(--border-2);
}

.cart {
  grid-column: 3;
  grid-row: 1 / span 2;
  overflow: auto;
  border-left: var(--border-2);
}

.list {
  grid-column: 1;
  grid-row: 2;
  border-right: var(--border-2);
  overflow: auto;
}

.place {
  grid-column: 2;
  grid-row: 2;
  height: auto;
  overflow: auto;
}
</style>
