import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()

  /**
   * Message
   * @param {*} message
   */
  const notifySuccess = (message) => {
    $q.notify({
      position: 'top',
      type: 'positive',
      icon: 'verified',
      progress: true,
      message: message || 'All right!',
    })
  }

  /**
   * Message
   * @param {*} message
   */
  const notifyError = (message) => {
    $q.notify({
      position: 'top',
      type: 'negative',
      icon: 'report',
      progress: true,
      message: message || 'Failed!',
    })
  }

  return { notifySuccess, notifyError }
}
