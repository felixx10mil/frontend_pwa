<script setup>
defineProps({
  error: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="text-primary text-center q-pa-md flex flex-center">
    <div>
      <img alt="Quasar logo" src="~assets/error-http.svg" style="width: 300px; height: 250px" />
      <div style="font-size: 10vh">Oops!</div>
      <div class="text-h4" style="opacity: 0.4">{{ error }}</div>
      <q-btn class="q-mt-lg" color="primary" unelevated to="/home" label="Go home" no-caps />
    </div>
  </div>
</template>
<style scoped></style>
