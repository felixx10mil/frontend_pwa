<script setup>
import { useRoute, useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useFetchAuth from 'src/composables/fetchAuth.js'
import useSetStorage from 'src/composables/useSetStorage'

const { notifySuccess } = useNotify()
const { verifyAuthEmail } = useFetchAuth()
const { setAuth } = useSetStorage()

const router = useRouter()
const route = useRoute()

async function handleVerifyAuthEmail() {
  const response = await verifyAuthEmail('/api/v1/auth/verify/authEmail', route.params.token)
  if (response && response.status === 'OK') {
    // Set storage
    setAuth(true, response.id, response.name, response.token)
    // Message
    notifySuccess(response.message)
    // Redirect
    router.replace({ name: 'home' })
  }
}

handleVerifyAuthEmail()
</script>
<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <img alt="Email check" src="~assets/lock_person.svg" style="width: 200px; height: 200px" />
      <p class="col-12 text-h5 text-center">Confirming...</p>
    </div>
  </q-page>
</template>
