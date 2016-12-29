import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import {
	App,
	Home,
	About,
	Code,
	Components,
	Product,
	Login
} from '../views/'

import DevTools from '../asset/DevTools'

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Home} />
						<Route path="About" component={About} />
						<Route path="code" component={Code} />
						<Route path="component" component={Components} />
						<Route path="product" component={Product} />
						<Route path="login" component={Login} />
					</Route>
				</Router>
				<DevTools />
			</div>
		)
	}
}

