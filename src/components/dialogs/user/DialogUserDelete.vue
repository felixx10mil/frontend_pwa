<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import BaseInput from 'src/components/form/BaseInput.vue'
import DialogHeaderBack from '../DialogHeaderBack.vue'

const props = defineProps({
  id: { type: Number, required: true },
})

defineEmits([...useDialogPluginComponent.emits])

const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

// Loading initial value
const isLoading = ref(false)

// Data
const form = ref({
  email: '',
})

// Rules
const rules = computed(() => ({
  email: { required, email },
}))

const v$ = useVuelidate(rules, form)

// Delete user
async function handleDeleteUser() {
  // Start loading
  isLoading.value = true

  // Check form
  const isFormValid = await v$.value.$validate()

  try {
    if (isFormValid) {
      const { data } = await api.delete(`/api/v1/admin/users/${props.id}`, {
        data: { email: form.value.email },
      })
      if (data.status === 'OK') {
        // Message
        notifySuccess(data.message)
        // Clean input
        form.value.email = ''
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
      <DialogHeaderBack title="Delete" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleDeleteUser" class="q-pa-md q-gutter-md">
          <BaseInput
            icon="email"
            v-model="form.email"
            label="Confirm with email"
            type="email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message"
            @blur="v$.email.$touch()"
          />

          <div class="row justify-center fixed-bottom q-pb-lg q-gutter-sm">
            <q-btn label="Delete" type="submit" rounded :loading="isLoading" color="red">
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
