import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuth: false,
    id: null,
    name: null,
    token: null,
  }),
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
