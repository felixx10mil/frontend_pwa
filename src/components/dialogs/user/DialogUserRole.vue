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
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <DialogHeaderBack title="Roles" @customDialogCancel="onDialogCancel()" />
      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleUpdateRole">
          <div class="col-12 q-gutter-y-md">
            <q-option-group
              v-model="form.roles"
              :options="options.roles"
              color="primary"
              type="checkbox"
            />

            <div class="text-center">
              <q-btn
                label="Update"
                type="submit"
                rounded
                :loading="isLoading"
                color="primary"
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
