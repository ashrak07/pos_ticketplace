<script setup lang="ts">
import Header from "../components/selectionPOS/Header.vue";
import Pos from "../components/selectionPOS/Pos.vue";
</script>

<template>
  <div class="bg">
    <Header />
    <Pos />
  </div>
</template>

<style scoped>
.bg {
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
}
</style>
