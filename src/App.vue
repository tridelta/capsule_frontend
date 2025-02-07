<template>
  <var-paper :elevation="2">
    <AtomDisplay title="Atom No.1" />
  </var-paper>
</template>

<script>
// main app
import AtomDisplay from './components/Atom.vue'

export default {
  name: 'App',
  components: {
    AtomDisplay
  }
}
</script>

<style>
#app {}
</style>
