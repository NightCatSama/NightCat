import store from 'store'

/*  创建动态路由  */
const createRoute = (path, name, options) => {
	return function () {
		return {
			path,
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('routes/' + name + '/index.jsx'))
				})
			}
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

/*  是否自动登陆  */
const autoLogin = (nextState, replaceState, callback) => {
	let { isLogin } = store.getState().auth
	if (isLogin) {
		callback()
		return
	}

	let token = window.localStorage.token

	if (token) {
		axios.post('/verify', {})
		.then((res) => {
			let data = res.data
			window.localStorage.token = data.token
			store.dispatch({ type: 'SET_STATUS', payload: data })
			callback()
		})
		.catch((err) => {
			window.localStorage.removeItem('token')
			callback()
		})
	}
	else {
		callback()
	}
}

/*  需要登陆  */
const userRequired = (nextState, replaceState) => {
	let { isLogin } = store.getState().auth
	if (!isLogin) {
		replaceState(`/Sign?message=${encodeURIComponent('请先登录')}&link=${nextState.location.pathname}`)
		return
	}
}

export {
	createComponent,
	createIndexRoute,
	createChildRoutes,
	createRoute,
	autoLogin,
	userRequired
}