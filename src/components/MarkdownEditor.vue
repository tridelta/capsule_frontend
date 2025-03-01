<template>
    <div class="markdown-editor">
        <textarea v-model="input" @input="updateMarkdown"></textarea>
        <div v-html="output" class="preview"></div>
    </div>
</template>

<script>
import { ref } from 'vue';
import marked from 'marked';

export default {
    name: 'MarkdownEditor',
    setup() {
        const input = ref('');
        const output = ref('');

        const updateMarkdown = () => {
            output.value = marked(input.value);
        };

        return {
            input,
            output,
            updateMarkdown
        };
    }
};
</script>

<style scoped>
.markdown-editor {
    display: flex;
    flex-direction: column;
}

textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
}

.preview {
    border: 1px solid #ccc;
    padding: 10px;
}
</style>