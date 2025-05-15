<script setup>
defineProps({
  user: { type: Object, required: true },
})
</script>
<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar rounded>
        <img crossorigin="anonymous" :src="`http://127.0.0.1:3000/files/${user.profile?.avatar}`" />
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
