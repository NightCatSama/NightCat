import React from 'react'
import { Router, browserHistory } from 'react-router'
import DevTools from 'asset/DevTools'
import getHandleFn from './utils'

import App from '../app'
import Home from 'routes/Home'
import Sign from 'routes/Sign'
import ActiveAccount from 'routes/ActiveAccount'
import Games from 'routes/Games'
import MyFriends from 'routes/MyFriends'
import About from 'routes/About'

import User from 'routes/User'

import SingleGames from 'routes/SingleGames'
import { LocalGobang, Factory } from 'routes/SingleGames/components'

import OnlineGames from 'routes/OnlineGames'
import { Gobang } from 'routes/OnlineGames/components'

const routes = (store) => {
	let { autoLogin, userRequired } = getHandleFn(store)

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
			component: User
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
			}, {
				path: '/single-games/gobang',
				component: LocalGobang
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

	return (
		<div>
			<Router history={browserHistory} routes={rootRoute} />
			<DevTools />
		</div>
	)
}

export default routes