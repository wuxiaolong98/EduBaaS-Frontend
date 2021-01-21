import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import axios from 'axios';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:30000';
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$message = ElementUI.Message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
