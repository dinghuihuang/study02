import axios from 'axios'
import router from '../router/router'
import Vue from 'vue'
//创建副本
const managerAxios = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加axios拦截器 拦截请求和响应
//添加请求拦截器
managerAxios.interceptors.request.use(
  function(config) {
    // 请求成功触发
    console.log('请求成功')
    // 添加请求头
    // 添加token
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  function(error) {
    // 请求失败触发
    return Promise.reject(error)
  }
)
//添加响应拦截器
managerAxios.interceptors.response.use(function(response) {
  // 响应成功触发
  console.log('响应成功')
  // console.log(response)
  if (
    response.data.meta.status == 400 &&
    response.data.meta.msg == '无效token'
  ) {
    window.sessionStorage.clear()
    router.push('/login')
    new Vue().$message.error('小样，伪造token，滚犊子！！！')
  }
  return response
},function(error){
  return Promise.reject(error)
})
//暴露方法
export const login = ({ username, password }) => {
  return managerAxios.post('/login', {
    username,
    password
  })
}
//暴露获取用户列表
export const users = ({ query, pagenum, pagesize }) => {
  return managerAxios.get('users', {
    params: {
      query,
      pagenum,
      pagesize
    },
    //设置请求头
    // headers: {
    //   Authorization: window.sessionStorage.getItem('token')
    // }
  })
}
//左侧菜单权限
export const menus = () => {
  return managerAxios.get('menus', {
    // headers: {
    //   Authorization: window.sessionStorage.getItem('token')
    // }
  })
}
//权限列表
export const rightList=()=>{
  return managerAxios.get('/rights/list',{

  })
}
//获取添加用户
export const addUsers=({
  username,password,email,mobile
})=>{
  return managerAxios.post('/users',{
     username,
     password,
     email,
     mobile,
  })
}
//删除用户
export const deleteUser =({id})=>{
  return managerAxios.delete(`/users/${id}`)
}
//修改用户状态
export const updateUserState =({id,type})=>{
  return managerAxios.put(`/users/${id}/state/${type}`)
}