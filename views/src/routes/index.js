const createRoute = (path, name, options) => {
	const route = {
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require(`./${name}/index.jsx`).default, name)
			})
		}
	}
	if (path) {
		route.path = path
	}
	if (options) {
		for (let key in options) {
			route[key] = options[key]
		}
	}
	return route
}

export default createRoute
