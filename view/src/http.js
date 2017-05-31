import axios from 'axios'
import config from '@/config'

// 普通请求
export const createInstance = (store) => {
  let instance = axios.create({
    baseURL: config.host,
    withCredentials: config.withCredentials,
    headers: {'Content-Type': 'application/json'}
  })

  /*  请求拦截  */
  instance.interceptors.request.use(requestHandle)

  /*  响应拦截  */
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

  /*  请求拦截  */
  instance.interceptors.request.use(requestHandle)

  /*  响应拦截  */
  instance.interceptors.response.use(graphqlResponseHandle, errorHandle)

  return instance
}

// 处理请求
function requestHandle (req) {
  if (config.log_request) {
    console.log(`url: ${req.url} `)
    console.log(req)
  }
  return req
}

// 处理响应
function responseHandle (res) {
  if (config.log_response) {
    console.log(`url: ${res.config.url} `)
    console.log(res.data)
  }
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
    if (config.log_response) {
      console.log(err.response.data)
    }
    return Promise.reject(err.response.data)
  }
  catch (err) {
    return Promise.reject({
      success: false,
      message: '服务器发生错误'
    })
  }
}

