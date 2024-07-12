import { defineStore } from "pinia";

export const useShopStore = defineStore('shop',{
    state: () => ({
        shops:[],
        shopIdSelected:''
        
    }),
    
    actions: {
        setShop(shopDataArray){
            this.shops = shopDataArray   
        },
        setShopId(shopId){
            this.shopIdSelected = shopId
        },
        clearShop() {
            this.shops = []   
        },
        clearShopId(){
            this.shopIdSelected = ''
        }    
    },
    getters: {
        getShop:(state) => state.shops,
        getShopId: (state) => state.shopIdSelected
        
    }, 
})