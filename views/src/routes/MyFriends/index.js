module.exports = {
	path: '/my-friends',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./index.jsx'))
		})
	}
}