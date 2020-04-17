import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_RECORD_BLOOD_PRESSURE_INPUT_TYPE = 'recordBloodPressure/SET_RECORD_BLOOD_PRESSURE_INPUT_TYPE';
const SET_RECORD_BLOOD_PRESSURE_SYSTOLIC = 'recordBloodPressure/SET_RECORD_BLOOD_PRESSURE_SYSTOLIC';
const SET_RECORD_BLOOD_PRESSURE_DIASTOLIC = 'recordBloodPressure/SET_RECORD_BLOOD_PRESSURE_DIASTOLIC';

export const setRecordBloodPressureInputType = createAction(SET_RECORD_BLOOD_PRESSURE_INPUT_TYPE);
export const setRecordBloodPressureSystolic = createAction(SET_RECORD_BLOOD_PRESSURE_SYSTOLIC);
export const setRecordBloodPressureDiastolic = createAction(SET_RECORD_BLOOD_PRESSURE_DIASTOLIC);

const initialState = Map({
        inputType : 'create',
        bloodPressureSystolic : '',
        bloodPressureDiastolic : ''
});

export default handleActions({
    [SET_RECORD_BLOOD_PRESSURE_INPUT_TYPE]: (state, action) => {
        const { inputType } = action.payload;
        return state.set('inputType', inputType);
    },
    [SET_RECORD_BLOOD_PRESSURE_SYSTOLIC]: (state, action) => {
        const { bloodPressureSystolic } = action.payload;
        return state.set('bloodPressureSystolic', bloodPressureSystolic);
    },
    [SET_RECORD_BLOOD_PRESSURE_DIASTOLIC]: (state, action) => {
        const { bloodPressureDiastolic } = action.payload;
        return state.set('bloodPressureDiastolic', bloodPressureDiastolic);
    }
}, initialState);
