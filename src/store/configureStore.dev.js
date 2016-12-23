import { createStore, compose } from 'redux'
import rootReducer from '../reducers'
import { persistState } from 'redux-devtools'
import DevTools from '../asset/DevTools'

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)


let configureStore = (initialState) => {
    const store = createStore(rootReducer, initialState, enhancer)
    return store
}

export default configureStore