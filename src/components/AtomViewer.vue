<template>
    <div class="atom">


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
                <draggable :list="thisAtom.contents" animation="200" itemKey="id" ghost-class="ghost"
                    handle=".drag-handle,.quark-icon" @end="onReorderQuark">

                    <!-- Quark element -->
                    <template #item="{ element }">
                        <var-paper class="quark-container" :elevation="1">
                            <!-- Drag handler -->
                            <div class="drag-handle">
                                <var-icon name="menu" color="grey" />
                            </div>
                            <!-- Quark Viewer -->
                            <quark-viewer :quark="element" />
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
        <QuarkEditDialog :activate="d_qe_activate" :close-dialog="()=>d_qe_activate=false"/>
    </div>
</template>

<script setup>
import draggable from 'vuedraggable';

import QuarkViewer from './QuarkViewer.vue';
import QuarkEditDialog from './QuarkEditDialog.vue';
</script>

<script>
import { ref } from 'vue';

const d_qe_activate = ref(false);


function onReorderQuark() {
    alert("TODO: Reorder Quark Logic");
}

/* Add Qurk */
function addQuark() {
    d_qe_activate.value = true;
}

/* Export Module */
export default {
    name: 'AtomViewer',
    props: {
        title: String,
        thisAtom: Object
    },
    methods: {
        onReorderQuark,
        addQuark,
    }
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