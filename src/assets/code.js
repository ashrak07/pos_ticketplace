 //login
 
 <div>
<v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
  <div class="text-subtitle-1 text-medium-emphasis">Email</div>

  <v-text-field
    density="compact"
    placeholder="Email address"
    prepend-inner-icon="mdi-email-outline"
    variant="outlined"
    v-model="email"
  ></v-text-field>

  <div
    class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
  >
    Mot de passe

    <a
      class="text-caption text-decoration-none text-blue"
      href="#"
      rel="noopener noreferrer"
      target="_blank"
    >
      Forgot login password?</a
    >
  </div>

  <v-text-field
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    density="compact"
    placeholder="Enter your password"
    prepend-inner-icon="mdi-lock-outline"
    variant="outlined"
    v-model="password"
    @click:append-inner="visible = !visible"
  ></v-text-field>

  <v-card class="mb-12" color="surface-variant" variant="tonal">
    <v-card-text class="text-medium-emphasis text-caption"
      >Erreur au niveau de l'adresse e-mail ou du mot de passe
    </v-card-text>
  </v-card>

  <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>
    Commencer
  </v-btn>

  <v-card-text class="text-center">
    <a
      class="text-blue text-decoration-none"
      href="#"
      rel="noopener noreferrer"
      target="_blank"
    >
    </a>
  </v-card-text>
</v-card>
</div>

{/* script */}

import {accountService} from '../../Services/account.service';

export default {
 name:'Login',
 data(){
   return{
     user:{
       email:'',
       password:''
     }
   }
 },
 methods:{
   login(){
     accountService.login(this.user)
       .then(res => {
         accountService.saveToken(res.data.access_token)
         console.log(res.data);
           // this.$router.push('/pos')
       })
       .catch(err => {
          console.log(err);
       })
       
   }  
 } 
} 


// pos
<script>
import axios from "axios";
import { useUserStore } from "../../store/userStore";
import { useShopStore } from "../../store/shopStore";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const userStore = useUserStore();
    const shopStore = useShopStore();
    const id = userStore.getUserId;
    const token = userStore.getToken;

    const login = () => {
      const checkedShops = shopStore.getShop.filter((shop) => shop.checked); // Filtrer les magasins cochés
      const selectedShopIds = checkedShops.map((shop) => shop.id); // Mapper les IDs des magasins cochés
      // console.log("IDs des magasins sélectionnés:", selectedShopIds); // Afficher les IDs des magasins sélectionnés dans la console

      // Mettre à jour selectedShopIds dans le store
      shopStore.setSelectedShopIds(selectedShopIds);
      console.log("IDs des magasins sélectionnés:", selectedShopIds);

      const selectedIds = shopStore.getSelectedShopIds; //afficher les IDs depuis le store
      console.log("IDs des magasins sélectionnés depuis le store:", selectedIds);
    };

    // Fonction pour gérer le changement de checkbox
    const handleCheckboxChange = (shopId) => {
      const shopIndex = shopStore.getShop.findIndex((shop) => shop.id === shopId); // Trouver l'index du magasin dans shopStore.getShop par son ID
      shopStore.getShop[shopIndex].checked = !shopStore.getShop[shopIndex].checked; // Inverser l'état de la propriété `checked` du magasin trouvé
    };

    const fetchData = async () => {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/shops/users/1/2",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          user_id: id,
        }),
      };
      try {
        const response = await axios.request(config);
        console.log("voici data response:", response.data);

        if (response.data.data.length > 0) {
          shopStore.setShop(response.data.data);
          console.log("data in store", shopStore.getShop);
          console.log("id du shop:", shopStore.getShopId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    onMounted(fetchData);
    return {
      shopStore,
      handleCheckboxChange,
      login,
    };
  },
};
</script>

<template>
  <div class="container">
    
    <div v-if="shopStore.getShop.length">
      <div v-for="shop in shopStore.getShop" :key="shop.id">
        <div class="form shadow-sm p-3  mb-5 mt-5 container">
          <div class="d-flex">
            <div
              class="p-2 d-flex flex-row align-items-center font-y-bold mr-10"
              style="width: 350px"
            >
              <label for="'checkbox_' + shop.id" class="custom-checkbox">
                <input
                  type="checkbox"
                  :id="'checkbox_' + shop.id"
                  @change="handleCheckboxChange(shop.id)"
                />
                <span class="checkmark"></span>
                <span class="text"> {{ shop.name }} </span>
              </label>
            </div>

            <div class="p-2 d-flex flex-row align-items-center flex-fill font-content">
              <p>Gestion de ramassage de cash</p>
            </div>
            <div class="p-2 d-flex flex-row align-items-center flex-fill font-content">
              <p>Gestion des stocks</p>
            </div>
            <div class="p px-4 font-b-light flex-fill">
              <p class="my-1">{{ shop.address }}</p>
              <p class="my-1">{{ shop.phone_number }}</p>
              <p class="my-1">Ouverture du lundi au samedi</p>
              <p class="my-1">{{ shop.opening_hour }} à {{ shop.closing_hour }}</p>
              <p class="my-1">Shop ID: {{ shop.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    

    <div class="d-flex flex-row w-100 justify-content-end my-5">
      <button @click="login" type="submit" class="btn-blue p-2 w-25" style="color: white">
        Commencer
      </button>
    </div>
  </div>
</template>

<style>
.p {
  border-left: solid 1px rgb(235, 235, 235);
}

.form:hover{
  border:  2px solid rgb(237, 185, 37, .3); 
}
.form {
  background-color: #ffffff;
  border-radius: 5px;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Créer un conteneur pour le checkmark */
.custom-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

/* Style pour le checkmark */
.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #ddd;
}

/* Quand l'input est coché, changer le background */
.custom-checkbox input:checked + .checkmark {
  background-color: #0a5da6;
  border: 1px solid #0a5da6;
}

/* Créer le symbole de checkmark */
.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Montrer le symbole de checkmark quand l'input est coché */
.custom-checkbox input:checked + .checkmark:after {
  display: block;
}

/* Style pour le symbole de checkmark */
.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.custom-checkbox .text {
  word-wrap: break-word;
  word-break: break-word;
  flex: 1;
}
</style>
