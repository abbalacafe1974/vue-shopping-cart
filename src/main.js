import { createApp } from 'vue';
import axios from 'axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';
import App from './App.vue';
import router from './router';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // 引入 Bootstrap 的 JS（如需要）
import 'bootstrap-icons/font/bootstrap-icons.css';
// Axios
const app = createApp(App); // 使用 createApp 創建 Vue 應用
// 將 Axios 註冊為全局屬性
app.config.globalProperties.$http = axios;
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.config.globalProperties.$filters = {
  date,
  currency,
};
app.use(router);
app.component('Loading', Loading);
app.mount('#app');
