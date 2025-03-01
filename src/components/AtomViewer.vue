<template>
    <div class="atom" v-if="thisAtom">


        <div class="atom-head">
            <!-- Title -->
            <h1>{{ thisAtom.title }}</h1>

            <!-- Tags -->
            <var-space>
                <var-badge v-for="tag in thisAtom.tags" :key="tag" :value="tag" type="primary" />
            </var-space>
            <br>

            <!-- Infos -->
            <li class="atom-info">ID: {{ thisAtom.id }}</li>
            <li class="atom-info">Last Modified: {{ thisAtom.last_modified }}</li>
        </div>


        <div class="atom-contents">
            <h3>Contents</h3>
            <div class="quarks-container">
                <draggable :list="thisAtom.contents" animation="200" :item-key="(x) => x" ghost-class="ghost"
                    handle=".drag-handle,.quark-icon" @end="onReorderQuark">

                    <!-- Quark element -->
                    <template #item="{ element }">
                        <var-paper class="quark-container" :elevation="1">
                            <!-- Drag handler -->
                            <div class="drag-handle">
                                <var-icon name="menu" color="grey" />
                            </div>
                            <!-- Quark Viewer -->
                            <quark-viewer :quarkID="element" />
                        </var-paper>
                    </template>

                    <!-- Footer Controller -->
                    <template #footer>
                        <var-button @click="addQuark" type="primary">+ Quark</var-button>
                    </template>

                </draggable>
            </div>
        </div>


    </div>

    <div>
        <QuarkEditDialog :activate="d_qe_activate" :add_quark="_add_quark_complete"
            :close-dialog="() => d_qe_activate = false" />
    </div>
</template>

<script setup>
import draggable from 'vuedraggable';

import QuarkViewer from './QuarkViewer.vue';
import QuarkEditDialog from './QuarkEditDialog.vue';

import { ref, defineProps } from 'vue';

const props = defineProps({
    atomID: String,
});

const d_qe_activate = ref(false);

// initial thisAtom
function refresh_atom() {
    var API = "http://localhost:8000/atom/" + props.atomID;
    fetch(API)
        .then(response => response.json())
        .then(data => {
            thisAtom.value = data.atom;
        });
}
const thisAtom = ref({
  "title": "Loading ..."
});
refresh_atom()

function onReorderQuark() {
    update_atom();
}

/* Add Qurk */
function addQuark() {
    d_qe_activate.value = true;
}

function _add_quark_complete(new_quarks) {
    for (var i = 0; i < new_quarks.length; i++) {
        thisAtom.value.contents.push(new_quarks[i]);
    }
    update_atom();
}

function update_atom() {
    var API = "http://localhost:8000/atom/" + thisAtom.value.id + "/editquarks";
    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quarks: thisAtom.value.contents
        })
    });
    // thisAtom.value = refresh_atom();
}

</script>

<script>
export default {
    name: 'AtomViewer'
}
</script>

<style scoped>
/* atom */
.atom {
    margin: 1rem;
}

.atom-head>h1 {
    margin-bottom: 0;
}

.atom-info {
    list-style-type: none;
    color: grey;
    font-size: 0.8rem;
    padding: 0;
}

/* Quark */
.quark-container {
    padding: 1rem 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
}

/* draggable */
.drag-handle {
    float: left;
    margin-right: 0.5rem;
}

.ghost {
    opacity: 0;
}
</style>