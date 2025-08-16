<script setup>
import { useDialogPluginComponent } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'
import DialogHeaderBack from '../DialogHeaderBack.vue'

const props = defineProps({
  id: { type: Number, required: true },
  roles: { type: Object, required: true },
  rolesByUser: { type: Object, required: true },
})

defineEmits([...useDialogPluginComponent.emits])

const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

// Option roles
const options = ref({
  roles: props.roles,
})

// Roles by user
const form = ref({
  roles: props.rolesByUser,
})

// Loading initial value
const isLoading = ref(false)

// Update Roles
async function handleUpdateRole() {
  // Start loading
  isLoading.value = true

  // Fetch axios
  try {
    const { data } = await api.put(`/api/v1/admin/roles/user/${props.id}`, form.value)
    if (data.status === 'OK') {
      // Notify
      notifySuccess(data.message)
      // Close dialog
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
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="q-dialog-plugin">
      <DialogHeaderBack title="Roles" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form @submit.prevent="handleUpdateRole" class="q-gutter-y-sm">
          <q-option-group
            v-model="form.roles"
            :options="options.roles"
            color="primary"
            type="checkbox"
          />

          <div class="row justify-center fixed-bottom q-pa-lg q-gutter-x-sm">
            <q-btn label="SAVE" type="submit" :loading="isLoading" color="primary">
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
