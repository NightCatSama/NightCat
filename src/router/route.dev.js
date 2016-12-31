import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'

import {
	Home,
	Code,
	Components,
	Product
} from 'routes'

const rootRoute = {
	path: '/',
	component: require('../app').default,
	indexRoute: Home,
	childRoutes: [
		Code,
		Components,
		Product
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

