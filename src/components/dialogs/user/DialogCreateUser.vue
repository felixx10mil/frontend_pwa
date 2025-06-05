<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import BarDialog from '../BarDialog.vue'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import BaseInput from 'src/components/form/BaseInput.vue'
import useValidate from 'src/composables/UseValidate'

defineEmits([...useDialogPluginComponent.emits])

const { notifySuccess } = useNotify()
const { emailRule, passwordRule } = useValidate()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
})
const isLoading = ref(false)
const maximizedToggle = ref(true)

// Register User
async function handleCreateUser() {
  // Start loading
  isLoading.value = true

  // Fetch axios
  try {
    const { data } = await api.post(`/api/v1/auth/signup`, form.value)
    if (data.status === 'OK') {
      // Message
      notifySuccess(data.message)
      // Clean input
      onInputClean()
      // Close modal
      onDialogOK()
    }
  } catch (error) {
    if (error) console.log('Oops!')
  } finally {
    // Load spinner hiden
    isLoading.value = false
  }
}

// Clear form
function onInputClean() {
  form.value = {
    email: '',
    password: '',
    confirmPassword: '',
  }
}

// Update modal size
const onUpdateModalSize = (value) => {
  maximizedToggle.value = value
}
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persinstent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <bar-dialog
        title="New user"
        :maximizedToggle="maximizedToggle"
        @updateModalSize="onUpdateModalSize"
      />
      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleCreateUser">
          <div class="col-12 q-gutter-y-md">
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

            <div class="text-center">
              <q-btn
                label="Register"
                type="submit"
                rounded
                :loading="isLoading"
                color="primary"
                class="full-width q-mb-lg"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
              <q-btn
                label="Cancel"
                outline
                rounded
                color="grey-9"
                class="full-width q-mb-lg"
                @click="onDialogCancel"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
