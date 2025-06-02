<script setup>
import { ref, provide } from 'vue'
import { useQuasar } from 'quasar'
import { useFetchUsers } from 'src/composables/fetch.js'
import ListUsers from 'src/components/users/ListUsers.vue'
import DialogCreateUser from 'src/components/dialogs/user/DialogCreateUser.vue'
import SearchInput from 'src/components/form/SearchInput.vue'
import UsersSkeleton from 'src/components/skeletons/UsersSkeleton.vue'

const $q = useQuasar()
const search = ref('')
const { data, refresh } = useFetchUsers('/api/v1/admin/users')
provide('search', search)

// Create user
function createUser() {
  $q.dialog({
    component: DialogCreateUser,
  })
    .onOk(() => refresh())
    .onCancel(() => {})
}
</script>

<template>
  <q-page padding>
    <div v-if="data && data.length">
      <SearchInput icon="search" v-model="search" label="Search" type="text" />
      <ListUsers :data="data" />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="createUser" />
      </q-page-sticky>
    </div>
    <UsersSkeleton v-else />
  </q-page>
</template>
