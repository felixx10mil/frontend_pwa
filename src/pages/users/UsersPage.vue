<script setup>
import { ref, provide } from 'vue'
import { useQuasar } from 'quasar'
import { useFetchUsers } from 'src/composables/fetch.js'
import ListUsers from 'src/components/users/ListUsers.vue'
import DialogCreateUser from 'src/components/dialogs/user/DialogCreateUser.vue'
import SearchInput from 'src/components/form/SearchInput.vue'

const $q = useQuasar()
const search = ref('')
const { data, refresh } = useFetchUsers('admin/users')
provide('search', search)

// Create user
function createUser() {
  $q.dialog({
    component: DialogCreateUser,
  })
    .onOk(() => {})
    .onCancel(() => {
      refresh()
    })
}
</script>

<template>
  <q-page padding>
    <div v-if="data">
      <SearchInput icon="search" v-model="search" label="Search" type="text" />
      <ListUsers :data="data" />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="createUser" />
      </q-page-sticky>
    </div>
    <div v-else>Null</div>
  </q-page>
</template>
