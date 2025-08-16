<script setup>
import { useDialogPluginComponent } from 'quasar'
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import InputBase from 'src/components/form/InputBase.vue'
import DialogHeaderBack from '../DialogHeaderBack.vue'

defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const isLoading = ref(false)
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
        onReset()
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
function onReset() {
  form.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persinstent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="q-dialog-plugin">
      <DialogHeaderBack title="Password" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleUpdatePassword" class="q-gutter-y-sm">
          <InputBase
            type="password"
            label="Current password"
            icon="lock"
            v-model="form.currentPassword"
            :error="v$.currentPassword.$error"
            :error-message="v$.currentPassword.$errors[0]?.$message"
            @blur="v$.currentPassword.$touch()"
          />

          <InputBase
            type="password"
            label="New password"
            icon="lock"
            v-model="form.newPassword"
            :error="v$.newPassword.$error"
            :error-message="v$.newPassword.$errors[0]?.$message"
            @blur="v$.newPassword.$touch()"
          />

          <PasswordCriteria :passwordValue="form.newPassword" />

          <InputBase
            type="password"
            label="Confirm password"
            icon="lock"
            v-model="form.confirmPassword"
            :error="v$.confirmPassword.$error"
            :error-message="v$.confirmPassword.$errors[0]?.$message"
            @blur="v$.confirmPassword.$touch()"
          />

          <div class="row justify-center fixed-bottom q-pa-lg q-gutter-x-sm">
            <q-btn label="Save" type="submit" :loading="isLoading" color="primary">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
            <q-btn label="Cancel" outline color="grey-9" @click="onDialogCancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
