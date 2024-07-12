import { defineStore } from "pinia";

export const useTicketStore = defineStore ('ticket',{
    state: () => ({
        ticketData: '',
        isAdmissions:[],

        A:[],
        B:null,
        C:[],

        quantity:[],
        unitPrice:[],
        cart : [],
        
        ticketDisabled:[]
        
    }),
    actions:{
        setTicket(ticket){
            this.ticketData = ticket; 
        },
        setIsAdmissions(isAdmission) {
            this.isAdmissions = isAdmission;
        },
        setA(A){
            this.A = A;
        },
        setB(B){
            this.B = B;
        },
        setC(C){
            this.C = C;
        },
        setQuantity(index, quantity) {
            this.quantity[index] = quantity;
        },
        setUnitPrice(index,unitPrices) {
            this.unitPrice[index] = unitPrices;
        },
        addToCart(ticket, quantity){
            this.cart.push ({ticket, quantity}) 
            console.log(`Ajouter au panier: ${quantity} billets de type ${ticket.ticket_type_name}`)
        },
        clearCart(){
            this.cart = []
        },
        disableTicket(index){
            if(!this.ticketDisabled.includes(index)){
                this.ticketDisabled.push(index)
            }
        },
        enableTicket(index){
            const idx = this.ticketDisabled.indexOf(index)
            if (idx !== -1) {
                this.ticketDisabled.splice(idx, 1)
            }
        },
        resetQuantities(){
            this.quantity = this.quantity.map(() => 1)
        }
    },
    getters:{
        getTicket(state){
            return state.ticketData
        },
        getIsAdmissions(state){
            return state.isAdmissions
        },
        getA(state) {
            return state.A;
        },
        getB(state) {
            return state.B;
        },
        getC(state) {
            return state.C;
        },
        getQuantity(state) {
            return state.quantity
        },
        getCart(state){
            return state.cart
        },
        getUnitPrices(state){
            return state.unitPrice
        },
        isTicketDisabled: (state) => (index) => state.ticketDisabled.includes(index), 

    }
    
})
