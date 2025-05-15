<script setup></script>
<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <img alt="Quasar logo" src="~assets/hello.svg" style="width: 250px; height: 250px" />
      <q-card class="no-shadow transparent create-card">
        <q-card-section>
          <div class="text-h4 text-weight-bold">Name app</div>
          <div class="text-subtitle1">Everything you need in one place.</div>
          <div class="text-subtitle2" style="opacity: 0.4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet accusamus possimus
            voluptatem at? Distinctio sint animi quos voluptatibus dolorem. Rerum, libero cum? Eum
            animi mollitia quod earum, officia amet ipsa?
          </div>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn rounded color="primary" class="full-width q-mb-sm" to="/signin" no-caps
            >Sign in</q-btn
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
