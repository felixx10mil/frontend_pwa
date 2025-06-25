<script setup>
import { ref, onMounted } from 'vue'
import { navs } from 'src/router/navs'
import { useQuasar } from 'quasar'
import FooterToolbar from 'src/components/footers/FooterToolbar.vue'

const leftDrawerOpen = ref(false)
const $q = useQuasar()

onMounted(() => {
  const darkMode = $q.localStorage.getItem('darkMode')
  $q.dark.set(darkMode)
})

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
        <q-toolbar-title class="absolute-center">
          <strong>Dashboard</strong>
        </q-toolbar-title>
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
