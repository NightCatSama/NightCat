import axios from 'axios'
import config from '@/config'

// 普通请求
export const createInstance = (store) => {
  let instance = axios.create({
    baseURL: config.host,
    withCredentials: config.withCredentials,
    headers: {'Content-Type': 'application/json'}
  })

  instance.interceptors.request.use(requestHandle)
  instance.interceptors.response.use(responseHandle, errorHandle)

  return instance
}

// Graphql 请求
export const createGraphQLInstance = (store) => {
  let instance = axios.create({
    baseURL: config.host,
    withCredentials: config.withCredentials,
    headers: {'Content-Type': 'application/graphql'}
  })

  instance.interceptors.request.use(requestHandle)
  instance.interceptors.response.use(graphqlResponseHandle, errorHandle)

  return instance
}

// 处理请求
function requestHandle (req) {
  return req
}

// 处理响应
function responseHandle (res) {
  return res.data
}

// 处理 graphql 的响应
function graphqlResponseHandle (res) {
  if (res.data.errors) {
    return Promise.reject(res.data.errors[0])
  }

  return responseHandle(res)
}

// 错误处理
function errorHandle (err) {
  try {
    return err.response.data.errors ? Promise.reject(err.response.data.errors[0]) : Promise.reject(err.response.data)
  }
  catch (err) {
    return Promise.reject({
      success: false,
      message: '服务器发生错误'
    })
  }
}

