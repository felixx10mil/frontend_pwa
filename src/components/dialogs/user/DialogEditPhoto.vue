<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useAuthStore } from 'src/stores/auth-storage'
import useNotify from 'src/composables/UseNotify'
import DialogHeaderBack from '../DialogHeaderBack.vue'

defineEmits([...useDialogPluginComponent.emits])

const store = useAuthStore()
const { notifySuccess, notifyError } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const form = ref({
  file: null,
})
const isLoading = ref(false)

function onRejected() {
  notifyError('The selected image exceeds 300KB')
}

// Update Photo
async function handleUpdatePhoto() {
  // Start loading
  isLoading.value = true

  //   Create data Form
  const dataForm = new FormData()
  dataForm.append('file', form.value.file)

  // config
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  // Fetch axios
  try {
    const { data } = await api.patch(`/api/v1/users/photo/${store.getStateId}`, dataForm, config)
    if (data.status === 'OK') {
      // Message
      notifySuccess(data.message)
      // Clean input
      onReset()
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
function onReset() {
  form.value = {
    file: null,
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
      <DialogHeaderBack title="Photo" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleUpdatePhoto" class="q-pa-md q-gutter-md">
          <q-file
            v-model="form.file"
            label="File"
            outlined
            bottom-slots
            max-file-size="300000"
            :max-files="1"
            accept=".jpg,.jpeg"
            clearable
            counter
            hint="Note: You can upload an image of maximum size 300KB, please compress the image before uploading it to decrease its size."
            @rejected="onRejected"
          >
            <template v-slot:prepend>
              <q-icon name="image" @click.stop.prevent />
            </template>
          </q-file>

          <div class="row justify-center fixed-bottom q-pb-lg q-gutter-sm">
            <q-btn label="Save" type="submit" rounded :loading="isLoading" color="primary">
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
            <q-btn label="Cancel" outline rounded color="grey-9" @click="onDialogCancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
