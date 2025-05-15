<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  passwordValue: {
    type: String,
    required: true,
  },
})
const has_minimum_lenth = ref(false)
const has_number = ref(false)
const has_lowercase = ref(false)
const has_uppercase = ref(false)
const has_special = ref(false)

watchEffect(() => {
  has_number.value = /\d/.test(props.passwordValue) // Number
  has_lowercase.value = /[a-z]/.test(props.passwordValue) // Letras minusculas
  has_uppercase.value = /[A-Z]/.test(props.passwordValue) // Letras mayusculas
  has_special.value = /.*\W$/.test(props.passwordValue) // Caracteres especiales
  has_minimum_lenth.value = props.passwordValue.length >= 7 && props.passwordValue.length <= 12
})
</script>

<template>
  <div>
    <div class="text-subtitle2 q-mb-sm">Password:</div>
    <div>
      <q-icon
        :name="has_minimum_lenth ? 'verified' : 'clear'"
        :color="has_minimum_lenth ? 'positive' : 'negative'"
      ></q-icon>
      Must be between 7 and 12 digits.
    </div>
    <div>
      <q-icon
        :name="has_number ? 'verified' : 'clear'"
        :color="has_number ? 'positive' : 'negative'"
      ></q-icon>
      Must contain a digit from 1 to 9.
    </div>
    <div>
      <q-icon
        :name="has_lowercase ? 'verified' : 'clear'"
        :color="has_lowercase ? 'positive' : 'negative'"
      ></q-icon>
      Must contain lowercase letters.
    </div>
    <div>
      <q-icon
        :name="has_uppercase ? 'verified' : 'clear'"
        :color="has_uppercase ? 'positive' : 'negative'"
      ></q-icon>
      Must contain capital letter.
    </div>
    <div>
      <q-icon
        :name="has_special ? 'verified' : 'clear'"
        :color="has_special ? 'positive' : 'negative'"
      ></q-icon>
      Must contain a special character.
    </div>
  </div>
</template>
