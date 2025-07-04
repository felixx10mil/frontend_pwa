<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha, email, sameAs, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import BaseInput from 'src/components/form/BaseInput.vue'
import useAuth from 'src/composables/UseAuth.js'

const { signup } = useAuth()
const { notifySuccess } = useNotify()
const router = useRouter()
const passwd = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/)

// Data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Rules
const rules = computed(() => ({
  firstName: { required, alpha },
  lastName: { required, alpha },
  email: { required, email },
  password: {
    required,
    passwd: helpers.withMessage('Invalid password', passwd),
  },
  confirmPassword: {
    required,
    sameAs: sameAs(form.value.password),
  },
}))

const v$ = useVuelidate(rules, form)

async function handleSignup() {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) {
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
}
//onReset
function onReset() {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
}
</script>

<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <img alt="Logo app" src="~assets/mi_logo_app.svg" style="width: 200px; height: 200px" />
      <q-card class="no-shadow transparent create-card">
        <q-form @submit.prevent="handleSignup">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Sign up</div>
            <div class="text-subtitle1" style="opacity: 0.4">Enter your personal information.</div>
          </q-card-section>
          <q-card-section class="column q-gutter-sm">
            <BaseInput
              icon="person"
              v-model="form.firstName"
              label="FirstName"
              type="text"
              :error="v$.firstName.$error"
              :error-message="v$.firstName.$errors[0]?.$message"
              @blur="v$.firstName.$touch()"
            />

            <BaseInput
              icon="person"
              v-model="form.lastName"
              label="LastName"
              type="text"
              :error="v$.lastName.$error"
              :error-message="v$.lastName.$errors[0]?.$message"
              @blur="v$.lastName.$touch()"
            />

            <BaseInput
              icon="alternate_email"
              v-model="form.email"
              label="Email"
              type="email"
              :error="v$.email.$error"
              :error-message="v$.email.$errors[0]?.$message"
              @blur="v$.email.$touch()"
            />

            <BaseInput
              icon="lock"
              v-model="form.password"
              label="Password"
              type="password"
              :error="v$.password.$error"
              :error-message="v$.password.$errors[0]?.$message"
              @blur="v$.password.$touch()"
            />

            <PasswordCriteria :passwordValue="form.password" />

            <BaseInput
              icon="lock"
              v-model="form.confirmPassword"
              label="Confirm password"
              type="password"
              :error="v$.confirmPassword.$error"
              :error-message="v$.confirmPassword.$errors[0]?.$message"
              @blur="v$.confirmPassword.$touch()"
            />
          </q-card-section>
          <q-card-actions vertical align="center" class="q-ma-sm">
            <q-btn rounded color="primary" type="submit" class="full-width q-mb-lg" no-caps
              >Sign up</q-btn
            >
            <p class="text-grey">
              Already have an account?
              <router-link class="text-accent" :to="{ name: 'login' }" style="text-decoration: none"
                >Login</router-link
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
