import axios from 'axios'
import config from '@/config'

const createInstance = () => {
  let instance = axios.create({
    baseURL: config.host,
    withCredentials: config.withCredentials
  })

  /*  请求拦截  */
  instance.interceptors.request.use(
    (req) => {
      if (config.log_request) {
        console.log('// request --------------')
        console.log(req)
      }
      return req
    })

  /*  响应拦截  */
  instance.interceptors.response.use(
    (res) => {
      if (config.log_response) {
        console.log('// response --------------')
        console.log(res.data)
      }
      return res.data
    },
    (err) => {
      try {
        if (config.log_response) {
          console.log(err.response.data)
        }
        return Promise.reject(err.response.data)
      }
      catch (err) {
        return Promise.reject({
          success: false,
          message: '未知错误'
        })
      }
    })

  return instance
}

export default createInstance
