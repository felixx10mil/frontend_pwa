<script setup>
import { computed } from 'vue'

defineProps({
  user: { type: Object, required: true },
})
// return url api
const url_base = computed(() => process.env.API_URL)
</script>
<template>
  <q-card class="q-mb-lg">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img crossorigin="anonymous" :src="`${url_base}/files/${user.profile?.avatar}`" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-h5">
          {{ user.profile?.first_name }} {{ user.profile?.last_name }}
        </q-item-label>
        <q-item-label caption>{{ user.email }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
