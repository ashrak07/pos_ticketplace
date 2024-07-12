<script>
import axios from "../../Axios/axios";
import { useUserStore } from "../../store/userStore";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("users/login", {
          email: this.email,
          password: this.password,
        });
        if (response.data) {
          console.log("voici user response:", response.data);
          console.log("voici user name:", response.data.name);
          console.log("voici user id:", response.data.id);

          const userStore = useUserStore();
          userStore.setUser(response.data);

          this.$router.push("/pos");
          this.errorMessage = "";
        } else {
          this.errorMessage = "Erreur lors de la connexion. Veuillez Réessayer!";
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        this.errorMessage = "Entrer un email ou un mot de passe valide";
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="round">
      <img src="/src/assets/images/ticketplace.png" alt="" />
    </div>
    <div class="lg">
      <div class="login">
        <div class="d-flex flex-column align-items-center">
          <div
            class="d-flex flex-row justify-content-center align-items-center w-50 my-5"
          >
            <h5 class="font-1-bleu font-bolder">PORTAIL POINT DE VENTE TICKETPLACE</h5>
          </div>
          <div class="w-50 my-2">
            <h6 class="font-bold">Adresse électronique*</h6>
            <input v-model="email" class="w-100 form-control" type="text" />
          </div>
          <div class="w-50 my-2">
            <h6 class="font-bold">Mot de passe*</h6>
            <input v-model="password" class="w-100 form-control" type="text" />
          </div>
          <div class="w-50 d-flex flex-row space-between my-2">
            <div class="d-flex flex-row">
              <input type="checkbox" class="c-w" />
              <label class="font-content">Se souvenir de moi</label>
            </div>
            <a class="" href="#">Mot de passe oublié?</a>
          </div>
          <div
            v-if="errorMessage"
            class="d-flex flex-row justify-content-center align-content-center my-2"
          >
            <span class="error font"> {{ errorMessage }} </span>
          </div>

          <div class="d-flex flex-row w-50 justify-content-center my-5">
            <button
              @click="login"
              type="submit"
              class="btn-blue p-2 w-50"
              style="color: white"
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
      <div class="rightside">
        <div class="overlay"></div>
      </div>
      <div class="foot d-flex flex-row justify-content-center align-items-center">
        <p class="">
          En cliquant sur « Commencer », j'accepte les Conditions Générales d'Utilisation
          et j'ai lu la Politique de Confidentialité de Ticketplace.
        </p>
      </div>
    </div>
  </div>
</template>

<style setup scoped lang="scss">
.label {
  font-family: Helvetica, sans-serif;
}

/* .wrap-login {
  margin-top: 25%;
} */

.lg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 50px;
  height: 100vh;
}

.login {
  grid-column: 1/2;
  grid-row: 1/2;
  margin-top: auto;
  margin-bottom: auto;
}

.rightside {
  grid-column: 2/3;
  grid-row: 1/2;
  background-image: url(/src/assets/images/place.jpg);
  background-size: cover;
  z-index: -1;
}

.overlay {
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  height: 100px;
  width: 50%;
  height: 100%;
  z-index: -1;
}

.foot {
  grid-column: 1/3;
  grid-row: 2/3;
  background-color: rgb(36, 36, 36);
  color: white;
  font-family: var(--font-family);
}

.error {
  padding: 5px;
  background-color: rgb(228, 125, 125);
  border-radius: 5px;
  font-family: var(--font-family);
  color: white;
}

.round {
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 40%;
  left: 45%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: inset 10px 0px 15px rgba(0, 0, 0, 0.5);

  width: 200px;
  height: 200px;
  border: solid 5px #edb925;
  border-radius: 50%;
  padding: 5px;

  overflow: hidden; /* Cacher les parties de l'image qui débordent du conteneur */
  display: flex; /* Centrer l'image à l'intérieur du conteneur */
  align-items: center; /* Centrer verticalement */
  justify-content: center; /* Centrer horizontalement */
}

a {
  font-family: Helvetica, sans-serif;
}
</style>
