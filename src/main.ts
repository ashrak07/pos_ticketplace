
//Components
import App from './App.vue'
import { createApp } from 'vue'

//Pinia
import {createPinia} from 'pinia'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import '@mdi/font/css/materialdesignicons.css'; 

import { SeatsioSeatingChart } from "@seatsio/seatsio-vue";


//Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Router
import router from './router/router'
 

const vuetify = createVuetify({
  components: {
    ...components,
    VNumberInput, 
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});
  

  const app = createApp(App)

  app.component('SeatsioSeatingChart', SeatsioSeatingChart);


  app.use(router)
    .use(vuetify)
    .use(createPinia())
    .mount('#app')





