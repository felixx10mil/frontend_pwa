import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-storage'
import { useRouter } from 'vue-router'

export default function setStorage() {
  const store = useAuthStore()
  const $q = useQuasar()
  const router = useRouter()

  /**
   * IsAuth
   * @param {*} isAuth
   * @param {*} id
   * @param {*} name
   * @param {*} token
   */

  const setAuth = (isAuth, id, name, token) => {
    store.$patch({
      isAuth,
      id,
      name,
      token,
    })
  }

  /**
   * Reset auth
   * @returns
   */
  const resetAuth = () => {
    $q.dialog({
      title: 'Log out',
      message: 'You want to log out?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      router.replace({ name: 'login' })
      store.$reset()
    })
  }

  return { setAuth, resetAuth }
}
