<script setup>
import { ref, watchEffect } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/UseNotify'

const props = defineProps({
  id: { type: Number, required: true },
  statusUser: { type: String, required: true },
})

const $q = useQuasar()
const status = ref('inactive')
const { notifySuccess } = useNotify()

watchEffect(() => {
  status.value = props.statusUser
})

// Update status
const updateStatus = async (status) => {
  $q.loading.show({
    message: 'Loading...',
  })

  try {
    const { data } = await api.patch(`/api/v1/admin/status/user/${props.id}`, {
      status: status,
    })
    if (data.status === 'OK') {
      notifySuccess(data.message)
    }
  } catch (error) {
    if (error) console.log('Oops!')
  } finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <q-toggle
    color="accent"
    v-model="status"
    true-value="active"
    false-value="inactive"
    checked-icon="done"
    unchecked-icon="close"
    size="xl"
    @update:model-value="(value) => updateStatus(value)"
  />
</template>
