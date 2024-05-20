import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Guest',
    isLoggedIn: false
  }),
  actions: {
    login(name) {
      this.name = name
      this.isLoggedIn = true
    },
    disconnect() {
      this.name = 'Guest'
      this.isLoggedIn = false
    }
  }
})
