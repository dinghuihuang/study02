  import axios from 'axios'
//创建副本
  const  managerAxios=axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
  //暴露方法
  export const  login =({username,password})=>{
    return managerAxios.post('/login',{
      username,
      password
    })
  }
  //暴露获取用户列表
  export const users =(({query,pagenum,pagesize})=>{
     return managerAxios.get('users', {
       params: {
         query,
         pagenum,
         pagesize
       },
       //设置请求头
       headers: {
         Authorization:window.sessionStorage.getItem('token')
       }
     })
  })
  //左侧菜单权限
  export const menus =() =>{
    return managerAxios.get('menus', {
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      }
    })
  }