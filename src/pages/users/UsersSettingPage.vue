<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useFetchUser } from 'src/composables/fetchUser'
import { useFetchRoles } from 'src/composables/fetchRoles'
import { useFetchRolesByUser } from 'src/composables/fetchRolesByUser'
import DialogUserDelete from 'src/components/dialogs/user/DialogUserDelete.vue'
import DialogUserRole from 'src/components/dialogs/user/DialogUserRole.vue'
import UserInfo from 'src/components/users/UserInfo.vue'
import HandleStatusUser from 'src/components/HandleStatusUser.vue'
import SettingSkeleton from 'src/components/skeletons/SettingSkeleton.vue'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

// Returns the processed parameter
const userId = computed(() => parseInt(route.params.id))

// Return data user
const { user } = useFetchUser(() => `/api/v1/users/${userId.value}`)
// Return roles
const { roles, refreshRoles } = useFetchRoles('/api/v1/admin/roles')
// Return roles by user
const { rolesByUser } = useFetchRolesByUser(() => `/api/v1/admin/roles/by/user/${userId.value}`)

// Update roles
function updateRoles() {
  $q.dialog({
    component: DialogUserRole,
    componentProps: {
      id: userId.value,
      roles: roles,
      rolesByUser: rolesByUser,
    },
  })
    .onOk(() => {
      refreshRoles()
    })
    .onCancel(() => {})
}
// Delete account
function userDelete() {
  $q.dialog({
    component: DialogUserDelete,
    componentProps: {
      id: userId.value,
    },
  })
    .onOk(() => {
      router.push({ name: 'users' })
    })
    .onCancel(() => {})
}
</script>

<template>
  <q-page padding>
    <q-list v-if="user">
      <UserInfo :user="user" />
      <q-item v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="change_circle" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Status</q-item-label>
          <q-item-label caption> Activate or deactivate the user's account </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <!-- Recibe props id,statusUser -->
          <HandleStatusUser :id="userId" :statusUser="user.status" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="updateRoles">
        <q-item-section avatar top>
          <q-avatar icon="admin_panel_settings" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Roles</q-item-label>
          <q-item-label caption> Update roles </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="userDelete">
        <q-item-section avatar top>
          <q-avatar icon="person_remove" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Delete</q-item-label>
          <q-item-label caption> Deletes the user's account </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <SettingSkeleton v-else :rows="3" />
  </q-page>
</template>
