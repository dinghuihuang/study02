import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入全局样式
import './assets/bass.css'

import mybread from './components/mybread.vue'
Vue.component("mybread",mybread)

//导入自己路由
import router from './router/router'


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
