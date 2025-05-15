import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { readonly, ref } from 'vue'

/**
 * Obtiene los datos de un usuario especifico
 *
 * @param {*} url
 * @returns
 */
export function useFetchUser(url) {
  const $q = useQuasar()
  const data = ref(null)

  const loadUser = async () => {
    $q.loading.show({
      message: 'Loading...',
    })

    try {
      const response = await api.get(url)
      if (response.data.status === 'OK') {
        data.value = response.data.user
      }
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  loadUser()

  return { data, refresh: loadUser }
}

/**
 * Obtiene los datos de todos los usuarios
 *
 * @param {*} url
 * @returns
 */
export function useFetchUsers(url) {
  const $q = useQuasar()
  const data = ref([])

  const loadUsers = async () => {
    $q.loading.show({
      message: 'Loading...',
    })

    try {
      const response = await api.get(url)
      if (response.data.status === 'OK') {
        data.value = response.data.users
      }
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  loadUsers()

  return { data: readonly(data), refresh: loadUsers }
}
