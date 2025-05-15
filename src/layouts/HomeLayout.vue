<script setup>
import { ref } from 'vue'
import { navs } from 'src/router/navs'
import FooterToolbar from 'src/components/footers/FooterToolbar.vue'
import useAuth from 'src/composables/UseAuth'

const { logout } = useAuth()
const leftDrawerOpen = ref(false)

// Logout
function handleLogout() {
  logout()
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$q.platform.is.desktop"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Quasar App </q-toolbar-title>
        <q-btn-dropdown flat icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Log out </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer v-if="$q.platform.is.desktop" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable v-for="(nav, index) in navs" :key="index" :to="nav.route" exact>
          <q-item-section v-if="nav.icon" avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.title }}</q-item-label>
            <q-item-label caption>{{ nav.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideInRight"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <FooterToolbar />
  </q-layout>
</template>

<style scoped></style>
