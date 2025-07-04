<script setup>
defineProps({
  title: { type: String, required: true },
})
// customDialogClose
const emit = defineEmits(['customDialogCancel'])
const closeModal = () => {
  emit('customDialogCancel')
}
</script>
<template>
  <q-toolbar>
    <q-btn flat dense round icon="arrow_back" @click="closeModal()" />
    <q-toolbar-title class="absolute-center">
      <strong>{{ title }} </strong>
    </q-toolbar-title>
  </q-toolbar>
</template>
<style scoped></style>
