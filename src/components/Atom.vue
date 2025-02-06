<template>
    <var-paper :elevation="2">
        <div class="atom">
            <div class="atom-head">
                <!-- Title -->
                <h1>{{ title }}</h1>

                <!-- Tags -->
                <var-space>
                    <var-badge v-for="tag in tags" :key="tag" :value="tag" type="primary" />
                </var-space>
                <br>

                <!-- Infos -->
                <li class="atom-info">ID: {{ id }}</li>
                <li class="atom-info">Last Modified: {{ last_modified }}</li>
            </div>
            <div class="atom-quarks">
                <h3>Contents</h3>
                <var-cell>

                </var-cell>
            </div>
        </div>
    </var-paper>
</template>

<script setup>
var id = "A-1"
var title = 'Atom No.1'
var tags = ['tag1', 'tag2', 'tag3']
var last_modified = '2021-10-01'
</script>

<script>
export default {
    name: 'AtomDisplay',
    props: {
        title: String
    }
}
</script>

<style scoped>
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
</style>