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

// Return data filtered
const getUsers = computed(() => {
  if (filter.value === '') {
    return users.value
  }
  return users.value.filter((user) => user.email.toLowerCase().includes(filter.value.toLowerCase()))
})

// return url api
const url_base = computed(() => process.env.API_URL)
</script>
<template>
  <q-list>
    <q-item
      clickable
      v-ripple
      v-for="{ id, name, email, status, email_verified_at, profile } in getUsers"
      :key="id"
      :to="{ name: 'users.settings', params: { id: id } }"
    >
      <q-item-section avatar>
        <q-avatar>
          <img crossorigin="anonymous" :src="`${url_base}/files/${profile.avatar}`" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label
          >{{ name }}
          <q-icon
            :name="status === 'active' ? 'done_all' : ''"
            :color="status === 'active' ? 'positive' : ''"
            size="16px"
          />
        </q-item-label>
        <q-item-label caption>
          {{ email }}
          <q-icon
            :name="email_verified_at ? 'done_all' : ''"
            :color="email_verified_at ? 'positive' : ''"
            size="16px"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-if="!getUsers.length" class="text-grey"> No results found on this page! </q-item>
  </q-list>
</template>
<style scoped></style>
