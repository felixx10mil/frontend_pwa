<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import InputBase from 'src/components/form/InputBase.vue'
import useNotify from 'src/composables/UseNotify.js'
import useFetchAuth from 'src/composables/fetchAuth'
import useSetStorage from 'src/composables/useSetStorage'

const { login } = useFetchAuth()
const { notifySuccess } = useNotify()
const { setAuth } = useSetStorage()
const router = useRouter()
// Data
const form = ref({
  email: '',
  password: '',
})

// Rules
const rules = computed(() => ({
  email: { required, email },
  password: { required },
}))

const v$ = useVuelidate(rules, form)

async function handleLogin() {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) {
    const response = await login('/api/v1/auth/login', form.value)
    if (response && response.status === 'OK') {
      if (response.is2fa === 'active') {
        router.replace({ name: 'two-factor', params: { token: response.token } })
        notifySuccess(response.message)
      } else {
        // Set storage
        setAuth(true, response.id, response.name, response.token)
        // Reset form
        onReset()
        // Message
        notifySuccess(response.message)
        // Redirect
        router.replace({ name: 'home' })
      }
    }
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
      <img alt="Logo app" src="~assets/mi_logo_app.svg" style="width: 200px; height: 200px" />
      <q-card class="no-shadow transparent create-card">
        <q-form @submit.prevent="handleLogin">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Login</div>
            <div class="text-subtitle1" style="opacity: 0.4">Enter your credentials.</div>
          </q-card-section>
          <q-card-section class="column q-gutter-sm">
            <InputBase
              type="email"
              label="E-mail"
              icon="alternate_email"
              v-model="form.email"
              :error="v$.email.$error"
              :error-message="v$.email.$errors[0]?.$message"
              @blur="v$.email.$touch()"
            />
            <InputBase
              type="password"
              label="Password"
              icon="lock"
              v-model="form.password"
              :error="v$.password.$error"
              :error-message="v$.password.$errors[0]?.$message"
              @blur="v$.password.$touch()"
            />
            <p class="text-right">
              <router-link class="text-accent" style="text-decoration: none" to="/forgot/password"
                >Forgot password?</router-link
              >
            </p>
          </q-card-section>
          <q-card-actions vertical align="center">
            <q-btn rounded color="primary" type="submit" class="full-width q-mb-lg" no-caps
              >Login</q-btn
            >
            <q-btn
              outline
              rounded
              color="accent"
              type="submit"
              class="full-width q-mb-lg"
              to="/login/by/email"
              no-caps
              >Login by e-mail</q-btn
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
