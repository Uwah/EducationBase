import Vue from 'vue';
import App from './App.vue';

import axios from 'axios';
import store from './store/';  //默认导入的就是index.js
import router from './router/';



//	全局挂载axios，在其他页面使用axios的时候直接this.$http就可以了
axios.defaults.withCredentials = true 
Vue.prototype.$http = axios;
Vue.prototype.HOST = '/';
new Vue({
    store,//将store对象导入到Vue实例中
    router,
    el: '#app',
    render: h => h(App)
});
