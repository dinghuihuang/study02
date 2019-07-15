import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入路由
import login from '../views/login.vue'
import index from '../views/index.vue'



const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/index', component: index }
]

//实例化理由
const router = new VueRouter({
  routes
})

export default router