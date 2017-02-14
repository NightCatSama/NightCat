import axios from 'axios'
import store from 'store'
import config from 'config'

let instance = axios.create({
	baseURL: config.host,
	withCredentials: config.withCredentials
})

/*  请求拦截  */
instance.interceptors.request.use(
(req) => {
	let { isLogin, accessToken } = store.getState().auth
	if (isLogin && accessToken) {
		req.headers.accessToken = accessToken
	}
	return req
})

/*  响应拦截  */
instance.interceptors.response.use(
(res) => res.data,
(err) => {
	try {
		return Promise.reject(err.response.data)
	}
	catch (err) {
		return Promise.reject({
			success: false,
			message: '未知错误'
		})
	}
})

export default instance