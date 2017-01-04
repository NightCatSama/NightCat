import { combineReducers } from 'redux'
import eventBus from './event-bus'

const rootReducer = combineReducers({
	eventBus
})

export default rootReducer