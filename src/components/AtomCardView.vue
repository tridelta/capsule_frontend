<template>
    <div class="atom" v-if="thisAtom" :data-aid="thisAtom.id">
        <div class="atom-head">
            <!-- Title -->
            <h2>{{ thisAtom.title }}</h2>

            <!-- Tags -->
            <var-space>
                <var-badge v-for="tag in thisAtom.tags" :key="tag" :value="tag" type="primary" />
            </var-space>
            <br>

            <!-- Infos -->
            <li class="atom-info">ID: {{ thisAtom.id }}
                <var-icon :name="copy_aid_icon" @click="_copy_aid(thisAtom.id)" />
            </li>
            <li class="atom-info">Last Modified: {{ _time_cvt(thisAtom.last_modify) }}</li>
        </div>
        <div class="autolayout-container" ref="al_container">
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue';
import API_PREFIX from '../apiConfig';

const props = defineProps({
    atomID: String,
    tempAtom: Boolean,
    atomUpd: Function
});

// 存储所有quark的列表
const quarkList = ref([]);

// helper
function _time_cvt(time) {
    var _t = new Date(time);
    var _now = new Date();
    var _diff = _now - _t;
    if (_diff < 1000 * 3600) {
        return Math.floor(_diff / (1000 * 60)) + " minutes ago";
    }
    else if (_diff < 1000 * 3600 * 24) {
        // less than 1 week
        return Math.floor(_diff / (1000 * 3600)) + " hours ago";
    }
    else if (_diff < 1000 * 3600 * 24 * 7) {
        // less than 1 week
        var day_name = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return day_name[_t.getDay()];
    }
    else {
        return _t.toLocaleString();
    }
}

// copy AtomID
const copy_aid_icon = ref("content-copy");
function _copy_aid(text) {
    copy_aid_icon.value = "check";
    navigator.clipboard.writeText(text);

    setTimeout(() => {
        copy_aid_icon.value = "content-copy";
    }, 1000);
}

// 获取quark数据的函数
async function fetchQuarkData(quarkID) {
    try {
        const response = await fetch(`${API_PREFIX}/quark/${quarkID}`);
        const data = await response.json();
        return data.quark;
    } catch (error) {
        console.error(`Error fetching quark ${quarkID}:`, error);
        return { type: 'text', content: 'Error loading quark' };
    }
}

// 加载所有quark内容
async function loadAllQuarks() {
    if (!thisAtom.value || !thisAtom.value.contents) return;

    quarkList.value = []; // 清空现有数据

    // 创建一个promises数组，同时获取所有quark数据
    const promises = thisAtom.value.contents.map(qid => fetchQuarkData(qid));

    try {
        quarkList.value = await Promise.all(promises);
        // 在获取完所有quark数据后执行布局
        auto_layout();
    } catch (error) {
        console.error("Error loading quarks:", error);
    }
}

// initial thisAtom
function refresh_atom() {
    if (props.tempAtom) {
        thisAtom.value = {
            "title": "New Atom",
            "tags": [],
            "id": "A-new",
            "last_modify": "Just Now",
            "contents": []
        };
        loadAllQuarks();
        return;
    }

    var API = `${API_PREFIX}/atom/${props.atomID}`;
    fetch(API)
        .then(response => response.json())
        .then(data => {
            thisAtom.value = data.atom;
            loadAllQuarks(); // 加载所有quark内容
        });
}

const thisAtom = ref({
    "title": "Loading ..."
});

// 监听atomID变化，重新加载数据
watch(() => props.atomID, () => {
    refresh_atom();
});

onMounted(() => {
    refresh_atom();
});

// auto Layout
function auto_layout() {
    if (!quarkList.value || quarkList.value.length === 0) return;

    const container = al_container.value;
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 根据容器宽度决定列数（响应式）
    const containerWidth = container.clientWidth;
    let columnCount = 1;

    if (containerWidth > 768) {
        columnCount = 3;
    } else if (containerWidth > 480) {
        columnCount = 2;
    }

    // 创建列容器
    const columns = [];
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'auto-layout-column';
        column.style.width = `${100 / columnCount}%`;
        container.appendChild(column);
        columns.push(column);
    }

    // 将 quark 按顺序分配到各列
    quarkList.value.forEach((quark, index) => {
        const columnIndex = index % columnCount;
        const quarkElement = createQuarkElement(quark);
        columns[columnIndex].appendChild(quarkElement);
    });
}

// 创建quark元素
function createQuarkElement(quark) {
    const quarkContainer = document.createElement('div');
    quarkContainer.className = 'quark-container';
    quarkContainer.dataset.qid = quark.id;

    let quarkContent;

    if (quark.type === 'image') {
        quarkContent = document.createElement('div');
        quarkContent.className = 'quark-image';

        const img = document.createElement('img');
        img.classList.add('quark');
        img.src = API_PREFIX + quark.content;
        img.alt = 'Image';
        img.style.maxWidth = '100%';

        quarkContent.appendChild(img);
    } else if (quark.type === 'text') {
        quarkContent = document.createElement('div');
        quarkContent.classList.add('quark');
        quarkContent.className = 'quark-text';
        quarkContent.textContent = quark.content;
    } else {
        quarkContent = document.createElement('div');
        quarkContent.className = 'quark-unknown';
        quarkContent.classList.add('quark');
        quarkContent.textContent = `Unknown quark type: ${quark.type}`;
    }

    quarkContainer.appendChild(quarkContent);
    return quarkContainer;
}

// 监听窗口大小变化，重新布局
const al_container = ref(null);
window.addEventListener('resize', () => {
    if (al_container.value) {
        auto_layout();
    }
});
</script>

<script>
export default {
    name: 'AtomCardView'
}
</script>

<style scoped>
/* atom */
.atom {
    margin: 1rem;
}

.atom-head>h2 {
    margin-bottom: 0;
}

.atom-info {
    list-style-type: none;
    color: grey;
    font-size: 0.8rem;
    padding: 0;
}

.atom-info>i {
    cursor: pointer;
    font-size: 0.9rem;
}


/* draggable */
.drag-handle {
    float: left;
    margin-right: 0.5rem;
}

.ghost {
    opacity: 0;
}

/* auto-layout */
.autolayout-container {
    display: flex;
    width: 100%;
}

.auto-layout-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 5px;
}
</style>

<style>
/* Quark */
.quark-container {
    padding: 0.5rem;
}

/* quark content styles */
.quark-text {
    white-space: pre-wrap;
    width: 100%;
    max-width: 100%;
    line-height: 1.5;
    font-size: 0.95rem;
    overflow-wrap: break-word;
}

.quark-image img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}
</style>