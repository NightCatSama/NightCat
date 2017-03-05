export default function (userRequired, autoLogin) {
	return [
		{
			path: 'sign',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/Sign').default)
				})
			}
		}, {
			path: 'active_account',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/ActiveAccount').default)
				})
			}
		}, {
			path: 'about',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/About').default)
				})
			}
		}, {
			path: 'my-friends',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/MyFriends').default)
				})
			}
		}, {
			path: 'user(/:account)',
			onEnter: userRequired,
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/User').default)
				})
			},
			getIndexRoute(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, {
						component: require('routes/User/components/Info').default
					})
				})
			}
		}, {
			path: 'game-data(/:account)',
			onEnter: userRequired,
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/User').default)
				})
			},
			getIndexRoute(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, {
						component: require('routes/User/components/GameData').default
					})
				})
			}
		}, {
			path: 'games(/:type)',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/Games').default)
				})
			}
		}, {
			path: 'single-games',
			onEnter: userRequired,
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/SingleGames').default)
				})
			},
			getIndexRoute(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, {
						component: require('routes/SingleGames').default
					})
				})
			},
			getChildRoutes(partialNextState, callback) {
				require.ensure([], function (require) {
					callback(null, [
						{
							path: 'factory',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('routes/SingleGames/components/Factory').default)
								})
							}
						}
					])
				})
			}
		}, {
			path: 'online-games',
			onEnter: userRequired,
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/OnlineGames').default)
				})
			},
			getIndexRoute(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, {
						component: require('routes/OnlineGames').default
					})
				})
			},
			getChildRoutes(partialNextState, callback) {
				require.ensure([], function (require) {
					callback(null, [
						{
							path: 'gobang',
							getComponent(nextState, cb) {
								require.ensure([], (require) => {
									cb(null, require('routes/OnlineGames/components/Gobang').default)
								})
							}
						}
					])
				})
			}
		}
	]
}