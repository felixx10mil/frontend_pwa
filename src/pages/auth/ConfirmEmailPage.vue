<script setup>
import { useRoute, useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useFetchAuth from 'src/composables/fetchAuth.js'

const router = useRouter()
const route = useRoute()

const { notifySuccess } = useNotify()
const { confirmEmail } = useFetchAuth()

async function handleConfirmAccount() {
  const response = await confirmEmail('/api/v1/auth/confirm/email', route.params.token)
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
  <q-page class="flex flex-center">
    <div class="column items-center">
      <img alt="Email check" src="~assets/email_check.svg" style="width: 200px; height: 200px" />
      <p class="col-12 text-h5 text-center">Confirming your email address...</p>
    </div>
  </q-page>
</template>
