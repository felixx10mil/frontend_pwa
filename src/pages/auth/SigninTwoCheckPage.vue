<script setup>
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useAuth from 'src/composables/UseAuth.js'

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
})
const router = useRouter()
const { notifySuccess } = useNotify()
const { signinTwoCheck } = useAuth()

async function handleSigninTwo() {
  const response = await signinTwoCheck('/api/v1/auth/signinTwoCheck', props.token)
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
