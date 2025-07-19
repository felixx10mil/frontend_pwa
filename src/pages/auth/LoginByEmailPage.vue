<script setup>
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import InputBase from 'src/components/form/InputBase.vue'
import useFetchAuth from 'src/composables/fetchAuth.js'
const { sendAuthEmail } = useFetchAuth()
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
    const response = await sendAuthEmail('/api/v1/auth/send/authEmail', form.value)
    if (response && response.status === 'OK') {
      // Reset form
      onReset()
      // Message
      notifySuccess(response.message)
      // Redirect
      router.push({ name: 'loginByEmail' })
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
            <div class="text-h6 text-weight-bold">Login by e-mail</div>
            <div class="text-subtitle1" style="opacity: 0.4">
              Enter the e-mail address associated with your account.
            </div>
          </q-card-section>
          <q-card-section>
            <InputBase
              type="email"
              label="E-mail"
              icon="alternate_email"
              v-model="form.email"
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
