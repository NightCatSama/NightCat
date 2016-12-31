module.exports = {
	path: '/components',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/').default, 'components')
		})
	}
}