<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import HeaderBack from 'src/components/headers/HeaderBack.vue'
import FooterToolbar from 'src/components/footers/FooterToolbar.vue'

const $q = useQuasar()

onMounted(() => {
  const darkMode = $q.localStorage.getItem('darkMode')
  $q.dark.set(darkMode)
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderBack />
    <q-page-container>
      <router-view />
    </q-page-container>
    <FooterToolbar />
  </q-layout>
</template>
<style scoped></style>
