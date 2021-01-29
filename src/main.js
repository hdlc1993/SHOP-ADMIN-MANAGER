// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import router from './router'
import {http,httpAuth} from './utils/https'
import userapi from './utils/api'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$https = httpAuth;
Vue.prototype.$api = userapi;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
