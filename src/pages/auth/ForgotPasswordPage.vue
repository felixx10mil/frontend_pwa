<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import BaseInput from 'src/components/form/BaseInput.vue'
import useValidate from 'src/composables/UseValidate.js'
import useAuth from 'src/composables/UseAuth.js'
const { forgotPassword } = useAuth()
const { notifySuccess } = useNotify()
const { emailRule } = useValidate()
const router = useRouter()
const form = ref({
  email: '',
})

async function handleForgotPassword() {
  const response = await forgotPassword('auth/forgot/password', form.value)
  if (response && response.status === 'OK') {
    // Reset form
    onReset()
    // Message
    notifySuccess(response.message)
    // Redirect
    router.push({ name: 'signin' })
  }
}

//onReset
function onReset() {
  form.value = {
    email: '',
  }
}
</script>

<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <img
        alt="Quasar logo"
        src="~assets/forgot-password.svg"
        style="width: 200px; height: 200px"
      />
      <q-card class="no-shadow transparent create-card">
        <q-form @submit.prevent="handleForgotPassword">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Forgot Password?</div>
            <div class="text-subtitle1" style="opacity: 0.4">
              No worries. Please enter the email address associated with your account.
            </div>
          </q-card-section>
          <q-card-section>
            <BaseInput
              icon="alternate_email"
              v-model="form.email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The email field is required.',
                (val) => emailRule(val) || 'The email is invalid.',
              ]"
            />
          </q-card-section>
          <q-card-actions vertical align="center" class="q-ma-sm">
            <q-btn rounded color="primary" type="submit" class="full-width" no-caps
              >Send Email</q-btn
            >
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.create-card {
  width: 100%;
  max-width: 400px;
}
</style>
