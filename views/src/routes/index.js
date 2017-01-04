const createRoute = (path, name) => {
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
	return route
}

export default createRoute
