<script setup>
defineProps({
  title: { type: String, required: true },
  maximizedToggle: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['updateModalSize'])
const sizeModal = (val) => {
  emit('updateModalSize', val)
}
</script>
<template>
  <q-bar class="bg-primary text-white">
    <div class="text-weight-bold">
      {{ title }}
    </div>
    <q-space />
    <q-btn dense flat icon="fullscreen_exit" @click="sizeModal(false)" :disable="!maximizedToggle">
      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
    </q-btn>
    <q-btn dense flat icon="fullscreen" @click="sizeModal(true)" :disable="maximizedToggle">
      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
    </q-btn>
    <q-btn dense flat icon="close" v-close-popup>
      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
    </q-btn>
  </q-bar>
</template>
<style scoped></style>
