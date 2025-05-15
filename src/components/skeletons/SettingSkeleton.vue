<script setup>
defineProps({
  rows: { type: Number, required: true },
})
</script>
<template>
  <q-item>
    <q-item-section avatar>
      <q-skeleton size="56px" square />
    </q-item-section>
    <q-item-section>
      <q-skeleton type="text" square width="30%" />
      <q-skeleton type="text" square height="12px" />
      <q-skeleton type="text" square height="12px" width="75%" />
    </q-item-section>
  </q-item>
  <q-item v-for="n in rows" :key="n">
    <q-item-section avatar>
      <q-skeleton type="QAvatar" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" width="30%" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" width="100%" />
        <q-skeleton type="text" width="100%" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
