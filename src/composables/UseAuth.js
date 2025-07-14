import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import { useRouter } from 'vue-router'

export default function useAuth() {
  const $q = useQuasar()
  const store = useAuthStore()
  const router = useRouter()

  /**
   * Login user
   * @param {*} url
   * @param {*} email
   * @param {*} password
   * @returns
   */
  async function login(url, { email, password }) {
    $q.loading.show({
      message: 'Loading...',
    })
    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: {
          email,
          password,
        },
      })
      // Is2fa
      if (data.data.user.is2fa === 'inactive') {
        // Set store auth
        store.$patch({
          isAuth: true,
          id: data.data.user.id,
          name: data.data.user.name,
          token: data.data.token,
        })
      }
      return {
        status: data.status,
        is2faEnabled: data.data.user.is2fa,
        token: data.data.token,
        message: data.message,
      }
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * verify 2fa
   * @param {*} url
   * @param {*} token
   * @param {*} code
   * @returns
   */
  async function verify2Fa(url, token, { code }) {
    $q.loading.show({
      message: 'Loading...',
    })
    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: { token, code },
      })

      // Set store auth
      store.$patch({
        isAuth: true,
        id: data.data.user.id,
        name: data.data.user.name,
        token: data.data.token,
      })

      return {
        status: data.status,
        message: data.message,
      }
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Send auth email
   * @param {*} url
   * @param {*} email
   * @returns
   */
  async function sendAuthEmail(url, { email }) {
    $q.loading.show({
      message: 'Loading...',
    })
    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: { email },
      })

      return { status: data.status, message: data.message }
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Verify auth email
   * @param {*} url
   * @param {*} token
   * @returns
   */
  async function verifyAuthEmail(url, token) {
    $q.loading.show({
      message: 'Loading...',
    })
    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: {
          token,
        },
      })

      // Set store auth
      store.$patch({
        isAuth: true,
        id: data.data.user.id,
        name: data.data.user.name,
        token: data.data.token,
      })
      return { status: data.status, message: data.message }
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Register user
   * @param {*} url
   * @param {*} email
   * @param {*} password
   * @param {*} confirmPassword
   * @returns
   */
  async function signup(url, { firstName, lastName, email, password, confirmPassword }) {
    $q.loading.show({
      message: 'Loading...',
    })

    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
      })
      return data
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Forgot password
   * @param {*} url
   * @param {*} email
   * @returns
   */
  async function forgotPassword(url, { email }) {
    $q.loading.show({
      message: 'Loading...',
    })

    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: {
          email,
        },
      })

      return data
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Reset password
   * @param {*} url
   * @param {*} token
   * @param {*} password
   * @param {*} confirmPassword
   * @returns
   */
  async function resetPassword(url, token, { password, confirmPassword }) {
    $q.loading.show({
      message: 'Loading...',
    })

    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: {
          token,
          password,
          confirmPassword,
        },
      })
      return data
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Confirm email
   * @param {*} url
   * @param {*} token
   * @returns
   */
  async function confirmEmail(url, token) {
    $q.loading.show({
      message: 'Loading...',
    })

    try {
      // Enviar una petición POST
      const { data } = await api({
        method: 'post',
        url: url,
        data: {
          token,
        },
      })
      return data
    } catch (err) {
      if (err) console.log('Oops!')
    } finally {
      $q.loading.hide()
    }
  }

  /**
   * Logout
   * @returns
   */
  async function logout() {
    $q.dialog({
      title: 'Log out',
      message: 'You want to log out?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      router.push({ name: 'login' })
      store.$reset()
    })
  }

  return {
    login,
    verify2Fa,
    sendAuthEmail,
    verifyAuthEmail,
    signup,
    forgotPassword,
    resetPassword,
    confirmEmail,
    logout,
  }
}
