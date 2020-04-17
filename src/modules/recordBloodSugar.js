import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_RECORD_BLOOD_SUGAR_INPUT_TYPE = 'recordBloodSugar/SET_RECORD_BLOOD_SUGAR_INPUT_TYPE';
const SET_RECORD_BLOOD_SUGAR_MEAL_YN = 'recordBloodSugar/SET_RECORD_BLOOD_SUGAR_MEAL_YN';
const SET_RECORD_BLOOD_SUGAR = 'recordBloodSugar/SET_RECORD_BLOOD_SUGAR';
const SET_RECORD_BLOOD_SUGAR_MEAL_FLAG = 'recordBloodSugar/SET_RECORD_BLOOD_SUGAR_MEAL_FLAG';
const SET_RECORD_BLOOD_SUGAR_BEFORE_MEAL = 'recordBloodSugar/SET_RECORD_BLOOD_SUGAR_BEFORE_MEAL';
const SET_RECORD_BLOOD_SUGAR_AFTER_MEAL = 'recordBloodSugar/SET_RECORD_BLOOD_SUGAR_AFTER_MEAL';

export const setRecordBloodSugarInputType = createAction(SET_RECORD_BLOOD_SUGAR_INPUT_TYPE);
export const setRecordBloodSugarMealYn = createAction(SET_RECORD_BLOOD_SUGAR_MEAL_YN);
export const setRecordBloodSugar = createAction(SET_RECORD_BLOOD_SUGAR);
export const setRecordBloodSugarMealFlag = createAction(SET_RECORD_BLOOD_SUGAR_MEAL_FLAG);
export const setRecordBloodSugarBeforeMeal = createAction(SET_RECORD_BLOOD_SUGAR_BEFORE_MEAL);
export const setRecordBloodSugarAfterMeal = createAction(SET_RECORD_BLOOD_SUGAR_AFTER_MEAL);

const initialState = Map({
        inputType: 'create',
        mealYn : '',
        bloodSugar: '',
        bloodSugarMealFlag: 'both',
        bloodSugarBeforeMeal: '',
        bloodSugarAfterMeal: ''
});

export default handleActions({
    [SET_RECORD_BLOOD_SUGAR_INPUT_TYPE]: (state, action) => {
        const { inputType } = action.payload;
        return state.set('inputType', inputType);
    },
    [SET_RECORD_BLOOD_SUGAR_MEAL_YN]: (state, action) => {
        const { mealYn } = action.payload;
        return state.set('mealYn', mealYn);
    },
    [SET_RECORD_BLOOD_SUGAR]: (state, action) => {
        const { bloodSugar } = action.payload;
        return state.set('bloodSugar', bloodSugar);
    },
    [SET_RECORD_BLOOD_SUGAR_MEAL_FLAG]: (state, action) => {
        const { bloodSugarMealFlag } = action.payload;
        return state.set('bloodSugarMealFlag', bloodSugarMealFlag);
    },
    [SET_RECORD_BLOOD_SUGAR_BEFORE_MEAL]: (state, action) => {
        const { bloodSugarBeforeMeal } = action.payload;
        return state.set('bloodSugarBeforeMeal', bloodSugarBeforeMeal);
    },
    [SET_RECORD_BLOOD_SUGAR_AFTER_MEAL]: (state, action) => {
        const { bloodSugarAfterMeal } = action.payload;
        return state.set('bloodSugarAfterMeal', bloodSugarAfterMeal);
    }
}, initialState);
