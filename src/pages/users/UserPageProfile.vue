<script setup>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-storage'
import { useFetchUser } from 'src/composables/fetch.js'
import DialogEditPassword from 'src/components/dialogs/user/DialogEditPassword.vue'
import DialogEditAccount from 'src/components/dialogs/user/DialogEditAccount.vue'
import DialogEditPhoto from 'src/components/dialogs/user/DialogEditPhoto.vue'
import DialogEditProfile from 'src/components/dialogs/user/DialogEditProfile.vue'
import DarkMode from 'src/components/DarkMode.vue'
import UserInfo from 'src/components/users/UserInfo.vue'

const $q = useQuasar()
const store = useAuthStore()
const { data, refresh } = useFetchUser(`users/${store.getStateId}`)

function updatePassword() {
  $q.dialog({
    component: DialogEditPassword,
  })
    .onOk(() => {})
    .onCancel(() => {})
}

function updateProfile() {
  $q.dialog({
    component: DialogEditProfile,
    componentProps: {
      data: data.value,
    },
  })
    .onOk(() => refresh())
    .onCancel(() => {})
}

function updatePhoto() {
  $q.dialog({
    component: DialogEditPhoto,
  })
    .onOk(() => refresh())
    .onCancel(() => {})
}

function updateAccount() {
  $q.dialog({
    component: DialogEditAccount,
    componentProps: {
      data: data.value,
    },
  })
    .onOk(() => refresh())
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
          <q-avatar icon="contrast" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dark mode</q-item-label>
          <q-item-label caption> Enables or disables dark mode </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <DarkMode sizeToggle="xl" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="updatePassword">
        <q-item-section avatar top>
          <q-avatar icon="password" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Password</q-item-label>
          <q-item-label caption> Update the user's password </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="updateAccount">
        <q-item-section avatar top>
          <q-avatar icon="account_circle" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Account</q-item-label>
          <q-item-label caption> Update the user's email and name </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="updatePhoto">
        <q-item-section avatar top>
          <q-avatar icon="image" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Photo</q-item-label>
          <q-item-label caption> Update the user's photo </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="updateProfile">
        <q-item-section avatar top>
          <q-avatar icon="person" color="primary" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Profile</q-item-label>
          <q-item-label caption>
            Update the user's first name, last name and biography.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<style scoped></style>
