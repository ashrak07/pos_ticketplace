import LoginPage from '@/pages/LoginPage.vue'
import SelectionPOS from '@/pages/SelectionPOS.vue'
import SelectionEvenement from '@/pages/SelectionEvenement.vue'
import SansReservation from '@/components/selectionEvenement/Place/SansReservation.vue'
import Reservation from '@/components/selectionEvenement/Place/Reservation.vue'
import seat from "../components/selectionEvenement/Place/seat.vue"
import Confirmed from '@/pages/Confirmed.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
 
    {
      name:'login',
      path: "/login",
      component: LoginPage
    },

    {
      name: 'pos',
      path:"/pos",
      component: SelectionPOS
    },

    {
      name:'event',
      path:"/event",
      component: SelectionEvenement,
      children:[
        { 
          path:'/event/sansresa', 
          name: 'sansresa', 
          component: SansReservation,
           
        },
        { 
          path: '/event/resa', 
          name:'resa', 
          component: Reservation,
          children:[
            {
            path:'/event/resa/seat',
            name:'seat',
            component: seat
            }
          ] 
        }  
      ]
    },
    {
      name:'confirmed',
      path:"/confirmed",
      component: Confirmed
    },
    
  ]
})

export default router
