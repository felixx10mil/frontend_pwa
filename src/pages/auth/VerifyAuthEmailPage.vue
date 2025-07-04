<script setup>
import { useRoute, useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useAuth from 'src/composables/UseAuth.js'

const { notifySuccess } = useNotify()
const { verifyAuthEmail } = useAuth()
const router = useRouter()
const route = useRoute()

async function handleVerifyAuthEmail() {
  const response = await verifyAuthEmail('/api/v1/auth/verify/authEmail', route.params.token)
  if (response && response.status === 'OK') {
    // Message
    notifySuccess(response.message)
    // Redirect
    router.push({ name: 'home' })
  }
}

handleVerifyAuthEmail()
</script>
<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <p class="col-12 text-h5 text-center">Credentials check...</p>
      </div>
    </div>
  </q-page>
</template>
