import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: '',
    
  }),

  actions: {
    setUser(user){
      this.userData = user
      localStorage.setItem("token",this.userData.access_token)
      localStorage.setItem("user_id",this.userData.id)
    },
    clearUser() {
      this.userData = ''
      
    },
    removeToken() {
      localStorage.removeItem('token');
    }  
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['token']
      }
    ]
  },

  getters:{
    getUserName(state){
      return state.userData.name
    },
    getToken(state){
      return state.userData.access_token
    },
    getUserId(state){
      return state.userData.id
    }
  }
});
