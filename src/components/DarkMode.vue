<script setup>
import { onMounted, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

defineProps({
  sizeToggle: {
    type: String,
    default: 'lg',
  },
})

const $q = useQuasar()
const darkMode = ref(false)

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode)
  $q.localStorage.set('darkMode', darkMode)
})

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem('darkMode')
  if (darkModeIsActive) {
    darkMode.value = true
  }
})
</script>

<template>
  <q-toggle
    v-model="darkMode"
    checked-icon="dark_mode"
    color="accent"
    unchecked-icon="wb_sunny"
    :size="sizeToggle"
  />
</template>
