<script setup>
import { navs } from 'src/router/navs'
</script>

<template>
  <q-footer
    bordered
    v-if="$route.name === 'users' || $route.name === 'home' || $route.name === 'profile'"
  >
    <q-tabs
      no-caps
      switch-indicator
      indicator-color="transparent"
      active-color="white"
      class="bg-primary text-grey-5 shadow-2"
    >
      <q-route-tab
        align="center"
        v-for="(nav, index) in navs"
        :key="index"
        :to="nav.route"
        :icon="nav.icon"
        :label="nav.title"
      />
    </q-tabs>
  </q-footer>
</template>
<style scoped></style>
