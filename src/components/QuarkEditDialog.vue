<template>
    <div class="mask" v-if="activate">
        <var-paper class="content">
            <var-button type="danger" round icon-container class="close-button" @click="closeDialog()">
                <var-icon name="window-close" />
            </var-button>
            <h2 class="noselect">New Quark</h2>
            <div class="qtype-choose noselect">
                <var-radio-group v-model="q_type" :options="q_options" />
            </div>
            <div class="content-editor">
                <div v-if="q_type === 'text'">
                    <VMarkdownEditor v-model="content" />
                </div>
                <div v-if="q_type === 'image'">
                    <var-uploader v-model="files_img" accept="images/*" @after-read="uploadFile" />
                </div>
            </div>
            <div class="footer-controller">
                <var-button type="success" class="btn-upload" @click="upload_form(closeDialog)">Save</var-button>
            </div>
        </var-paper>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Snackbar } from '@varlet/ui';

const q_type = ref('text');
const q_options = ref([
    { label: 'Text', value: 'text' },
    { label: 'Photo', value: 'image' },
])
const content = ref('');
const files_img = ref([]);

function uploadFile(file) {
    console.log(file);
}

async function createQuark(qtype, qcontent) {
    
    // upload
    const API = "http://localhost:8000/quark";
    var resp = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: qtype,
            content: qcontent
        })
    })
    
    return resp.json();
}

function createSnackbar(type, text) {
  Snackbar[type](text);
}

async function upload_form(closeDialog) {
    if (q_type.value === 'text') {
        var resp = await createQuark(q_type.value, content.value);
        if (resp.code != 0) {
            createSnackbar('warning', "Upload Failed (" + resp.code + ").");
        }
        else {
            createSnackbar('success', "Upload Success.");
            closeDialog();
        }
    } else if (q_type.value === 'image') {
        // TODO
    }
}
</script>

<script>
import { VMarkdownEditor } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'

export default {
    name: 'QuarkEditDialog',
    props: {
        activate: Boolean,
        closeDialog: Function
    },
}
</script>

<style scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}

.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    padding: 1rem;
    z-index: 1001;

    display: flex;
    flex-direction: column;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
}

h2 {
    text-align: center;
}

.noselect {
    user-select: none;
}

.content-editor {
    flex: 1;
}

.content-editor>div {
    height: 100%;
}

.btn-upload {
    float: right;
}
</style>