<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import BaseInput from 'src/components/form/BaseInput.vue'
import useValidate from 'src/composables/UseValidate'
import useAuth from 'src/composables/UseAuth'

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
})

const { resetPassword } = useAuth()
const { notifySuccess } = useNotify()
const { passwordRule } = useValidate()
const router = useRouter()
const form = ref({
  token: '',
  password: '',
  confirmPassword: '',
})

async function handleResetPassword() {
  const response = await resetPassword('/api/v1/auth/reset/password', form.value)
  if (response && response.status === 'OK') {
    // Clean form input
    onReset()
    // Message
    notifySuccess(response.message)
    // Redirect
    router.push({ name: 'signin' })
  }
}
// Lisent props
watchEffect(() => {
  form.value.token = props.token // Token
})
//onReset
function onReset() {
  form.value = {
    token: '',
    password: '',
    confirmPassword: '',
  }
}
</script>

<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <img alt="Logo app" src="~assets/mi_logo.svg" style="width: 200px; height: 200px" />
      <q-card class="no-shadow transparent create-card">
        <q-form @submit.prevent="handleResetPassword">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Created new password</div>
            <div class="text-subtitle1" style="opacity: 0.4">
              Your new password must be unique from previous passwords.
            </div>
          </q-card-section>
          <q-card-section class="column q-gutter-sm">
            <BaseInput
              icon="lock"
              v-model="form.password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The password field is required.',
                (val) => passwordRule(val) || 'The password field must be between 7 and 12 digits.',
              ]"
            />

            <PasswordCriteria :passwordValue="form.password" />

            <BaseInput
              icon="lock"
              v-model="form.confirmPassword"
              label="Confirm password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The password field is required.',
                (val) => (val && val === form.password) || 'Password confirmation does not match.',
                (val) => passwordRule(val) || 'The password field must be between 7 and 12 digits.',
              ]"
            />
          </q-card-section>
          <q-card-actions vertical align="center" class="q-ma-sm">
            <q-btn rounded color="primary" type="submit" class="full-width" no-caps
              >Reset Password</q-btn
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
