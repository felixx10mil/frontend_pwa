import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth-storage'
import { Notify } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default defineBoot(async ({ router, app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // Store
  const userStore = useAuthStore(store)

  // Request interceptor
  api.interceptors.request.use((config) => {
    if (userStore.getStateAuth) {
      config.headers.Authorization = `Bearer ${userStore.getStateToken}`
    }
    return config
  })

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const status = error.response.status
      if (error.response) {
        Notify.create({
          position: 'top',
          type: 'negative',
          message: `${error.response.data.error.message}`,
          actions: [
            {
              label: status === 401 ? 'refresh' : 'close',
              color: 'yellow',
              handler: () => {
                if (status === 401) {
                  router.push({ name: 'signin' })
                  // userStore.$reset()
                }
              },
            },
          ],
        })
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en node.js
        Notify.create({
          position: 'top',
          type: 'negative',
          icon: 'report',
          message: 'No response received from server',
        })
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        Notify.create({
          position: 'top',
          type: 'negative',
          icon: 'report',
          message: error.message || 'Request setup error!',
        })
      }
      return Promise.reject(error)
    },
  )
})

export { api }
