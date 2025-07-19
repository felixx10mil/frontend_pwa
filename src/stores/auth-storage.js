import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuth: false,
    id: null,
    name: null,
    token: null,
  }),
  persist: true, // Note that we are using a persisted state here
  getters: {
    getStateAuth(state) {
      return state.isAuth
    },
    getStateId(state) {
      return state.id
    },
    getStateName(state) {
      return state.name
    },
    getStateToken(state) {
      return state.token
    },
  },
})
