<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Bosh sahifa</RouterLink>
        <RouterLink to="/category">Turkumlar</RouterLink>
      </nav>
      <div class="main">
        <RouterView />
      </div>
    </div>
</template>

<style lang="scss">
  @import '@/styles/main.scss'
</style>
