import { Map, List, fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_STEPS_CHART_DATA = 'steps/SET_STEPS_CHART_DATA';
const TOGGLE_TOOLTIP = 'steps/TOGGLE_TOOLTIP';
const SET_STEPS_RANKING_DATA ='steps/SET_STEPS_RANKING_DATA';

export const setData = createAction(SET_STEPS_CHART_DATA);
export const toggleTootip = createAction(TOGGLE_TOOLTIP);
export const setStepsRankingData=createAction(SET_STEPS_RANKING_DATA);

const initialState = Map({
    curMonthData: List([]),
    totalSteps: 0,
    avgSteps: 0,
    maxSteps: 0,
    stepsData: List([]),
    searchType: 'day',
    ranking:[]
});
   
export default handleActions(
    {
        [SET_STEPS_CHART_DATA]: (state, action) => {
            const { data } = action.payload;
            const list = data.stepsData.map(item => {
                return new Map({
                    id: item.fromDate,
                    stepCount: item.stpCnt,
                    fromDate: item.fromDate,
                    toDate: item.toDate,
                    height: Math.floor((item.stpCnt / data.maxSteps) * 100) === 0  ? 0.1 : Math.floor((item.stpCnt / data.maxSteps) * 100),
                    top: 100 - Math.floor((item.stpCnt / data.maxSteps) * 100) === 0 &&  Math.floor((item.stpCnt / data.maxSteps) * 100)!==100  ? 99.9 : 100 - Math.floor((item.stpCnt / data.maxSteps) * 100),
                    toggle: false
                });
            });
            const immulatorList = fromJS(list);
            return state
                .set('curMonthData', data.curMonthData)
                .set('totalSteps', data.totalSteps)
                .set('avgSteps', data.avgSteps)
                .set('maxSteps', data.maxSteps)
                .set('stepsData', immulatorList)
                .set('searchType', data.searchType);
        },
        [TOGGLE_TOOLTIP]: (state, action) => {
            const index = action.payload;
            const unTogleIndex = state.get('stepsData').findIndex(item => item.get('toggle') === true);
            return state.set('stepsData',state.get('stepsData').setIn([unTogleIndex, 'toggle'], false).setIn([index, 'toggle'], true));
        },
        [SET_STEPS_RANKING_DATA]:(state, action) => {
            const { ranking } = action.payload;
            return state.set('ranking', ranking);
        }
    },
    initialState
);
