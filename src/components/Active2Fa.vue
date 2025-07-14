<script setup>
import { ref, watchEffect } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/UseNotify'

const props = defineProps({
  id: { type: Number, required: true },
  f2a: { type: String, required: true },
})

const $q = useQuasar()
const { notifySuccess } = useNotify()
const is2fa = ref('inactive')

watchEffect(() => {
  is2fa.value = props.f2a
})

// Active 2fa
const active2Fa = async (is2fa) => {
  $q.loading.show({
    message: 'Loading...',
  })

  try {
    const { data } = await api.patch(`/api/v1/users/active/is2fa/${props.id}`, {
      is2fa: is2fa,
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
    v-model="is2fa"
    true-value="active"
    false-value="inactive"
    checked-icon="done"
    unchecked-icon="close"
    size="xl"
    @update:model-value="(value) => active2Fa(value)"
  />
</template>
