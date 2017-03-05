if (process.env.NODE_ENV === 'production') {
	var configureStore = require('./configureStore.prod')
} else {
	var configureStore = require('./configureStore.dev')
}

module.exports = configureStore