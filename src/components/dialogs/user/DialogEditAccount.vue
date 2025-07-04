<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, watchEffect, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha, email } from '@vuelidate/validators'

import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import useNotify from 'src/composables/UseNotify'
import BaseInput from 'src/components/form/BaseInput.vue'
import DialogHeaderBack from '../DialogHeaderBack.vue'

const props = defineProps({
  data: { type: Object, required: true },
})

defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const isLoading = ref(false)

// Data
const form = ref({
  currentPassword: '',
  name: '',
  email: '',
})

// Rules
const rules = computed(() => ({
  currentPassword: { required },
  name: { required, alpha },
  email: { required, email },
}))

const v$ = useVuelidate(rules, form)

// Update account
async function handleUpdateAccount() {
  // Start loading
  isLoading.value = true

  // Check form
  const isFormValid = await v$.value.$validate()

  try {
    if (isFormValid) {
      const { data } = await api.patch(`/api/v1/users/account/${store.getStateId}`, form.value)
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
    name: '',
    email: '',
  }
}

// Watch props user object
watchEffect(() => {
  form.value.name = props.data.name
  form.value.email = props.data.email
})
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persinstent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <DialogHeaderBack title="Account" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleUpdateAccount">
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
              icon="person"
              v-model="form.name"
              label="Name"
              type="text"
              :error="v$.name.$error"
              :error-message="v$.name.$errors[0]?.$message"
              @blur="v$.name.$touch()"
            />

            <BaseInput
              icon="email"
              v-model="form.email"
              label="Email"
              type="email"
              :error="v$.email.$error"
              :error-message="v$.email.$errors[0]?.$message"
              @blur="v$.email.$touch()"
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
