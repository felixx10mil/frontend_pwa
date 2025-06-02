<script setup>
import BaseInput from 'src/components/form/BaseInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify.js'
import useValidate from 'src/composables/UseValidate.js'
import useAuth from 'src/composables/UseAuth'

const { signin } = useAuth()
const { emailRule, passwordRule } = useValidate()
const { notifySuccess } = useNotify()
const router = useRouter()
const form = ref({
  email: '',
  password: '',
})

async function handleSignin() {
  const response = await signin('/api/v1/auth/signin', form.value)
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
  }
}
</script>

<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <img alt="Logo app" src="~assets/mi_logo.svg" style="width: 200px; height: 200px" />
      <q-card class="no-shadow transparent create-card">
        <q-form @submit.prevent="handleSignin">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Sing in</div>
            <div class="text-subtitle1" style="opacity: 0.4">
              Sign in to continue using the application.
            </div>
          </q-card-section>
          <q-card-section class="column q-gutter-sm">
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
            <p class="text-right">
              <router-link class="text-accent" style="text-decoration: none" to="/forgot/password"
                >Forgot password?</router-link
              >
            </p>
          </q-card-section>
          <q-card-actions vertical align="center">
            <q-btn rounded color="primary" type="submit" class="full-width q-mb-lg" no-caps
              >Sign in</q-btn
            >
            <p class="text-grey">
              Don't have an account?
              <router-link
                class="text-accent"
                :to="{ name: 'signup' }"
                style="text-decoration: none"
                >Sign up</router-link
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
