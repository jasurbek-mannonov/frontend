import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import JsonExcel from 'vue-json-excel3';
import { VueCookies } from 'vue-cookies'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(VueCookies, {expires: '2d'})
app.component("downloadExcel", JsonExcel)

app.mount('#app')