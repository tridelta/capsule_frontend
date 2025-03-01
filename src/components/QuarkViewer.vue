<template>
    <div class="quark">
        <!-- Icon -->
        <div class="quark-icon">
            <var-avatar :round="false" size="small" :color="typeStyle.color">
                <var-icon :name="typeStyle.icon" />
            </var-avatar>
        </div>

        <!-- Body -->
        <div class="quark-body">
            <div class="quark-content">
                <div v-if="quark.type == 'text'">
                    <VMarkdownView :content="quark.content" />
                </div>
                <img v-if="quark.type == 'image'" :src="'http://localhost:8000' + quark.content" />
            </div>

            <div class="quark-transcript" v-if="quark.transcripts.length != 0">
                <var-divider dashed />
                <var-avatar-group>
                    <var-avatar v-for="trans in quark.transcripts" :key="trans.id" @click="showTrans(trans.content)"
                        hoverable bordered size="small" :color="quarkTypeStylesheet[trans.type].color">
                        <var-icon :name="quarkTypeStylesheet[trans.type].icon" />
                    </var-avatar>

                    <!-- Close -->
                    <var-avatar v-if="trans_content != ''" @click="showTrans('')" hoverable size="small"
                        color="var(--color-error)">
                        <var-icon name="window-close" color="var(--color-danger)" />
                    </var-avatar>
                </var-avatar-group>
                <p class="trans-show markdown" :hidden="!trans_content">
                    {{ trans_content }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const quarkTypeStylesheet = {
    loading: {
        icon: 'refresh',
        color: '#808080'
    },
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

const props = defineProps({
    quarkID: String
});
var trans_content = ref('');
const quark = ref(
    {
        id: 'Q-1',
        type: 'text',
        content: 'Loading ...',
        transcripts: []
    }
);
const typeStyle = ref(quarkTypeStylesheet.loading);

// fetch quark data
function fetchQuark() {
    var API = "http://localhost:8000/quark/" + props.quarkID;
    fetch(API)
        .then(response => response.json())
        .then(data => {
            quark.value = data.quark;
            typeStyle.value = quarkTypeStylesheet[data.quark.type];
        });
}
fetchQuark();
</script>

<script>
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'

function showTrans(content) {
    this.trans_content = content;
}


export default {
    name: 'QuarkViewer'
}
</script>

<style scoped>
.quark {
    display: flex;
}

.quark-body {
    margin-left: 1rem;
    flex: 1;
}

/* quark contents */
.quark-content {
    /* max-height: 5rem; */
}

.quark-content p {
    margin: 0;
}

.quark-content img {
    max-height: 5rem;
}
</style>