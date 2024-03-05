import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import adminCss from "./assets/admin/style.css";
// import adminBootstrap from "./assets/admin/bootstrap.min.css";
// import './assets/style.default.css';

// createApp(App)
// .use(store)
// .use(router)
// .use(adminCss)
// .use(adminBootstrap)
// .mount('#app')

createApp(App).use(store).use(router).mount('#app')
//카카오 자바스크립트 앱키
window.Kakao.init("4af03599b8f41968bc3354daf33bc2ca"); 