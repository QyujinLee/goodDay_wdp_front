import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_HEALTH_REPORT_HEADER_TAB = 'healthReportContents/SET_HEALTH_REPORT_HEADER_TAB';
const SET_HEALTH_REPORT_HISTORY_COUNT = 'healthReportContents/SET_HEALTH_REPORT_HISTORY_COUNT';
const SET_HEALTH_REPORT_TREND_COUNT = 'healthReportContents/SET_HEALTH_REPORT_TREND_COUNT';
const SET_HEALTH_REPORT_HISTORY_YEAR_DATA = 'healthReportContents/SET_HEALTH_REPORT_HISTORY_YEAR_DATA';
const SET_HEALTH_REPORT_HISTORY_CONTENTS_DATA = 'healthReportContents/SET_HEALTH_REPORT_HISTORY_CONTENTS_DATA';
const SET_HEALTH_REPORT_DETAIL_CONTENTS_DATA = 'healthReportContents/SET_HEALTH_REPORT_DETAIL_CONTENTS_DATA';
const SET_HEALTH_REPORT_TREND_CONTENTS_DATA = 'healthReportContents/SET_HEALTH_REPORT_TREND_CONTENTS_DATA';

export const setHealthReportHeaderTab = createAction(SET_HEALTH_REPORT_HEADER_TAB);
export const setHealthReportHistoryCount = createAction(SET_HEALTH_REPORT_HISTORY_COUNT);
export const setHealthReportTrendCount = createAction(SET_HEALTH_REPORT_TREND_COUNT);
export const setHealthReportHistoryYearData = createAction(SET_HEALTH_REPORT_HISTORY_YEAR_DATA);
export const setHealthReportHistoryContentsData = createAction(SET_HEALTH_REPORT_HISTORY_CONTENTS_DATA);
export const setHealthReportDetailContentsData = createAction(SET_HEALTH_REPORT_DETAIL_CONTENTS_DATA);
export const setHealthReportTrendContentsData = createAction(SET_HEALTH_REPORT_TREND_CONTENTS_DATA);

const initialState = Map({
    headerTab: 'History',
    historyCount: -1,
    trendCount: 0,
    year: [],
    history: [],
    detail: Map({
        selectDate: [],
        mediExamGrpId: '',
        bodyAverage: {},
        livingAge: [],
        examination: [],
        lbdyAgeDivCd: '',
        livingAgeDetail: []
    }),
    trend: Map({
        recentCnt: 3,
        livingAge: {},
        examination: {}
    })
});

export default handleActions({
    [SET_HEALTH_REPORT_HEADER_TAB]: (state, action) => {
        const { headerTab } = action.payload;
        return state.set('headerTab', headerTab);
    },
    [SET_HEALTH_REPORT_HISTORY_COUNT]: (state, action) => {
        const { historyCount } = action.payload;
        return state.set('historyCount', historyCount);
    },
    [SET_HEALTH_REPORT_TREND_COUNT]: (state, action) => {
        const { trendCount } = action.payload;
        return state.set('trendCount', trendCount);
    },
    [SET_HEALTH_REPORT_HISTORY_YEAR_DATA]: (state, action) => {
        const { year } = action.payload;
        return state.set('year', year);
    },
    [SET_HEALTH_REPORT_HISTORY_CONTENTS_DATA]: (state, action) => {
        const { history } = action.payload;
        return state.set('history', history);
    },
    [SET_HEALTH_REPORT_DETAIL_CONTENTS_DATA]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['detail', type], data);
    },
    [SET_HEALTH_REPORT_TREND_CONTENTS_DATA]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['trend', type], data);
    }
}, initialState);