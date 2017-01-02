import React, { Component } from 'react'
import { Router, hashHistory } from 'react-router'

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
					history={hashHistory} 
					routes={rootRoute} 
				/>
			</div>
		)
	}
}

