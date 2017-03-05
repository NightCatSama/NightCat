import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'

import App from '../app'
import getRoutes from './dynamicRoutes.js'

const routes = (store) => {
	/*  是否自动登陆  */
	const autoLogin = (nextState, replaceState, callback) => {
		let { isLogin } = store.getState().auth
		if (isLogin) {
			callback()
			return
		}

		let token = window.localStorage.token

		if (token) {
			axios.post('/verify', {})
				.then((res) => {
					let data = res.data
					window.localStorage.token = data.token
					store.dispatch({ type: 'SET_STATUS', payload: data })
					callback()
				})
				.catch((err) => {
					window.localStorage.removeItem('token')
					callback()
				})
		}
		else {
			callback()
		}
	}

	/*  需要登陆  */
	const userRequired = (nextState, replaceState) => {
		let { isLogin } = store.getState().auth
		if (!isLogin) {
			replaceState(`/Sign?message=${encodeURIComponent('请先登录')}&link=${nextState.location.pathname}`)
			return
		}
	}

	const rootRoute = {
		path: '/',
		component: App,
		getIndexRoute(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, {
					component: require('routes/Home').default
				})
			})
		},
		childRoutes: getRoutes(userRequired, autoLogin),
		onEnter: autoLogin
	}

	return (
		<div>
			<Router
				history={browserHistory}
				routes={rootRoute}
			/>
		</div>
	)
}

export default routes
