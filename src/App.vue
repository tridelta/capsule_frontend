<template>
  <div class="atom-container">
    <var-space direction="column" wrap="wrap">
      <var-paper :elevation="2" v-for="aid in atomList" :key="aid">
        <AtomEditView :atomID="aid" :tempAtom="aid[0]=='?'" :atomUpd="onAtomUpdate(aid)" />
      </var-paper>
    </var-space>

    <div class="controllers">
      <var-button type="primary" @click="addAtom()">+ Atom</var-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import API_PREFIX from './apiConfig';

const atomList = ref(['?-loading']);

function fetchAtoms() {
  // fetch atoms from server
  const API = `${API_PREFIX}/atom_list`;
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
// eslint-disable-next-line no-unused-vars
import AtomEditView from './components/AtomEditView.vue';
// eslint-disable-next-line no-unused-vars
import AtomCardView from './components/AtomCardView.vue';

export default {
  name: 'App'
}
</script>

<style>
#app {}
</style>
