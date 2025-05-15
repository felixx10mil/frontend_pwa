<script setup>
defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: '',
  },
  icon: {
    type: String,
    required: true,
    default: '',
  },
})
</script>
<template>
  <q-input
    dense
    outlined
    v-bind="$attrs"
    :label="label"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>
<style scoped></style>
