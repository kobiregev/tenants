import { defineStore } from 'pinia'
import { getTokenFromLocalStorage, removeToken, setTokenInLocalStorage } from '../utils/utils'
import router from '@/router'
// import { getTokenFromLocalStorage, removeToken,setTokenInLocalStorage } from '../utils/utils'
// import { logout } from '../services/user'
// import { useRouter } from 'vue-router'
// import { ref } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: getTokenFromLocalStorage() ? true : false,
    token: getTokenFromLocalStorage()
  }),
  actions: {
    async signIn(token) {
      this.token = token
      this.isAuthenticated = true
      setTokenInLocalStorage(token)
      router.push({ name: 'home' })
    },
    async signOut() {
      this.isAuthenticated = false
      removeToken()
      router.push({ name: 'login' })
    }
  }
})
