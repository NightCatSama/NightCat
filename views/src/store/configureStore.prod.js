import { createStore } from 'redux'
import rootReducer from 'reducers'

const configureStore = (initialState) => {
	return createStore(rootReducer, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined)
}

export default configureStore