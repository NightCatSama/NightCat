import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'

import App from '../app'
import Home from 'routes/Home'
import Factory from 'routes/Factory'
import Sign from 'routes/Sign'
import ActiveAccount from 'routes/ActiveAccount'

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Home} />
						<Route path="factory" component={Factory} />
						<Route path="Sign" component={Sign} />
						<Route path="active_account" component={ActiveAccount} />
					</Route>
				</Router>
				<DevTools />
			</div>
		)
	}
}

