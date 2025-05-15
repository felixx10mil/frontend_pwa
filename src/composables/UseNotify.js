import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()

  const notifySuccess = (message) => {
    // Positive
    $q.notify({
      position: 'top',
      type: 'positive',
      icon: 'verified',
      progress: true,
      message: message || 'All right!',
    })
  }

  const notifyError = (message) => {
    // Negative
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
