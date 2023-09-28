import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './assets/css/index.css'
import echarts from '@/global/echartsInfo.ts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/stores/index.ts'
import { elementLanguage } from '@/global/elementLanguage'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
elementLanguage(app)
app.config.globalProperties.$echarts = echarts
app.provide('$echarts', echarts)
app.use(router)
app.use(store)


app.mount('#app')
