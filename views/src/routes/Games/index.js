module.exports = {
	path: '/games',

	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./index.jsx'))
		})
	}
}