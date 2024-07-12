<template>
  <nav class="b7 shadow-sm">
    <div class="d-flex flex-row space-between">
      <div class="row align-items-center px-3">
        <h5 class="nav-item font">
          {{ userName }}
        </h5>
      </div>
      <div class="d-flex font">
        <ul class="d-flex flex-row mt-3">
          <li class="nav-item row align-items-center mx-0 px-3">
            <a class="nav-link" href="#">POINT DE VENTE</a>
          </li>
          <li class="nav-item row align-items-center mx-0 px-3 border-left-2">
            <a class="nav-link" href="#">ETAT DES VENTES</a>
          </li>
          <li class="nav-item row align-items-center mx-0 px-3 border-left-2">
            <a class="nav-link" href="#">RAMASSAGE CASH</a>
          </li>
          <li class="nav-item row align-items-center mx-0 px-3 border-left-2">
            <a class="nav-link" href="#">COMMANDES</a>
          </li>
        </ul>
        <div class="d-flex flex-row align-items-center ml-50">
          <div class="">
            <img src="/src/assets/images/user.jpg" />
          </div>
          <div class="px-20 pt-3">
            <p>toubih@ivenco.net</p>
          </div>
        </div>
        <div class="px-20 align-items-center">
          <i @click="logout" class="bi bi-box-arrow-right fs-3"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../../router/router";
import { useShopStore } from "../../store/shopStore";
import { useUserStore } from "../../store/userStore";
export default {
  setup() {
    const userStore = useUserStore();
    const shopStore = useShopStore();

    const logout = () => {
      router.push("/login");
      userStore.removeToken();
      userStore.clearUser();
      shopStore.clearShop();
      console.log("Shop data set in store after reset:", shopStore.getShop);
      localStorage.clear();
    };
    return {
      logout,
      userName: userStore.getUserName,
      userId: userStore.getUserId,
      token: userStore.getToken,
    };
  },
};
</script>

<style scoped lang="scss">
img {
  width: 40px;
  border-radius: var(--border-radius);
  border: var(--border);
}
</style>
