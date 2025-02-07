<template>
  <var-paper :elevation="2">
    <AtomViewer title="Atom No.1" />
  </var-paper>
</template>

<script>
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
