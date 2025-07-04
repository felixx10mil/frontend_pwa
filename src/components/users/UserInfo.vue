<script setup>
import { computed } from 'vue'

defineProps({
  user: { type: Object, required: true },
})
// return url api
const url_base = computed(() => process.env.API_URL)
</script>
<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar>
        <img crossorigin="anonymous" :src="`${url_base}/files/${user.profile?.avatar}`" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ user.email }}</q-item-label>
      <q-item-label caption v-if="user.profile?.first_name">
        {{ user.profile?.first_name }} {{ user.profile?.last_name }}
      </q-item-label>
      <q-item-label caption v-if="user.profile?.biography">
        {{ user.profile?.biography }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
