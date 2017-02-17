import React, { Component } from 'react'
import { Router, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'
import { autoLogin, userRequired } from './utils'

import App from '../app'
import Home from 'routes/Home'
import Sign from 'routes/Sign'
import ActiveAccount from 'routes/ActiveAccount'
import Games from 'routes/Games'
import MyFriends from 'routes/MyFriends'
import About from 'routes/About'

import User from 'routes/User'
import { Info, GameData } from 'routes/User/components'

import SingleGames from 'routes/SingleGames'
import { Factory } from 'routes/SingleGames/components'

import OnlineGames from 'routes/OnlineGames'
import { Gobang } from 'routes/OnlineGames/components'

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
		path: '/user(/:account)',
		component: User,
		onEnter: userRequired,
		indexRoute: {
			component: Info
		}
	}, {
		path: '/game-data(/:account)',
		component: User,
		onEnter: userRequired,
		indexRoute: {
			component: GameData
		}
	}, {
		path: '/my-friends',
		component: MyFriends
	}, {
		path: '/about',
		component: About
	}, {
		path: '/games(/:type)',
		component: Games
	}, {
		path: '/single-games',
		component: SingleGames,
		childRoutes: [{
			path: '/single-games/factory',
			component: Factory
		}]
	}, {
		path: '/online-games',
		component: OnlineGames,
		onEnter: userRequired,
		childRoutes: [{
			path: '/online-games/gobang',
			component: Gobang
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
