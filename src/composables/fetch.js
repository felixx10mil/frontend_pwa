import { api } from 'src/boot/axios'
import { readonly, ref } from 'vue'

/**
 * Fetch user
 * @param {*} url
 * @returns
 */
export function useFetchUser(url) {
  const data = ref(null)

  async function loadUser() {
    try {
      const response = await api.get(url)
      if (response.data.status === 'OK') {
        data.value = response.data.user
      }
    } catch (err) {
      if (err) console.log('Oops!')
    }
  }

  loadUser()

  return { data, refresh: loadUser }
}

/**
 * Fetch users
 * @param {*} url
 * @returns
 */
export function useFetchUsers(url) {
  const data = ref([])

  async function loadUsers() {
    try {
      const response = await api.get(url)
      if (response.data.status === 'OK') {
        data.value = response.data.users
      }
    } catch (err) {
      if (err) console.log('Oops!')
    }
  }

  loadUsers()

  return { data: readonly(data), refresh: loadUsers }
}
