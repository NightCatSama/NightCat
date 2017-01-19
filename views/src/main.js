import React from 'react'
import { render } from 'react-dom'
import Root from 'router/route'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

import ax from 'axios'

let instance = ax.create({
	baseURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:80' : ''}`,
	withCredentials: process.env.NODE_ENV === 'development'
})

/*  拦截器  */
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

window.axios = instance

const store = configureStore()

render(
<Provider store={store}>
	<Root />
</Provider>, document.getElementById('app')
)