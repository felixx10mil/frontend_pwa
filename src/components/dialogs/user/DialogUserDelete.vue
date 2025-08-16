<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import DialogHeaderBack from '../DialogHeaderBack.vue'
import InputBase from 'src/components/form/InputBase.vue'

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
      const { data } = await api.delete(`/api/v1/admin/user/${props.id}`, {
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
    transition-hide="slide-right"
  >
    <q-card class="q-dialog-plugin">
      <DialogHeaderBack title="Delete" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleDeleteUser" class="q-gutter-y-sm">
          <div class="text-caption">Enter the email address of the user you wish to delete.</div>
          <InputBase
            type="email"
            label="E-mail"
            icon="email"
            v-model="form.email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message"
            @blur="v$.email.$touch()"
          />

          <div class="row justify-center fixed-bottom q-pa-lg q-gutter-x-sm">
            <q-btn label="Delete" type="submit" :loading="isLoading" color="red">
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
