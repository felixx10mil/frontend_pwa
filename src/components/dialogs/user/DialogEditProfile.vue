<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, watchEffect } from 'vue'
import { api } from 'boot/axios'
import BarDialog from '../BarDialog.vue'
import useNotify from 'src/composables/UseNotify'
import { useAuthStore } from 'src/stores/auth-storage'
import BaseInput from 'src/components/form/BaseInput.vue'

const props = defineProps({
  data: { type: Object, required: true },
})
defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const form = ref({
  first_name: '',
  last_name: '',
  biography: '',
})
const isLoading = ref(false)
const maximizedToggle = ref(true)

// Update profile
async function handleUpdateProfile() {
  // Start loading
  isLoading.value = true

  // Fetch axios
  try {
    const { data } = await api.patch(`users/profile/${store.getStateId}`, form.value)
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
    first_name: '',
    last_name: '',
    biography: '',
  }
}

// Update modal size
const onUpdateModalSize = (value) => {
  maximizedToggle.value = value
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
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <bar-dialog
        title="Profile"
        :maximizedToggle="maximizedToggle"
        @updateModalSize="onUpdateModalSize"
      />
      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleUpdateProfile">
          <div class="col-12 q-gutter-y-md">
            <BaseInput
              icon="person"
              v-model="form.first_name"
              label="First name"
              type="text"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The name field is required.',
                (val) => val.length >= 6 || 'The name field must be 6 digits.',
              ]"
            />

            <BaseInput
              icon="person"
              v-model="form.last_name"
              label="Last name"
              type="text"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The last_name field is required.',
                (val) => val.length >= 6 || 'The name field must be 6 digits.',
              ]"
            />

            <BaseInput
              icon="description"
              v-model="form.biography"
              label="Biography"
              type="textarea"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The biography field is required.',
                (val) => val.length >= 6 || 'The name field must be 6 digits.',
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
