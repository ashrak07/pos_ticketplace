<template>
    <div class="b8" style="min-height:100vh">
        <div>
        <Header/>
        </div>
        <div class="container">
        <Buttons/>
        <Billet/>
        <Table/>
        </div>
    </div>
    
</template>

<script setup>
    import Table from '../components/Confirmed/Table.vue'
    import Header from '../components/selectionPOS/Header.vue'
    import Billet from '../components/Confirmed/Billet.vue'
    import Buttons from '../components/Confirmed/Buttons.vue'
</script> 

<style scoped>


</style>