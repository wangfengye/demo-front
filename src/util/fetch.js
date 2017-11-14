import axios from 'axios'
import { Message } from 'element-ui'
// axios默认发送数据时，数据格式是Request Payload ,qs 用于转换post参数,
import qs from 'qs'

/**
 * 自定的fetch 实际使用的是axios
 * 创建axios实例
 */

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
service.put = function (url, data) {
  if (typeof data === 'undefined') {
    data = {_method: 'put'}
  } else {
    data._method = 'put'
  }
  return service.post(url, qs.stringify(data))
}
service.delete = function (url, data) {
  if (typeof data === 'undefined') {
    data = {_method: 'delete'}
  } else {
    data._method = 'delete'
  }
  return service.post(url, qs.stringify(data))
}
service.postp = function (url, data) {
  return service.post(url, qs.stringify(data))
}
export default service
