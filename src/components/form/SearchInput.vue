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
    class="q-pa-md"
    dense
    outlined
    debounce="500"
    v-bind="$attrs"
    :label="label"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>
