<script setup></script>
<template>
  <q-header>
    <q-toolbar :class="$q.dark.isActive ? 'dark-custom text-white' : 'bg-white text-black'">
      <q-btn
        flat
        dense
        round
        icon="arrow_back"
        :to="$route.name === 'users.settings' ? '/users' : '/home'"
      />
      <q-toolbar-title class="absolute-center">
        <strong>
          {{ $route.meta.title }}
        </strong>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.dark-custom {
  background: #121212;
}
</style>
