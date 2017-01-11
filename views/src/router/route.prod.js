import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'

import createRoute from 'routes'

const autoLogin = (nextState, replaceState, callback) => {
	let status = window.sessionStorage.login_status
	if (!status || status.isLogin) {
		callback()
		return
	}

	let token = window.localStorage.token
	if (token) {
		axios.post('/verify', {})
		.then((res) => {
			let data = res.data
			window.localStorage.token = data.token
			window.sessionStorage.login_status = JSON.stringify({
				isLogin: true,
				avatar: data.avatar,
				profile: data.profile,
				accessToken: data.accessToken,
				name: data.name
			})
			callback()
		})
		.catch((err) => {
			window.localStorage.removeItem('token')
			window.sessionStorage.removeItem('login_status')
			callback()
		})
	}
}

const rootRoute = {
	path: '/',
	component: require('../app').default,
	indexRoute: createRoute(false, 'Home'),
	childRoutes: [
		createRoute('/factory', 'Factory'),
		createRoute('/sign', 'Sign'),
		createRoute('/active_account', 'ActiveAccount')
	],
	onEnter: autoLogin
}

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router 
					history={browserHistory}
					routes={rootRoute} 
				/>
			</div>
		)
	}
}

