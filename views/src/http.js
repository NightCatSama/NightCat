import axios from 'axios'
import store from 'store'

let instance = axios.create({
	baseURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:80' : ''}`,
	withCredentials: process.env.NODE_ENV === 'development'
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