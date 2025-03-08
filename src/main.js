import { createApp } from 'vue'
import App from './App.vue'

// use: Varlet
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'

// use: MDI
import '@mdi/font/css/materialdesignicons.css'

var app = createApp(App)

app.use(Varlet)

app.mount('#app')
