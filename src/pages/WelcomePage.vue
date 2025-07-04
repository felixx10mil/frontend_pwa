<script setup>
import { ref } from 'vue'

const slide = ref('style')
const lorem =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet accusamus possimus voluptatem at? Distinctio sint animi quos voluptatibus dolorem. Rerum, libero cum? Euma nimi mollitia quod earum, officia amet ipsa?'
</script>
<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <img alt="Quasar logo" src="~assets/mi_logo_app.svg" style="width: 250px; height: 250px" />
      <q-card class="no-shadow transparent create-card">
        <div class="q-pa-md">
          <q-carousel
            v-model="slide"
            swipeable
            animated
            navigation
            control-color="grey-7"
            padding
            height="400px"
            class="bg-transparent text-grey-7 rounded-borders"
          >
            <q-carousel-slide name="style" class="column no-wrap flex-center">
              <q-icon name="person_search" size="128px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tv" class="column no-wrap flex-center">
              <q-icon name="payments" size="128px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="layers" class="column no-wrap flex-center">
              <q-icon name="task_alt" size="128px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>

        <q-card-actions vertical align="center">
          <q-btn rounded color="primary" class="full-width q-mb-sm" to="/login" no-caps
            >Log in</q-btn
          >
          <q-btn outline rounded color="accent" class="full-width" to="/signup" no-caps
            >Sign up</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<style scoped>
.create-card {
  width: 100%;
  max-width: 400px;
}
</style>
