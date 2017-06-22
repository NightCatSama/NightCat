import { combineReducers } from 'redux'
import eventBus from './event-bus'
import auth from './auth'

const rootReducer = combineReducers({
	eventBus,
	auth
})

export default rootReducer