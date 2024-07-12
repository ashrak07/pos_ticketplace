import { defineStore } from "pinia";

export const useEventStore = defineStore ('eventStore', {
    state: () => ({
        events : [],
        places : [],
    }),
    actions: {
        setEvent(events){
            this.events = events
        },
        setPlace(places){
            this.places = places
        },
    },
    getters: {
        getEvent(state) {
            return state.events
        },
        getPlace(state) {
            return state.places 
        },
        getCreateUid(state) {
            return state.events.length > 0 ? state.events[0].create_uid : null
        },
        getWriteUid(state) {
            return state.events.length > 0 ? state.events[0].write_uid : null
        },
        getCurrencyId(state) {
            return state.events.length > 0 ? state.events[0].currency_id : null
        },
        getPartnerId(state) {
            return state.events.length > 0 ? state.events[0].partner_id : null
        },
        getState(state) {
            return state.events.length > 0 ? state.events[0].state : null
        },
        
    }
})