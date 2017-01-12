import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'

import App from '../app'
import Home from 'routes/Home'
import Factory from 'routes/Factory'
import Sign from 'routes/Sign'
import ActiveAccount from 'routes/ActiveAccount'

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

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory} >
					<Route path="/" component={App} onEnter={autoLogin}>
						<IndexRoute component={Home} />
						<Route path="factory" component={Factory} />
						<Route path="Sign" component={Sign} />
						<Route path="active_account" component={ActiveAccount} />
					</Route>
				</Router>
				<DevTools />
			</div>
		)
	}
}

