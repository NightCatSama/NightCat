import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'

import createRoute from 'routes'
import { autoLogin, userRequired } from './utils'

const rootRoute = {
	path: '/',
	component: require('../app').default,
	indexRoute: createRoute(false, 'Home'),
	childRoutes: [
		createRoute('/sign', 'Sign'),
		createRoute('/active_account', 'ActiveAccount'),
		createRoute('/my-friends', 'MyFriends'),
		createRoute('/games', 'Games'),
		createRoute('/about', 'About'),
		createRoute('/user', 'User', {
			onEnter: userRequired,
			indexRoute: createRoute(false, 'User/components/Info'),
			childRoutes: [
				createRoute('/user/game-data', 'User/components/GameData')
			]
		}),
		createRoute('/user/:account', 'User', {
			indexRoute: createRoute(false, 'User/components/Info'),
			childRoutes: [
				createRoute('/user/game-data/:account', 'User/components/GameData')
			]
		}),
		createRoute('/single-games', 'SingleGames', {
			childRoutes: [
				createRoute('/single-games/factory', 'SingleGames/components/Factory')
			]
		}),
		createRoute('/online-games', 'OnlineGames', {
			onEnter: userRequired,
			childRoutes: []
		})
	],
	onEnter: autoLogin
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

