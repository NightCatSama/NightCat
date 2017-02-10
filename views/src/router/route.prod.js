import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'

import { autoLogin } from './utils'
import App from '../app'
import routes from './dynamicRoutes.js'

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
	childRoutes: routes,
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

