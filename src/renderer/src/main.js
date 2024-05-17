import './assets/test.css'
import '@fontsource/roboto'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'

createApp(App).use(ElementPlus).use(createPinia()).mount('#app')
