<template>
  <var-paper :elevation="2">
    <AtomViewer atomID="A-1" />
  </var-paper>
</template>

<script setup>
</script>

<script>
// import { ref } from 'vue';

// main app
import AtomViewer from './components/AtomViewer.vue';

export default {
  name: 'App',
  components: {
    AtomViewer
  }
}
</script>

<style>
#app {}
</style>
