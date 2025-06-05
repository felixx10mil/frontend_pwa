<script setup>
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { ref } from 'vue'
import { api } from 'boot/axios'
import useNotify from 'src/composables/UseNotify'

const props = defineProps({
  id: { type: Number, required: true },
})

defineEmits([...useDialogPluginComponent.emits])

const { notifySuccess } = useNotify()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const optionsRoles = ref([])
const form = ref({
  roles: [],
})
const isLoading = ref(false)
const $q = useQuasar()

// Load roles
async function handleLoadRoles() {
  $q.loading.show({
    message: 'Loading...',
  })
  try {
    const { data } = await api.get(`/api/v1/admin/users/roles/${props.id}`)
    if (data.status === 'OK') {
      optionsRoles.value = data.roles.roleAll
      form.value.roles = data.roles.roleByUser
    }
  } catch (error) {
    if (error) console.log('Oops!')
  } finally {
    $q.loading.hide()
  }
}

// Update Roles
async function handleUpdateRole() {
  // Start loading
  isLoading.value = true

  // Fetch axios
  try {
    const { data } = await api.put(`/api/v1/admin/users/roles/${props.id}`, form.value)
    if (data.status === 'OK') {
      // Reload roles
      handleLoadRoles()
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

handleLoadRoles()
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
    <q-card class="q-dialog-plugin" v-if="optionsRoles.length >= 1">
      <q-card-section>
        <div class="text-h6">Roles</div>
      </q-card-section>
      <q-card-section>
        <q-form class="row justify-center full-width" @submit.prevent="handleUpdateRole">
          <div class="col-12 q-gutter-y-md">
            <q-option-group
              v-model="form.roles"
              :options="optionsRoles"
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
