import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../app';
import Children from '../views/template';

export default class Root extends Component {
  render() {
    return (
		<div>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Children} />
				</Route>
			</Router>
		</div>
    );
  }
}

