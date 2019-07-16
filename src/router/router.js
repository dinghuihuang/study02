import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入路由
import login from '../views/login.vue'
import index from '../views/index.vue'



import users from '../views/users.vue'
import roles from '../views/roles.vue'
import rights from '../views/rights.vue'


// import { users } from '../api/http';


const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: login,
    //设置路由元
    meta: {
      needLogin: false
    }
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: 'users',
        component: users
      },
      {
        path: 'roles',
        component: roles
      },
      {
        path: 'rights',
        component: rights
      }
    ]
  }
]

//实例化理由
const router = new VueRouter({
  routes
})
// 增加导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 找到需要判断的页面
  // if (to.path.indexOf('/index') == 0) {
  if (to.meta.needLogin != false) {
    // 首页 判断
    if(window.sessionStorage.getItem('token')!=undefined){
      next()
    }else{
      new Vue().$message.error('哥们,先登录')
      router.push('/login')
    }
  }else{
    next()
  }
})

//暴露出去
export default router
