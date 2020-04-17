import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_INPUT_BODY_AGE_TYPE = 'inputBodyAge/SET_INPUT_BODY_AGE_TYPE';
const SET_INPUT_BODY_AGE_HEIGHT = 'inputBodyAge/SET_INPUT_BODY_AGE_HEIGHT';
const SET_INPUT_BODY_AGE_WEIGHT = 'inputBodyAge/SET_INPUT_BODY_AGE_WEIGHT';
const SET_INPUT_BODY_AGE_WAIST = 'inputBodyAge/SET_INPUT_BODY_AGE_WAIST';
const SET_INPUT_BODY_AGE_HIP = 'inputBodyAge/SET_INPUT_BODY_AGE_HIP';

export const setInputBodyAgeType = createAction(SET_INPUT_BODY_AGE_TYPE);
export const setInputBodyAgeHeight = createAction(SET_INPUT_BODY_AGE_HEIGHT);
export const setInputBodyAgeWeight = createAction(SET_INPUT_BODY_AGE_WEIGHT);
export const setInputBodyAgeWaist = createAction(SET_INPUT_BODY_AGE_WAIST);
export const setInputBodyAgeHip = createAction(SET_INPUT_BODY_AGE_HIP);

const initialState = Map({
        ageType : 'height',
        height : '',
        bodyWeight : '',
        waistCircum : '',
        hipCircum : ''
});

export default handleActions({
    [SET_INPUT_BODY_AGE_TYPE]: (state, action) => {
        const { ageType } = action.payload;
        return state.set('ageType', ageType);
    },
    [SET_INPUT_BODY_AGE_HEIGHT]: (state, action) => {
        const { height } = action.payload;
        return state.set('height', height);
    },
    [SET_INPUT_BODY_AGE_WEIGHT]: (state, action) => {
        const { bodyWeight } = action.payload;
        return state.set('bodyWeight', bodyWeight);
    },
    [SET_INPUT_BODY_AGE_WAIST]: (state, action) => {
        const { waistCircum } = action.payload;
        return state.set('waistCircum', waistCircum);
    },
    [SET_INPUT_BODY_AGE_HIP]: (state, action) => {
        const { hipCircum } = action.payload;
        return state.set('hipCircum', hipCircum);
    }
}, initialState);
