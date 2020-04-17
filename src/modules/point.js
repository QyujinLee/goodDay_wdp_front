import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_POINT_TYPE = 'point/SET_POINT_TYPE';
const SET_POINT_REWARD = 'point/SET_POINT_REWARD';
const SET_POINT_CALLBACK = 'point/SET_POINT_CALLBACK';

export const setPointType = createAction(SET_POINT_TYPE);
export const setPointReward = createAction(SET_POINT_REWARD);
export const setPointCallback = createAction(SET_POINT_CALLBACK);

const initialState = Map({
    type: '',
    reward: {},
    callback: ''
});

export default handleActions({
    [SET_POINT_TYPE]: (state, action) => {
        return state.set('type', action.payload);
    },
    [SET_POINT_REWARD]: (state, action) => {
        return state.set('reward', action.payload);
    },
    [SET_POINT_CALLBACK]: (state, action) => {
        return state.set('callback', action.payload);
    }
}, initialState)