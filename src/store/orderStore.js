import { defineStore } from "pinia";

export const useOrderStore = defineStore({
    id: 'orders',
    state: () => ({
      orderResponse: null,
    }),
    actions:{
        setOrderResponse(response){
            this.orderResponse = response
        },
        getOrderResponse() {
            return this.orderResponse;
        },
        getOrderId() {
            return this.orderResponse ? this.orderResponse.id : null;
        },
        getOrderName(){
            return this.orderResponse ? this.orderResponse.name :null
        },
        getOrderDate(){
            return this.orderResponse ? this.orderResponse.date_order :null
        },
    },
   
})