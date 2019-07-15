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