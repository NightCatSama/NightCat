import { handleActions } from 'redux-actions'
import * as ActionTypes from 'constants/AuthType'

const initialState = {
	accessToken: null,
	signin_time: null
}

const headerBtn = handleActions({
	[ActionTypes.SET_ACCESSTOKEN](state, { payload }) {
		console.log(payload)
		return Object.assign({}, state, {
			accessToken: payload,
			signin_time: new Date()
		})
	}
}, initialState)

export default headerBtn