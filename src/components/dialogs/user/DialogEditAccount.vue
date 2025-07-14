<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, watchEffect, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha, email } from '@vuelidate/validators'

import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import useNotify from 'src/composables/UseNotify'
import InputBase from 'src/components/form/InputBase.vue'
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
        <q-form @submit.prevent="handleUpdateAccount" class="q-gutter-y-sm">
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
            type="text"
            label="Name"
            icon="person"
            v-model="form.name"
            :error="v$.name.$error"
            :error-message="v$.name.$errors[0]?.$message"
            @blur="v$.name.$touch()"
          />

          <InputBase
            type="email"
            label="Email"
            icon="email"
            v-model="form.email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message"
            @blur="v$.email.$touch()"
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
