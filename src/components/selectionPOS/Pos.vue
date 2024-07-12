<script>
import router from "../../router/router";
import axios from "axios";
import { useUserStore } from "../../store/userStore";
import { useShopStore } from "../../store/shopStore";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const userStore = useUserStore();
    const shopStore = useShopStore();
    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const handleShopClick = (shopId, shopName, createUId) => {
      console.log("ID du magasin cliqué:", shopId);
      console.log("Nom du magasin cliqué:", shopName);
      console.log("uid magasin cliqué:", createUId);

      localStorage.setItem("shop_id", shopId);
      localStorage.setItem("shop_name", shopName);
      localStorage.setItem("uid", createUId);
      router.push("/event");
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(fetchData);

    return {
      shopStore,
      handleShopClick,
    };
  },
};
</script>

<template>
  <div class="container">
    <div v-if="shopStore.getShop.length">
      <div v-for="shop in shopStore.getShop" :key="shop.id">
        <div
          @click="handleShopClick(shop.id, shop.name, shop.creator_uid)"
          class="container form shadow-sm p-3 m-5"
        >
          <div class="d-flex">
            <div
              class="p-2 d-flex flex-row align-items-center font-y-bold mr-10"
              style="width: 350px"
            >
              <span class="text fs-4"> {{ shop.name }} </span>
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
  </div>
</template>

<style>
.p {
  border-left: solid 1px rgb(235, 235, 235);
}

.form:hover {
  border: 2px solid rgb(237, 185, 37, 0.3);
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
