import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'

import App from '../app'
import Home from 'routes/Home'
import Factory from 'routes/Factory'
import Login from 'routes/Login'

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Home} />
						<Route path="factory" component={Factory} />
						<Route path="login" component={Login} />
					</Route>
				</Router>
				<DevTools />
			</div>
		)
	}
}

