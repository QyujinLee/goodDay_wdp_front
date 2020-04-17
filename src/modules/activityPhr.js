import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_ACTIVITY_PHR_WEIGHT = 'activityPhr/SET_ACTIVITY_PHR_WEIGHT';
const SET_ACTIVITY_PHR_BLOOD_PRESSURE_SYSTOLIC = 'activityPhr/SET_ACTIVITY_PHR_BLOOD_PRESSURE_SYSTOLIC';
const SET_ACTIVITY_PHR_BLOOD_PRESSURE_DIASTOLIC = 'activityPhr/SET_ACTIVITY_PHR_BLOOD_PRESSURE_DIASTOLIC';
const SET_ACTIVITY_PHR_BLOOD_SUGAR_BEFORE_MEAL = 'activityPhr/SET_ACTIVITY_PHR_BLOOD_SUGAR_BEFORE_MEAL';
const SET_ACTIVITY_PHR_BLOOD_SUGAR_AFTER_MEAL = 'activityPhr/SET_ACTIVITY_PHR_BLOOD_SUGAR_AFTER_MEAL';
const SET_LATEST_DATE_WEIGHT = 'activityPhr/SET_LATEST_DATE_WEIGHT';
const SET_LATEST_DATE_BLOOD_PRESSURE = 'activityPhr/SET_LATEST_DATE_BLOOD_PRESSURE';
const SET_LATEST_DATE_BLOOD_SUGAR_BEFORE_MEAL = 'activityPhr/SET_LATEST_DATE_BLOOD_SUGAR_BEFORE_MEAL';
const SET_LATEST_DATE_BLOOD_SUGAR_AFTER_MEAL = 'activityPhr/SET_LATEST_DATE_BLOOD_SUGAR_AFTER_MEAL';
const SET_NORMAL_SCOPE_BLOOD_PRESSURE_SYSTOLIC = 'activityPhr/SET_NORMAL_SCOPE_BLOOD_PRESSURE_SYSTOLIC';
const SET_NORMAL_SCOPE_BLOOD_PRESSURE_DIASTOLIC = 'activityPhr/SET_NORMAL_SCOPE_BLOOD_PRESSURE_DIASTOLIC';
const SET_NORMAL_SCOPE_BLOOD_SUGAR_BEFORE_MEAL = 'activityPhr/SET_NORMAL_SCOPE_BLOOD_SUGAR_BEFORE_MEAL';
const SET_NORMAL_SCOPE_BLOOD_SUGAR_AFTER_MEAL = 'activityPhr/SET_NORMAL_SCOPE_BLOOD_SUGAR_AFTER_MEAL';

export const setActivityPhrWeight = createAction(SET_ACTIVITY_PHR_WEIGHT);
export const setActivityPhrBloodPressureSystolic = createAction(SET_ACTIVITY_PHR_BLOOD_PRESSURE_SYSTOLIC);
export const setActivityPhrBloodPressureDiastolic = createAction(SET_ACTIVITY_PHR_BLOOD_PRESSURE_DIASTOLIC);
export const setActivityPhrBloodSugarBeforeMeal = createAction(SET_ACTIVITY_PHR_BLOOD_SUGAR_BEFORE_MEAL);
export const setActivityPhrBloodSugarAfterMeal = createAction(SET_ACTIVITY_PHR_BLOOD_SUGAR_AFTER_MEAL);
export const setLatestDateWeight = createAction(SET_LATEST_DATE_WEIGHT);
export const setLatestDateBloodPressure = createAction(SET_LATEST_DATE_BLOOD_PRESSURE);
export const setLatestDateBloodBeforeMeal = createAction(SET_LATEST_DATE_BLOOD_SUGAR_BEFORE_MEAL);
export const setLatestDateBloodAfterMeal = createAction(SET_LATEST_DATE_BLOOD_SUGAR_AFTER_MEAL);
export const setNormalScopeBloodPressureSystolic = createAction(SET_NORMAL_SCOPE_BLOOD_PRESSURE_SYSTOLIC);
export const setNormalScopeBloodPressureDiastolic = createAction(SET_NORMAL_SCOPE_BLOOD_PRESSURE_DIASTOLIC);
export const setNormalScopeSugarBeforeMeal = createAction(SET_NORMAL_SCOPE_BLOOD_SUGAR_BEFORE_MEAL);
export const setNormalScopeSugarAfterMeal = createAction(SET_NORMAL_SCOPE_BLOOD_SUGAR_AFTER_MEAL);

const initialState = Map({
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugarBeforeMeal: '',
    bloodSugarAfterMeal: '',
    latestDateWeight: '',
    latestDateBloodPressure: '',
    latestDateBloodSugarBeforeMeal: '',
    latestDateBloodSugarAfterMeal: '',
    scopeBloodPressureSystolic: [],
    scopeBloodPressureDiastolic: [],
    scopeBloodSugarBeforeMeal: [],
    scopeBloodSugarAfterMeal: []
});

export default handleActions({
    [SET_ACTIVITY_PHR_WEIGHT]: (state, action) => {
        const { weight } = action.payload;
        return state.set('weight', weight);
    },
    [SET_ACTIVITY_PHR_BLOOD_PRESSURE_SYSTOLIC]: (state, action) => {
        const { bloodPressureSystolic } = action.payload;
        return state.set('bloodPressureSystolic', bloodPressureSystolic);
    },
    [SET_ACTIVITY_PHR_BLOOD_PRESSURE_DIASTOLIC]: (state, action) => {
        const { bloodPressureDiastolic } = action.payload;
        return state.set('bloodPressureDiastolic', bloodPressureDiastolic);
    },
    [SET_ACTIVITY_PHR_BLOOD_SUGAR_BEFORE_MEAL]: (state, action) => {
        const { bloodSugarBeforeMeal } = action.payload;
        return state.set('bloodSugarBeforeMeal', bloodSugarBeforeMeal);
    },
    [SET_ACTIVITY_PHR_BLOOD_SUGAR_AFTER_MEAL]: (state, action) => {
        const { bloodSugarAfterMeal } = action.payload;
        return state.set('bloodSugarAfterMeal', bloodSugarAfterMeal);
    },
    [SET_LATEST_DATE_WEIGHT]: (state, action) => {
        const { latestDateWeight } = action.payload;
        return state.set('latestDateWeight', latestDateWeight);
    },
    [SET_LATEST_DATE_BLOOD_PRESSURE]: (state, action) => {
        const { latestDateBloodPressure } = action.payload;
        return state.set('latestDateBloodPressure', latestDateBloodPressure);
    },
    [SET_LATEST_DATE_BLOOD_SUGAR_BEFORE_MEAL]: (state, action) => {
        const { latestDateBloodSugarBeforeMeal } = action.payload;
        return state.set('latestDateBloodSugarBeforeMeal', latestDateBloodSugarBeforeMeal);
    },
    [SET_LATEST_DATE_BLOOD_SUGAR_AFTER_MEAL]: (state, action) => {
        const { latestDateBloodSugarAfterMeal } = action.payload;
        return state.set('latestDateBloodSugarAfterMeal', latestDateBloodSugarAfterMeal);
    },
    [SET_NORMAL_SCOPE_BLOOD_PRESSURE_SYSTOLIC]: (state, action) => {
        const { scopeBloodPressureSystolic } = action.payload;
        return state.set('scopeBloodPressureSystolic', scopeBloodPressureSystolic);
    },
    [SET_NORMAL_SCOPE_BLOOD_PRESSURE_DIASTOLIC]: (state, action) => {
        const { scopeBloodPressureDiastolic } = action.payload;
        return state.set('scopeBloodPressureDiastolic', scopeBloodPressureDiastolic);
    },
    [SET_NORMAL_SCOPE_BLOOD_SUGAR_BEFORE_MEAL]: (state, action) => {
        const { scopeBloodSugarBeforeMeal } = action.payload;
        return state.set('scopeBloodSugarBeforeMeal', scopeBloodSugarBeforeMeal);
    },
    [SET_NORMAL_SCOPE_BLOOD_SUGAR_AFTER_MEAL]: (state, action) => {
        const { scopeBloodSugarAfterMeal } = action.payload;
        return state.set('scopeBloodSugarAfterMeal', scopeBloodSugarAfterMeal);
    },
}, initialState);
