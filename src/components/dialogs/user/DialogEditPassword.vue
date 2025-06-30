<script setup>
import { useDialogPluginComponent } from 'quasar'
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import BarDialog from '../BarDialog.vue'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import BaseInput from 'src/components/form/BaseInput.vue'

defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const isLoading = ref(false)
const maximizedToggle = ref(true)
const passwd = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/)

// Data
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Rules
const rules = computed(() => ({
  currentPassword: { required },
  newPassword: {
    required,
    passwd: helpers.withMessage('Invalid password', passwd),
  },
  confirmPassword: {
    required,
    passwd: helpers.withMessage('Invalid password', passwd),
    sameAs: sameAs(form.value.newPassword),
  },
}))

const v$ = useVuelidate(rules, form)

// Update Password
async function handleUpdatePassword() {
  // Start loading
  isLoading.value = true

  // Check form
  const isFormValid = await v$.value.$validate()

  try {
    if (isFormValid) {
      const { data } = await api.patch(`/api/v1/users/password/${store.getStateId}`, form.value)
      if (data.status === 'OK') {
        // Message
        notifySuccess(data.message)
        // Clean input
        onInputClean()
        // Close modal
        onDialogOK()
      }
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
              :error="v$.currentPassword.$error"
              :error-message="v$.currentPassword.$errors[0]?.$message"
              @blur="v$.currentPassword.$touch()"
            />

            <BaseInput
              icon="lock"
              v-model="form.newPassword"
              label="New password"
              type="password"
              :error="v$.newPassword.$error"
              :error-message="v$.newPassword.$errors[0]?.$message"
              @blur="v$.newPassword.$touch()"
            />

            <PasswordCriteria :passwordValue="form.newPassword" />

            <BaseInput
              icon="lock"
              v-model="form.confirmPassword"
              label="Confirm password"
              type="password"
              :error="v$.confirmPassword.$error"
              :error-message="v$.confirmPassword.$errors[0]?.$message"
              @blur="v$.confirmPassword.$touch()"
            />

            <div class="text-center">
              <q-btn
                label="Update"
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
