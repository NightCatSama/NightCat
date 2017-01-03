import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'

import createRoute from 'routes'

const rootRoute = {
	path: '/',
	component: require('../app').default,
	indexRoute: createRoute(false, 'home'),
	childRoutes: [
		createRoute('/factory', 'factory')
	]
}

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router
					history={browserHistory}
					routes={rootRoute}
				/>
				<DevTools />
			</div>
		)
	}
}

