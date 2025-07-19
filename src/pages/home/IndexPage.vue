<script setup>
import { ref } from 'vue'
const slide = ref(1)
const paragraph = ref(
  'paragraph ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia',
)
const students = [
  {
    id: 1,
    name: 'Ruddy Jedrzej',
    email: 'rjedrzej0@discuz.net',
    letter: 'R',
  },
  {
    id: 2,
    name: 'Mallorie Alessandrini',
    email: 'malessandrini1@marketwatch.com',
    letter: 'M',
  },
  {
    id: 3,
    name: 'Elisabetta Wicklen',
    email: 'ewicklen2@microsoft.com',
    letter: 'E',
  },
  {
    id: 4,
    name: 'Seka Fawdrey',
    email: 'sfawdrey3@wired.com',
    letter: 'S',
  },
]
</script>
<template>
  <q-page padding>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      navigation
      padding
      height="300px"
      class="bg-transparent rounded-borders"
    >
      <q-carousel-slide
        :name="1"
        class="column no-wrap flex-center"
        img-src="~assets/Banners/1.jpg"
      >
        <div class="q-mt-md text-center">
          {{ paragraph }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="2"
        class="column no-wrap flex-center"
        img-src="~assets/Banners/2.jpg"
      >
        <div class="q-mt-md text-center">
          {{ paragraph }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="3"
        class="column no-wrap flex-center"
        img-src="~assets/Banners/3.jpg"
      >
        <q-icon name="las la-folder-plus" size="56px" />
        <div class="q-mt-md text-center">
          {{ paragraph }}
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-list>
      <q-item-label header>Students</q-item-label>
      <q-item v-for="student in students" :key="student.id">
        <q-item-section avatar>
          <q-avatar square>
            <img src="~assets/Banners/boy-avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-bold"> {{ student.name }}</span></q-item-label
          >
          <q-item-label caption> {{ student.email }} </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon color="primary" name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
