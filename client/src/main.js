import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import adminCss from "./assets/admin/style.css";
import adminBootstrap from "./assets/admin/bootstrap.min.css";

createApp(App)
.use(store)
.use(router)
.use(adminCss)
.use(adminBootstrap)
.mount('#app')
import './assets/style.default.css';

createApp(App).use(store).use(router).mount('#app')
