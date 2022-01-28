import axios from 'axios'
// import Vue from 'vue'
// import store from '@/store'  // 我此项目没有用到vuex，所以vuex代码的都注释了，需要的自己打开使用

// import {ACCESS_TOKEN} from '@/store/mutation-types'

// 创建 axios 实例
const requests = axios.create({
  //baseURL: process.env.VUE_APP_API, 
// 　baseURL: process.env.VUE_APP_ONE,
  timeout: 120000, // 请求超时时间
  headers: {
    'Content-Type':'application/json'
  }
})
 
// 错误处理函数
const err = (error) => {


  return Promise.reject(error)
}

// request interceptor(请求拦截器)
requests.interceptors.request.use(config => {
//   const token = Vue.ls.get(ACCESS_TOKEN)
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }
  return config
}, err)

// response interceptor（接收拦截器）
requests.interceptors.response.use((response) => {
  const res = response.data
  if (res.code == 200 || res.code == 20000 || res.ret == 0) { 
    return res 
  } else {
    return Promise.reject('error')
  }
  return res
}, err)

export default {
    requests
}