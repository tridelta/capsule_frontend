<template>
    <div class="mask" v-if="activate">
        <var-paper class="content">
            <var-button type="danger" round icon-container class="close-button" @click="try_to_close(closeDialog)">
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
                <div v-if="q_type === 'media'">
                    <var-uploader v-model="files_img" :multiple="true" accept="image/*,video/*" @after-read="uploadFile" />
                </div>
            </div>
            <div class="footer-controller">
                <var-button type="success" class="btn-upload" @click="upload_form(closeDialog, add_quark)">Save</var-button>
            </div>
        </var-paper>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, Snackbar } from '@varlet/ui';

const q_type = ref('text');
const q_options = ref([
    { label: 'Text', value: 'text' },
    { label: 'Media', value: 'media' },
])
const content = ref('');
const files_img = ref([]);

function try_to_close(closeDialog) {
    function _confirm_close() {
        content.value = '';
        files_img.value = [];
        closeDialog();
    }

    if (content.value.length == 0 && files_img.value.length == 0) {
        _confirm_close();
        return;
    }
    Dialog({
        title: '退出编辑',
        message: '您有更改尚未保存，推出编辑将丢失更改。确定要退出吗？',
        confirmButtonText: '退出',
        cancelButtonText: '继续编辑',
        onConfirm: _confirm_close
    })
}

function uploadFile(file) {
    // console.log(file);
}

async function createQuark(qtype, qcontent) {
    const API = "http://localhost:8000/quark";
    const formData = new FormData();
    formData.append('type', qtype);
    formData.append('content', qcontent);

    var resp = await fetch(API, {
        method: 'POST',
        body: formData
    });

    return resp.json();
}

function createSnackbar(type, text) {
    Snackbar[type](text);
}

async function upload_form(closeDialog, add_quark) {
    var new_quarks = [];
    if (q_type.value === 'text') {
        let resp = await createQuark(q_type.value, content.value);
        if (resp.code != 0) {
            createSnackbar('error', "Upload Failed (createQuark." + resp.code + ").");
        }
        // success
        new_quarks.push(resp.quark_id);
        createSnackbar('success', "Upload Success.");
        closeDialog();
    } else if (q_type.value === 'media') {
        for (var i = 0; i < files_img.value.length; i++) {
            var file = files_img.value[i];
            // get & check file type
            var type = file.file.type.split('/')[0];
            if (type != 'image' && type != 'video') {
                createSnackbar('error', "Invalid File Type.");
                return;
            }
            // upload file
            let resp = await createQuark(type, file.file);
            if (resp.code != 0) {
                createSnackbar('error', "Upload Failed (createQuark." + resp.code + ").");
                return;
            }
            else {
                new_quarks.push(resp.quark_id);
                file.status = "success";
            }
        }
        // success
        createSnackbar('success', "Upload Success.");
        closeDialog();
    }
    add_quark(new_quarks);
}
</script>

<script>
import { VMarkdownEditor } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'

export default {
    name: 'QuarkEditDialog',
    props: {
        activate: Boolean,
        add_quark: Function,
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