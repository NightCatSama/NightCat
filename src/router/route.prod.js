import React, { Component } from 'react'
import { Router, hashserHistory } from 'react-router'

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
					history={hashserHistory} 
					routes={rootRoute} 
				/>
			</div>
		)
	}
}

