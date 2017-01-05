import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'

import App from '../app'
import Home from 'routes/home'
import Factory from 'routes/factory'

// import createRoute from 'routes'

// const rootRoute = {
// 	path: '/',
// 	component: require('../app').default,
// 	indexRoute: createRoute(false, 'home'),
// 	childRoutes: [
// 		createRoute('/factory', 'factory')
// 	]
// }

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Home} />
						<Route path="factory" component={Factory} />
					</Route>
				</Router>
				<DevTools />
			</div>
		)
	}
}

