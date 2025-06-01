<script setup>
import { computed, ref, watchEffect, inject } from 'vue'

const props = defineProps({
  data: { type: Object, required: true },
})
const filter = inject('search')
const users = ref([])

watchEffect(() => {
  users.value = props.data
})

const getUsers = computed(() => {
  if (filter.value === '') {
    return users.value
  }
  return users.value.filter((user) => user.email.toLowerCase().includes(filter.value.toLowerCase()))
})
</script>
<template>
  <q-list>
    <q-item
      clickable
      v-ripple
      v-for="{ id, name, email, profile } in getUsers"
      :key="id"
      :to="{ name: 'users.settings', params: { id: id } }"
    >
      <q-item-section avatar>
        <q-avatar>
          <img
            crossorigin="anonymous"
            :src="`https://api2.eresvisible.com/files/${profile.avatar}`"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ name }}</q-item-label>
        <q-item-label caption>
          {{ email }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-if="!getUsers.length" class="text-grey"> No results found on this page! </q-item>
  </q-list>
</template>
<style scoped></style>
