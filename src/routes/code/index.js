module.exports = {
	path: '/code',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/').default, 'code')
		})
	}
}