<template>
  <var-paper :elevation="2">
    <AtomViewer title="Atom No.1" :this-atom="defaultAtom" :refresh="(aid) => refresh_atom(defaultAtom, aid)" />
  </var-paper>
</template>

<script setup>

function refresh_atom(atom, aid) {
  console.log('refreshing atom', aid);

  var API = "http://localhost:8000/atom/" + aid;
  fetch(API)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      atom = data;
    });
}

var defaultAtom = {
  id: "A-1",
  title: 'Atom No.1',
  tags: ['tag1', 'tag2', 'tag3'],
  last_modified: '2021-10-01',
  contents: [
    // {
    //   id: 'Q-1',
    //   type: 'text',
    //   content: 'This is a text quark\n## It supports markdown\n\n- list item 1\n- list item 2',
    //   transcripts: []
    // },
    // {
    //   id: 'Q-2',
    //   type: 'image',
    //   content: 'https://varletjs.org/cat.jpg',
    //   transcripts: [
    //     {
    //       type: 'transcript/info',
    //       content: '[time] 2024-10-01 12:00:00\n[location] somewhere\n[resolution] 1920x1080'
    //     },
    //     {
    //       type: 'transcript/explain',
    //       content: 'The image shows two cat lying on the ground'
    //     }
    //   ]
    // },
    // {
    //   id: 'Q-3',
    //   type: 'text',
    //   content: 'This is another text quark',
    //   transcripts: []
    // }
  ]
}
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
