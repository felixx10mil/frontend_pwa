<script setup>
import { ref, onMounted, provide } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import ErrorHttp from 'src/components/errors/ErrorHttp.vue'
import UsersSkeleton from 'src/components/skeletons/UsersSkeleton.vue'
import ListUsers from 'src/components/users/ListUsers.vue'
import DialogCreateUser from 'src/components/dialogs/user/DialogCreateUser.vue'
import SearchInput from 'src/components/form/SearchInput.vue'

const $q = useQuasar()
const search = ref('')
const users = ref([])
const errorInfo = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const skeleton = ref(true)
provide('search', search)

setTimeout(() => {
  skeleton.value = false
}, 3000)

onMounted(() => {
  handleGetUsers()
})

// Users
async function handleGetUsers(page = 1, size = 6) {
  const config = {
    params: { page, size },
  }
  try {
    const { data } = await api.get('admin/users', config)
    if (data.status === 'OK') {
      users.value = data.data.items
      totalPages.value = data.data.totalPages
      currentPage.value = data.data.currentPage
    }
  } catch (error) {
    if (error.response) {
      errorInfo.value = error.response
      console.error('Oops! Error.')
    }
  } finally {
    // Load spinner hiden
    $q.loading.hide()
  }
}
// Load page
function handleNextPage(page) {
  // Load spinner hiden
  $q.loading.show({
    message: 'Loading, please wait...',
  })

  handleGetUsers(page, 6)
}
// Create user
function createUser() {
  $q.dialog({
    component: DialogCreateUser,
  })
    .onOk(() => {
      handleGetUsers()
    })
    .onCancel(() => {})
}
</script>

<template>
  <q-page padding>
    <UsersSkeleton v-if="skeleton" />
    <div v-else>
      <div v-if="users.length > 0">
        <SearchInput
          icon="search"
          v-model="search"
          label="Search"
          type="text"
          @some-event="createUser"
        />
        <ListUsers :data="users" />
        <div v-if="totalPages > 1" class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            input
            @update:model-value="(value) => handleNextPage(value)"
          />
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="primary" @click="createUser" />
        </q-page-sticky>
      </div>
      <ErrorHttp v-else :error="errorInfo" />
    </div>
  </q-page>
</template>
