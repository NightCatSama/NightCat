import axios from 'axios'
import config from '@/config'

// 普通请求
export const createInstance = (store, hook) => {
  let instance = axios.create({
    baseURL: config.host,
    timeout: 30000,
    withCredentials: config.withCredentials,
    headers: {'Content-Type': 'application/json'}
  })

  instance.interceptors.request.use((req) => requestHandle(req, hook), (err) => errorHandle(err, hook))
  instance.interceptors.response.use((res) => responseHandle(res, hook), (err) => errorHandle(err, hook))

  return instance
}

// Graphql 请求
export const createGraphQLInstance = (store, hook) => {
  let instance = axios.create({
    baseURL: config.host,
    timeout: 30000,
    withCredentials: config.withCredentials,
    headers: {'Content-Type': 'application/graphql'}
  })

  instance.interceptors.request.use((req) => requestHandle(req, hook), (err) => errorHandle(err, hook))
  instance.interceptors.response.use((res) => graphqlResponseHandle(res, hook), (err) => errorHandle(err, hook))

  return instance
}

// 处理请求
function requestHandle (req, hook) {
  hook.start && hook.start()
  return req
}

// 处理响应
function responseHandle (res, hook) {
  hook.success && hook.success()
  return res.data
}

// 处理 graphql 的响应
function graphqlResponseHandle (res, hook) {
  if (res.data.errors) {
    hook.error && hook.error()

    config.debug && console.log(res.data.errors[0].message)
    return Promise.reject(res.data.errors[0])
  }

  return responseHandle(res, hook)
}

// 错误处理
function errorHandle (err, hook) {
  hook.error && hook.error()

  try {
    err = err.response.data.errors ? err.response.data.errors[0] : err.response.data
    config.debug && console.log(err)
    return Promise.reject(err)
  }
  catch (err) {
    return Promise.reject({
      success: false,
      message: '服务器发生错误'
    })
  }
}

