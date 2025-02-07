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
                        <var-menu placement="bottom" same-width :offset-y="6">
                            <!-- Default Menu -->
                            <var-button-group type="primary">
                                <var-button @click="addQuarkText">+ Text</var-button>
                                <var-button style="padding: 0 6px;">
                                    <var-icon name="menu-down" :size="24" />
                                </var-button>
                            </var-button-group>
                            <!-- Expand Menu -->
                            <template #menu>
                                <var-cell ripple @click="addQuarkImg">+ Image</var-cell>
                                <var-cell ripple @click="addQuarkVideo">+ Video</var-cell>
                            </template>
                        </var-menu>
                    </template>

                </draggable>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

import QuarkViewer from './QuarkViewer.vue';

const thisAtom = ref({
    id: "A-1",
    title: 'Atom No.1',
    tags: ['tag1', 'tag2', 'tag3'],
    last_modified: '2021-10-01',
    contents: [
        {
            id: 'Q-1',
            type: 'text',
            content: 'This is a text quark',
            transcripts: []
        },
        {
            id: 'Q-2',
            type: 'image',
            content: 'https://varletjs.org/cat.jpg',
            transcripts: [
                {
                    id: 'Q-5',
                    type: 'transcript/info',
                    content: '[time] 2024-10-01 12:00:00\n[location] somewhere\n[resolution] 1920x1080'
                },
                {
                    id: 'Q-4',
                    type: 'transcript/explain',
                    content: 'The image shows two cat lying on the ground'
                }
            ]
        },
        {
            id: 'Q-3',
            type: 'text',
            content: 'This is another text quark',
            transcripts: []
        }
    ]
});
</script>

<script>
function onReorderQuark() {
    alert("TODO: Reorder Quark Logic");
}

/* Add Qurk */
function addQuarkText() {
    alert("TODO: Add Quark(Text) Logic");
}

function addQuarkImg() {
    alert("TODO: Add Quark(Image) Logic");
}

function addQuarkVideo() {
    alert("TODO: Add Quark(Video) Logic");
}


/* Export Module */
export default {
    name: 'AtomViewer',
    props: {
        title: String
    },
    methods: {
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