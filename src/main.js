import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './pluginUse' 
import 'element-ui/lib/theme-chalk/index.css';  //引入elementUI样式
import VueSocketIO from 'vue-socket.io' //客服
import "./permission"


Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'https://www.sngblog.cn:7147',
  vuex: {
  }
}))
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
