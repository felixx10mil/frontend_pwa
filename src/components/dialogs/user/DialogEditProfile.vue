<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, watchEffect, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha } from '@vuelidate/validators'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import { useAuthStore } from 'src/stores/auth-storage'
import DialogHeaderBack from '../DialogHeaderBack.vue'
import InputBase from 'src/components/form/InputBase.vue'

const props = defineProps({
  data: { type: Object, required: true },
})
defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

// Loading initial value
const isLoading = ref(false)

// Data
const form = ref({
  first_name: '',
  last_name: '',
  biography: '',
})

// Rules
const rules = computed(() => ({
  first_name: { required, alpha },
  last_name: { required, alpha },
  biography: { required },
}))

const v$ = useVuelidate(rules, form)

// Update profile
async function handleUpdateProfile() {
  // Start loading
  isLoading.value = true

  // Check form
  const isFormValid = await v$.value.$validate()

  try {
    if (isFormValid) {
      const { data } = await api.patch(`/api/v1/users/profile/${store.getStateId}`, form.value)
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
    first_name: '',
    last_name: '',
    biography: '',
  }
}

// Watch props user object
watchEffect(() => {
  form.value.first_name = props.data.profile.first_name
  form.value.last_name = props.data.profile.last_name
  form.value.biography = props.data.profile.biography
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
      <DialogHeaderBack title="Profile" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleUpdateProfile" class="q-gutter-y-sm">
          <InputBase
            type="text"
            label="First name"
            icon="person"
            v-model="form.first_name"
            :error="v$.first_name.$error"
            :error-message="v$.first_name.$errors[0]?.$message"
            @blur="v$.first_name.$touch()"
          />

          <InputBase
            type="text"
            label="Last name"
            icon="person"
            v-model="form.last_name"
            :error="v$.last_name.$error"
            :error-message="v$.last_name.$errors[0]?.$message"
            @blur="v$.last_name.$touch()"
          />

          <InputBase
            type="textarea"
            label="Biography"
            icon="description"
            v-model="form.biography"
            :error="v$.biography.$error"
            :error-message="v$.biography.$errors[0]?.$message"
            @blur="v$.biography.$touch()"
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
