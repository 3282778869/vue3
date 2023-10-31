import '../src/assets/theme/arco-design.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入全局样式
import '../src/assets/theme/themeColors.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
