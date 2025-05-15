<script setup></script>
<template>
  <q-card-section>
    <q-skeleton type="QChip" width="100%" />
  </q-card-section>

  <q-item v-for="n in 10" :key="n">
    <q-item-section avatar>
      <q-skeleton type="QAvatar" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" width="30%" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" width="100%" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
