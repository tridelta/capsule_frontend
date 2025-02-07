import { createApp } from 'vue'
import App from './App.vue'

// use: Varlet
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

var app = createApp(App)

app.use(Varlet)

app.mount('#app')
