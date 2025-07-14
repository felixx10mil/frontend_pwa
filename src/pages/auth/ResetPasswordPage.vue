<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router'
import InputBase from 'src/components/form/InputBase.vue'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import useNotify from 'src/composables/UseNotify'
import useAuth from 'src/composables/UseAuth'

const { resetPassword } = useAuth()
const { notifySuccess } = useNotify()
const router = useRouter()
const route = useRoute()
const passwd = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/)

// Data
const form = ref({
  password: '',
  confirmPassword: '',
})

// Rules
const rules = computed(() => ({
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

async function handleResetPassword() {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) {
    const response = await resetPassword(
      '/api/v1/auth/reset/password',
      route.params.token,
      form.value,
    )
    if (response && response.status === 'OK') {
      // Clean form input
      onReset()
      // Message
      notifySuccess(response.message)
      // Redirect
      router.push({ name: 'login' })
    }
  }
}

//onReset
function onReset() {
  form.value = {
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
        <q-form @submit.prevent="handleResetPassword">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Created new password</div>
            <div class="text-subtitle1" style="opacity: 0.4">
              Your new password must be unique from previous passwords.
            </div>
          </q-card-section>
          <q-card-section class="column q-gutter-sm">
            <InputBase
              type="password"
              label="Password"
              icon="lock"
              v-model="form.password"
              :error="v$.password.$error"
              :error-message="v$.password.$errors[0]?.$message"
              @blur="v$.password.$touch()"
            />

            <PasswordCriteria :passwordValue="form.password" />
            <InputBase
              type="password"
              label="Confirm password"
              icon="lock"
              v-model="form.confirmPassword"
              :error="v$.confirmPassword.$error"
              :error-message="v$.confirmPassword.$errors[0]?.$message"
              @blur="v$.confirmPassword.$touch()"
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
