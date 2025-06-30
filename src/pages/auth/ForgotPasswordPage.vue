<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import BaseInput from 'src/components/form/BaseInput.vue'
import useNotify from 'src/composables/UseNotify'
import useAuth from 'src/composables/UseAuth.js'
const { forgotPassword } = useAuth()
const { notifySuccess } = useNotify()
const router = useRouter()
// Data
const form = ref({
  email: '',
})

// Rules
const rules = computed(() => ({
  email: { required, email },
}))

const v$ = useVuelidate(rules, form)

async function handleForgotPassword() {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) {
    const response = await forgotPassword('/api/v1/auth/forgot/password', form.value)
    if (response && response.status === 'OK') {
      // Reset form
      onReset()
      // Message
      notifySuccess(response.message)
      // Redirect
      router.push({ name: 'signin' })
    }
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
      <img alt="Logo app" src="~assets/mi_logo_app.svg" style="width: 200px; height: 200px" />
      <q-card class="no-shadow transparent create-card">
        <q-form @submit.prevent="handleForgotPassword">
          <q-card-section>
            <div class="text-h6 text-weight-bold">Forgot Password?</div>
            <div class="text-subtitle1" style="opacity: 0.4">
              Enter the e-mail address associated with your account.
            </div>
          </q-card-section>
          <q-card-section>
            <BaseInput
              icon="alternate_email"
              v-model="form.email"
              label="Email"
              type="email"
              :error="v$.email.$error"
              :error-message="v$.email.$errors[0]?.$message"
              @blur="v$.email.$touch()"
            />
          </q-card-section>
          <q-card-actions vertical align="center" class="q-ma-sm">
            <q-btn rounded color="primary" type="submit" class="full-width q-mb-lg" no-caps
              >Send Email</q-btn
            >
            <p class="text-grey">
              <router-link
                class="text-accent"
                :to="{ name: 'signin' }"
                style="text-decoration: none"
                >Back to login</router-link
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
