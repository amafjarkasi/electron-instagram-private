import './assets/new.css'
import '@fontsource/roboto'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

createApp(App).use(ElementPlus).use(createPinia()).use(router).mount('#app')
