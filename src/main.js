import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false



//导入路由
import login from './components/login.vue'
import index from './components/index.vue'



const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/index', component: index }
]
//引入element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入全局样式
import './assets/bass.css'
//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
