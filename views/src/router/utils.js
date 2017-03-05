/*  创建动态路由  */
const createRoute = (path, name, options) => {
	return {
		path,
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require('routes/' + name + '/index.jsx').default)
			})
		}
	}
}

/*  异步加载Component  */
const createComponent = (name) => {
	return (location, callback) => {
		require.ensure([], (require) => {
			callback(null, require(`../routes/${name}/index.jsx`).default)
		})
	}
}

/*  异步加载IndextRoute  */
const createIndexRoute = (name) => {
	return (partialNextState, callback) => {
		require.ensure([], (require) => {
			callback(null, {
				component: require(`../routes/${name}/index.jsx`).default,
			})
		})
	}
}


/*  异步加载ChildRoutes  */
const createChildRoutes = (arr) => {
	return (partialNextState, callback) => {
		require.ensure([], (require) => {
			callback(null, arr)
		})
	}
}

export {
	createComponent,
	createIndexRoute,
	createChildRoutes,
	createRoute
}