<script setup>
defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  modelValue: {
    type: [String],
    required: true,
    default: '',
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
})
</script>
<template>
  <q-select
    dense
    outlined
    v-bind="$attrs"
    :model-value="modelValue"
    :label="label"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-select>
</template>
