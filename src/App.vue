<template>
  <div class="atom-container">
    <var-space direction="column" wrap="wrap">
      <var-paper :elevation="2" v-for="aid in atomList" :key="aid">
        <AtomViewer :atomID="aid" :tempAtom="aid[0]=='?'" :atomUpd="onAtomUpdate(aid)" />
      </var-paper>
    </var-space>

    <div class="controllers">
      <var-button type="primary" @click="addAtom()">+ Atom</var-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const atomList = ref(['?-loading']);

function fetchAtoms() {
  // fetch atoms from server
  var API = "http://localhost:8000/atom_list";
  fetch(API)
    .then(response => response.json())
    .then(data => {
      atomList.value = data.atom_list;
    });
}
fetchAtoms();

function addAtom() {
  // generate new id
  var _newid = `?-${Math.random()}-${performance.now()}`;

  atomList.value.push(_newid);
}

function onAtomUpdate(aid) {
  function __helper(atom_id) {
    console.log('Atom Updated: ' + atom_id);
    if (aid[0] == '?') {
      // replace the temporary id with the real one
      var _idx = atomList.value.indexOf(aid);
      atomList.value[_idx] = atom_id;
    }
  }

  return __helper;
}
</script>

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
