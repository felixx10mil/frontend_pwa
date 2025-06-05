<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import BaseInput from 'src/components/form/BaseInput.vue'
import useValidate from 'src/composables/UseValidate'

const props = defineProps({
  id: { type: Number, required: true },
})

defineEmits([...useDialogPluginComponent.emits])

const { notifySuccess } = useNotify()
const { emailRule } = useValidate()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const email = ref('')
const isLoading = ref(false)

// Delete user
async function handleDeleteUser() {
  // Start loading
  isLoading.value = true

  // config
  const config = {
    data: {
      email: email.value,
    },
  }

  // Fetch axios
  try {
    const { data } = await api.delete(`/api/v1/admin/users/${props.id}`, config)
    if (data.status === 'OK') {
      // Message
      notifySuccess(data.message)
      // Clean input
      email.value = ''
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
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persinstent
    :maximized="false"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Permanently delete this account?</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        All services related to this account will be deleted.
      </q-card-section>

      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleDeleteUser">
          <div class="col-12 q-gutter-y-md">
            <BaseInput
              icon="email"
              v-model="email"
              label="Confirm email"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'The email field is required.',
                (val) => emailRule(val) || 'The email is invalid.',
              ]"
            />

            <div class="text-center">
              <q-btn
                label="Delete"
                type="submit"
                rounded
                :loading="isLoading"
                color="red"
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
