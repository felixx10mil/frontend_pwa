import { api } from 'src/boot/axios'
import { ref, watchEffect, toValue } from 'vue'

/**
 * Fetch users
 * @param {*} url
 * @returns
 */

export function useFetchUsers(url) {
  const data = ref(null)

  const fetchData = async () => {
    // reset state before fetching..
    data.value = null

    try {
      const response = await api.get(toValue(url))
      if (response.data.status === 'OK') {
        data.value = response.data.users
      }
    } catch (err) {
      if (err) console.log('Oops!')
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { users: data, refreshUsers: fetchData }
}
