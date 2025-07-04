<script setup>
import { useRoute, useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useAuth from 'src/composables/UseAuth.js'

const router = useRouter()
const route = useRoute()

const { notifySuccess } = useNotify()
const { confirmEmail } = useAuth()

async function handleConfirmAccount() {
  const response = await confirmEmail('/api/v1/auth/confirm/account', route.params.token)
  if (response && response.status === 'OK') {
    // Message
    notifySuccess(response.message)
    // Redirect
    router.push({ name: 'login' })
  }
}

handleConfirmAccount()
</script>
<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <p class="col-12 text-h5 text-center">Confirming your account...</p>
      </div>
    </div>
  </q-page>
</template>
