import { createApp } from 'vue'
import App from './App.vue'

// use: Varlet
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

// use: vue-draggable
import {VueDraggableNext}  from 'vue-draggable-next'

var app = createApp(App)

app.use(Varlet)
app.use(VueDraggableNext)

app.mount('#app')
