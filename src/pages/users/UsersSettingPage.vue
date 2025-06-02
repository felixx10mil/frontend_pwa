<script setup>
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useFetchUser } from 'src/composables/fetch.js'
import DialogUserDelete from 'src/components/dialogs/user/DialogUserDelete.vue'
import DialogUserRole from 'src/components/dialogs/user/DialogUserRole.vue'
import UserInfo from 'src/components/users/UserInfo.vue'
import HandleStatusUser from 'src/components/HandleStatusUser.vue'
import SettingSkeleton from 'src/components/skeletons/SettingSkeleton.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const $q = useQuasar()
const router = useRouter()
const { data } = useFetchUser(`/api/v1/users/${props.id}`)

// Update roles
function updateRoles() {
  $q.dialog({
    component: DialogUserRole,
    componentProps: {
      id: props.id,
    },
  })
    .onOk(() => {})
    .onCancel(() => {})
}
// Delete account
function userDelete() {
  $q.dialog({
    component: DialogUserDelete,
    componentProps: {
      id: props.id,
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
    <q-list v-if="data">
      <UserInfo :user="data" />
      <q-separator />
      <q-item v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="published_with_changes" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Status</q-item-label>
          <q-item-label caption>
            Change the user's status by activating or deactivating his account
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <!-- Recibe props id,statusUser -->
          <HandleStatusUser :id="id" :statusUser="data.status" />
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
