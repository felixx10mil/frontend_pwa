<script setup>
import { ref, provide } from 'vue'
import { useQuasar } from 'quasar'
import { useFetchUsers } from 'src/composables/fetchUsers'
import ListUsers from 'src/components/users/ListUsers.vue'
import DialogCreateUser from 'src/components/dialogs/user/DialogCreateUser.vue'
import SearchInput from 'src/components/form/SearchInput.vue'
import UsersSkeleton from 'src/components/skeletons/UsersSkeleton.vue'

const $q = useQuasar()
const search = ref('')
const { users, refreshUsers } = useFetchUsers('/api/v1/admin/users')
provide('search', search)

// Create user
function createUser() {
  $q.dialog({
    component: DialogCreateUser,
  })
    .onOk(() => refreshUsers())
    .onCancel(() => {})
}
</script>

<template>
  <q-page padding>
    <div v-if="users && users.length">
      <SearchInput icon="search" v-model="search" label="Search" type="text" />
      <ListUsers :data="users" />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="createUser" />
      </q-page-sticky>
    </div>
    <UsersSkeleton v-else />
  </q-page>
</template>
