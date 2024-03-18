import '../src/assets/theme/arco-design.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPlugin from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// 引入全局样式
import '../src/assets/theme/themeColors.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPlugin)


app.use(pinia)
app.use(router)

app.mount('#app')
