import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'
import { autoLogin, userRequired } from './utils'

import App from '../app'
import Home from 'routes/Home'
import Sign from 'routes/Sign'
import ActiveAccount from 'routes/ActiveAccount'

import User from 'routes/User'
import { Info, GameData } from 'routes/User/components'

import SingleGames from 'routes/SingleGames'
import { List, Factory } from 'routes/SingleGames/components'

const rootRoute = {
	path: '/',
	component: App,
	indexRoute: {
		component: Home
	},
	childRoutes: [{
		path: '/sign',
		component: Sign
	}, {
		path: '/active_account',
		component: ActiveAccount
	}, {
		path: '/user',
		component: User,
		onEnter: userRequired,
		indexRoute: {
			component: Info
		},
		childRoutes: [{
			path: '/user/game-data',
			component: GameData
		}]
	}, {
		path: '/single-games',
		component: SingleGames,
		indexRoute: {
			component: List
		},
		childRoutes: [{
			path: '/single-games/factory',
			component: Factory
		}]
	}],
	onEnter: autoLogin
}

export default class Root extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory} routes={rootRoute} />
				<DevTools />
			</div>
		)
	}
}
