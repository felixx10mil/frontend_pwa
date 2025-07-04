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

/**
 * Fetch roles
 * @param {*} url
 * @returns
 */
export function useFetchRoles(url) {
  const roles = ref([])

  async function loadRoles() {
    try {
      const { data } = await api.get(url)
      if (data.status === 'OK') {
        roles.value = data.roles.roles
      }
    } catch (err) {
      if (err) console.log('Oops!')
    }
  }

  loadRoles()

  return { roles, refresh: loadRoles }
}

/**
 * Fetch roles by user
 * @param {*} url
 * @returns
 */
export function useFetchRolesByUser(url) {
  const rolesByUser = ref([])

  async function loadRolesByUser() {
    try {
      const { data } = await api.get(url)
      if (data.status === 'OK') {
        rolesByUser.value = data.roles.roles
      }
    } catch (err) {
      if (err) console.log('Oops!')
    }
  }

  loadRolesByUser()

  return { rolesByUser, refresh: loadRolesByUser }
}
