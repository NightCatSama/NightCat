import { applyMiddleware, createStore, compose } from 'redux'
import { persistState } from 'redux-devtools'
import DevTools from 'asset/DevTools'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'

import config from 'config'

let middleware = config.logger ? [thunk, createLogger()] : [thunk]

const finalCreateStore = compose(
	applyMiddleware(...middleware),
	DevTools.instrument(),
	persistState(
		window.location.href.match(
			/[?&]debug_session=([^&#]+)\b/
		)
	)
)(createStore)

export default function configureStore(initialState) {
	return finalCreateStore(rootReducer, initialState)
}