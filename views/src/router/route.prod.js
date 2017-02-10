import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'

import { createRoute, createIndexRoute, createChildRoutes, autoLogin, userRequired } from './utils'
import Home from 'routes/Home'

const rootRoute = {
	path: '/',
	// getComponent(nextState, callback) {
	// 	require.ensure([], function(require) {
	// 		callback(null, require('../app.jsx').default)
	// 	})
	// },
	component: require('../app.jsx').default,
	indexRoute: {
		component: Home
	},
	childRoutes: [
		createRoute('/sign', 'Sign'),
		createRoute('/active_account', 'ActiveAccount'),
		createRoute('/my-friends', 'MyFriends'),
		createRoute('/games', 'Games'),
		createRoute('/about', 'About'),
		createRoute('/user', 'User', {
			onEnter: userRequired,
			getIndexRoute: createIndexRoute('User/components/Info'),
			getChildRoutes: createChildRoutes([
				createRoute('/user/game-data', 'User/components/GameData')
			])
		}),
		createRoute('/user/:account', 'User', {
			getIndexRoute: createIndexRoute('User/components/Info'),
			getChildRoutes: createChildRoutes([
				createRoute('/user/game-data/:account', 'User/components/GameData')
			])
		}),
		createRoute('/single-games', 'SingleGames', {
			getChildRoutes: createChildRoutes([
				createRoute('/single-games/factory', 'SingleGames/components/Factory')
			])
		}),
		createRoute('/online-games', 'OnlineGames', {
			onEnter: userRequired,
			getChildRoutes: createChildRoutes([
			])
		})
	],
	onEnter: autoLogin
}

console.log(rootRoute)

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

