import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

export default function useFetchAuth() {
  const $q = useQuasar()

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

      return {
        status: data.status,
        id: data.data.user.id,
        name: data.data.user.name,
        is2fa: data.data.user.is2fa,
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
      return {
        status: data.status,
        id: data.data.user.id,
        name: data.data.user.name,
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

      return {
        status: data.status,
        id: data.data.user.id,
        name: data.data.user.name,
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

  return {
    signup,
    login,
    verify2Fa,
    sendAuthEmail,
    verifyAuthEmail,
    forgotPassword,
    resetPassword,
    confirmEmail,
  }
}
