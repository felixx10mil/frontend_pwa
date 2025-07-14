<script setup>
import { useDialogPluginComponent } from 'quasar'
import { computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha, email, sameAs, helpers } from '@vuelidate/validators'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import PasswordCriteria from 'src/components/PasswordCriteria.vue'
import InputBase from 'src/components/form/InputBase.vue'
import DialogHeaderBack from '../DialogHeaderBack.vue'

defineEmits([...useDialogPluginComponent.emits])

const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const isLoading = ref(false)
const passwd = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/)

// Data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Rules
const rules = computed(() => ({
  firstName: { required, alpha },
  lastName: { required, alpha },
  email: { required, email },
  password: { required, passwd: helpers.withMessage('Invalid password', passwd) },
  confirmPassword: { required, sameAs: sameAs(form.value.password) },
}))

const v$ = useVuelidate(rules, form)

// Register User
async function handleCreateUser() {
  // Start loading
  isLoading.value = true

  // Check form
  const isFormValid = await v$.value.$validate()

  try {
    if (isFormValid) {
      const { data } = await api.post(`/api/v1/auth/signup`, form.value)
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <DialogHeaderBack title="Register" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleCreateUser" class="q-gutter-y-sm">
          <InputBase
            type="text"
            label="First name"
            icon="person"
            v-model="form.firstName"
            :error="v$.firstName.$error"
            :error-message="v$.firstName.$errors[0]?.$message"
            @blur="v$.firstName.$touch()"
          />

          <InputBase
            type="text"
            label="Last name"
            icon="person"
            v-model="form.lastName"
            :error="v$.lastName.$error"
            :error-message="v$.lastName.$errors[0]?.$message"
            @blur="v$.lastName.$touch()"
          />

          <InputBase
            type="email"
            label="Email"
            icon="alternate_email"
            v-model="form.email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message"
            @blur="v$.email.$touch()"
          />

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
