import { handleActions } from 'redux-actions'
import * as ActionTypes from 'constants/EventBusType'

const initialState = {
}

const headerBtn = handleActions({
    [ActionTypes.RESGISTER_EVENT](state, { payload }) {
        let obj = {}
        obj[payload.type] = payload.fn
        return Object.assign({}, state, obj)
    },
    [ActionTypes.EXECUTE](state, { payload }) {
        let { type, args } = payload
    	if (typeof state[type] === 'function') {
    		state[type].apply(null, args)
    	}
        return Object.assign({}, state)
    }
}, initialState)

export default headerBtn