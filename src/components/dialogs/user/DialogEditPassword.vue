<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import BarDialog from '../BarDialog.vue'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import BaseInput from 'src/components/form/BaseInput.vue'
import useValidate from 'src/composables/UseValidate'

defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess } = useNotify()
const { passwordRule } = useValidate()
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const isLoading = ref(false)
const maximizedToggle = ref(true)

// Hace una peticion al servidor para actualizar la password
async function handleUpdatePassword() {
  // Start loading
  isLoading.value = true

  // Fetch axios
  try {
    const { data } = await api.patch(`users/password/${store.getStateId}`, form.value)
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

function onInputClean() {
  form.value = {
    currentPassword: '',
    newPassword: '',
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
        title="Password"
        :maximizedToggle="maximizedToggle"
        @updateModalSize="onUpdateModalSize"
      />
      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleUpdatePassword">
          <div class="col-12 q-gutter-y-md">
            <BaseInput
              icon="lock"
              v-model="form.currentPassword"
              label="Current password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The current password field is required.',
                (val) =>
                  passwordRule(val) ||
                  'The current password field must be between 7 and 12 digits.',
              ]"
            />

            <BaseInput
              icon="lock"
              v-model="form.newPassword"
              label="New password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The new password field is required.',
                (val) =>
                  passwordRule(val) || 'The new password field must be between 7 and 12 digits.',
              ]"
            />

            <PasswordCriteria :passwordValue="form.newPassword" />

            <BaseInput
              icon="lock"
              v-model="form.confirmPassword"
              label="Confirm password"
              type="password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The confirm password field is required.',
                (val) =>
                  (val && val === form.newPassword) || 'Password confirmation does not match.',
                (val) =>
                  passwordRule(val) ||
                  'The confirm password field must be between 7 and 12 digits.',
              ]"
            />

            <div class="text-center">
              <q-btn
                label="Update"
                type="submit"
                :outline="$q.dark.isActive ? true : false"
                rounded
                :loading="isLoading"
                color="primary"
                class="full-width q-mb-lg"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
