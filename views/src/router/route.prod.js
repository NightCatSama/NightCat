import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'

import createRoute from 'routes'

const rootRoute = {
	path: '/',
	component: require('../app').default,
	indexRoute: createRoute(false, 'home'),
	childRoutes: [
		createRoute('/factory', 'Factory'),
		createRoute('/sign', 'Sign'),
		createRoute('/active_account', 'ActiveAccount')
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
			</div>
		)
	}
}

