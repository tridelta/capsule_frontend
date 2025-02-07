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
                    handle=".drag-handle" @end="onReorderQuark">

                    <!-- Quark element -->
                    <template #item="{ element }">
                        <var-paper class="quark" :elevation="1">
                            <div class="quark-icon">
                                <var-avatar :round="false" size="small" :color="_qtypeStyle[element.type].color">
                                    <var-icon :name="_qtypeStyle[element.type].icon" />
                                </var-avatar>
                            </div>

                            <div class="quark-body">
                                <div class="quark-content">
                                    <p v-if="element.type == 'text'" class="markdown">{{ element.content }}</p>
                                    <img v-if="element.type == 'image'" :src="element.content" />
                                </div>

                                <div class="quark-transcript" v-if="element.transcripts.length != 0">
                                    <var-divider dashed />
                                    <var-avatar-group>
                                        <var-avatar v-for="trans in element.transcripts" :key="trans.id"
                                            @click="showTrans(element.id, trans.content)" hoverable bordered
                                            size="small" :color="_qtypeStyle[trans.type].color">
                                            <var-icon :name="_qtypeStyle[trans.type].icon" />
                                        </var-avatar>
                                    </var-avatar-group>
                                    <p class="trans-show markdown" :hidden="!_transShow[element.id]">
                                        {{ _transShow[element.id] }}
                                    </p>
                                </div>
                            </div>

                            <div class="drag-handle">
                                <var-icon name="menu" color="grey" />
                            </div>
                        </var-paper>
                    </template>

                    <!-- Footer Controller -->
                    <template #footer>
                        <var-button type="primary" icon="plus" @click="addQuark">Add Quark</var-button>
                    </template>

                </draggable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const _qtypeStyle = {
    text: {
        icon: 'translate',
        color: 'var(--color-primary)'
    },
    image: {
        icon: 'image',
        color: 'var(--color-success)'
    },
    "transcript/info": {
        icon: 'information',
        color: '#808080'
    },
    "transcript/explain": {
        icon: 'message-text-outline',
        color: '#808080'
    }
}

const _transShow = ref({});

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
function showTrans(quark_id, content) {
    this._transShow[quark_id] = content;
}

function addQuark() {
    alert("TODO: Add Quark Logic");
}

function onReorderQuark() {
    alert("TODO: Reorder Quark Logic");
}

export default {
    name: 'AtomDisplay',
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

/* quark contents */
.quark {
    padding: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
}

.quark-body {
    margin-left: 1rem;
    flex: 1;
}

.quark-content {
    max-height: 5rem;
}

.quark-content p {
    margin: 0;
}

.quark-content img {
    max-height: 5rem;
}

/* draggable ghost */
.ghost {
    opacity: 0;
}
</style>