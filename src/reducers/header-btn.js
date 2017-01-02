import { handleActions } from 'redux-actions';
import * as ActionTypes from 'constants/HeaderBtnType';

const initialState = {
    callback: null
};

const headerBtn = handleActions({
    [ActionTypes.RESGISTER_EVENT](state, { payload }) {
        return Object.assign({}, state, { callback: payload });
    },
    [ActionTypes.EXECUTE](state, { payload }) {
    	if (typeof state.callback === 'function') {
    		state.callback(payload)
    	}
    	else {
    		console.warn('仍未注册事件！')
    	}
        return Object.assign({}, state)
    }
}, initialState);

export default headerBtn;