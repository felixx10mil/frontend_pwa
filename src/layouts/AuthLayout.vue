<script setup>
import DarkMode from 'src/components/DarkMode.vue'
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar>
      <q-btn flat dense round icon="arrow_back" to="/" v-if="$route.name !== 'welcome'" />
      <q-space />
      <DarkMode sizeToggle="xl" v-if="$route.name === 'welcome'" />
    </q-toolbar>
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
  </q-layout>
</template>
<style scoped></style>
