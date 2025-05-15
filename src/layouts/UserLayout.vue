<script setup>
import HeaderBack from 'src/components/headers/HeaderBack.vue'
import FooterToolbar from 'src/components/footers/FooterToolbar.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderBack />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideInRight"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <FooterToolbar />
  </q-layout>
</template>
<style scoped></style>
