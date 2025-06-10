<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import BaseInput from 'src/components/form/BaseInput.vue'
import useValidate from 'src/composables/UseValidate.js'
import useAuth from 'src/composables/UseAuth.js'

const { signup } = useAuth()
const { notifySuccess } = useNotify()
const { fullNameRule, emailRule, passwordRule } = useValidate()
const router = useRouter()
const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})
async function handleSignup() {
  const response = await signup('/api/v1/auth/signup', form.value)
  if (response && response.status === 'OK') {
    // Reset form
    onReset()
    // Message
    notifySuccess(response.message)
    // Redirect
    router.push({ name: 'home' })
  }
}
//onReset
function onReset() {
  form.value = {
    email: '',
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
        <q-form @submit.prevent="handleSignup">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Sign up</div>
            <div class="text-subtitle1" style="opacity: 0.4">Enter your personal information.</div>
          </q-card-section>
          <q-card-section class="column q-gutter-sm">
            <BaseInput
              icon="person"
              v-model="form.fullName"
              label="First and last name"
              type="text"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The fullname field is required.',
                (val) => fullNameRule(val) || 'The fullName field must contain a space.',
              ]"
            />

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
            <q-btn rounded color="primary" type="submit" class="full-width q-mb-lg" no-caps
              >Sign up</q-btn
            >
            <p class="text-grey">
              Already have an account?
              <router-link
                class="text-accent"
                :to="{ name: 'signin' }"
                style="text-decoration: none"
                >Sign in</router-link
              >
            </p>
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
