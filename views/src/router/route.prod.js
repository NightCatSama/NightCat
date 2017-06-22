import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import getHandleFn from './utils'

import App from '../app'
import getRoutes from './dynamicRoutes.js'

const routes = (store) => {
	let { autoLogin, userRequired } = getHandleFn(store)
	
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
