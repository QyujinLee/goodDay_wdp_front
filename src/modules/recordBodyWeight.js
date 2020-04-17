import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_RECORD_BODY_WEIGHT_INPUT_TYPE = 'recordBodyWeight/SET_RECORD_BODY_WEIGHT_INPUT_TYPE';
const SET_RECORD_BODY_WEIGHT = 'recordBodyWeight/SET_RECORD_BODY_WEIGHT';

export const setRecordBodyWeightInputType = createAction(SET_RECORD_BODY_WEIGHT_INPUT_TYPE);
export const setRecordBodyWeight = createAction(SET_RECORD_BODY_WEIGHT);

const initialState = Map({
        inputType : 'create',
        weight : ''
});

export default handleActions({
    [SET_RECORD_BODY_WEIGHT_INPUT_TYPE]: (state, action) => {
        const { inputType } = action.payload;
        return state.set('inputType', inputType);
    },
    [SET_RECORD_BODY_WEIGHT]: (state, action) => {
        const { weight } = action.payload;
        return state.set('weight', weight);
    }
}, initialState);
