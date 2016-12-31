module.exports = {
	path: '/product',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/').default, 'product')
		})
	}
}