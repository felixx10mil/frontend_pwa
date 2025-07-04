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
        <q-form class="row justify-center full-width" @submit.prevent="handleUpdatePhoto">
          <div class="col-12 q-gutter-y-md">
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

            <div class="text-center">
              <q-btn
                label="Update"
                type="submit"
                rounded
                :loading="isLoading"
                color="primary"
                class="full-width q-ma-lg"
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
