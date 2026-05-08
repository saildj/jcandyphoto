<template>
  <AppLayout />
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f2f5;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style>
