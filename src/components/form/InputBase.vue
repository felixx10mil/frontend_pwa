<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    required: true,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
})
</script>
<template>
  <q-input
    dense
    outlined
    :type="type"
    :label="label"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>
