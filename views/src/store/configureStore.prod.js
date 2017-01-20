import { createStore } from 'redux'
import rootReducer from 'reducers'

let configureStore = (initialState) => {
    const store = createStore(rootReducer, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined)
    return store
}

module.exports = configureStore