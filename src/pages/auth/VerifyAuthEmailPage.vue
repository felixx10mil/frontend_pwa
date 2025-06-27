<script setup>
import { useRoute, useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useAuth from 'src/composables/UseAuth.js'

const router = useRouter()
const route = useRoute()

const { notifySuccess } = useNotify()
const { verifyAuthEmail } = useAuth()

async function handleSigninTwo() {
  const response = await verifyAuthEmail('/api/v1/auth/verify/authEmail', route.params.token)
  if (response && response.status === 'OK') {
    // Message
    notifySuccess(response.message)
    // Redirect
    router.push({ name: 'home' })
  }
}

handleSigninTwo()
</script>
<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <p class="col-12 text-h5 text-center">Checking of the information...</p>
      </div>
    </div>
  </q-page>
</template>
