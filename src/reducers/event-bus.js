import { handleActions } from 'redux-actions'
import * as ActionTypes from '../constants/EventBusType'

const initialState = {
    bus: {}
}

const headerBtn = handleActions({
    [ActionTypes.RESGISTER_EVENT](state, { payload }) {
        let obj = {}
        obj[payload.type] = payload.fn
        return Object.assign({}, state, obj)
    },
    [ActionTypes.EXECUTE](state, { payload }) {
    	if (typeof state[payload] === 'function') {
    		state[payload]()
    	}
        return Object.assign({}, state)
    }
}, initialState)

export default headerBtn