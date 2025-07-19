<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, maxLength } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router'
import InputBase from 'src/components/form/InputBase.vue'
import useNotify from 'src/composables/UseNotify'
import useFetchAuth from 'src/composables/fetchAuth.js'
import useSetStorage from 'src/composables/useSetStorage'

const { verify2Fa } = useFetchAuth()
const { notifySuccess } = useNotify()
const { setAuth } = useSetStorage()
const router = useRouter()
const route = useRoute()

// Data
const form = ref({
  code: '',
})

// Rules
const rules = computed(() => ({
  code: { required, numeric, maxLengthValue: maxLength(6) },
}))

const v$ = useVuelidate(rules, form)

async function handleForgotPassword() {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) {
    const response = await verify2Fa('/api/v1/auth/verify/2fa', route.params.token, form.value)
    if (response && response.status === 'OK') {
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

//onReset
function onReset() {
  form.value = {
    code: '',
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
            <div class="text-h6 text-weight-bold">
              Please verify your identity to proceed with the login
            </div>
            <div class="text-subtitle1" style="opacity: 0.4">
              An email with the verification code has been sent to the email provided. Please enter
              the code in the field below to continue.
            </div>
          </q-card-section>
          <q-card-section>
            <InputBase
              type="text"
              label="Verification code"
              icon="numbers"
              v-model="form.code"
              :error="v$.code.$error"
              :error-message="v$.code.$errors[0]?.$message"
              @blur="v$.code.$touch()"
            />
          </q-card-section>
          <q-card-actions vertical align="center" class="q-ma-sm">
            <q-btn rounded color="primary" type="submit" class="full-width q-mb-lg" no-caps
              >Verify code</q-btn
            >
            <p class="text-grey">
              <router-link class="text-accent" :to="{ name: 'login' }" style="text-decoration: none"
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
