import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_BODY_AGE_HEADER_TAB = 'bodyAge/SET_BODY_AGE_HEADER_TAB';
const SET_BODY_AGE_TREND_COUNT = 'bodyAge/SET_BODY_AGE_TREND_COUNT';
const SET_BODY_AGE_DETAIL_CONTENTS_DATA = 'bodyAge/SET_BODY_AGE_DETAIL_CONTENTS_DATA';
const SET_BODY_AGE_TREND_CONTENTS_DATA = 'bodyAge/SET_BODY_AGE_TREND_CONTENTS_DATA';

export const setBodyAgeHeaderTab = createAction(SET_BODY_AGE_HEADER_TAB);
export const setBodyAgeTrendCount = createAction(SET_BODY_AGE_TREND_COUNT);
export const setBodyAgeDetailContentsData = createAction(SET_BODY_AGE_DETAIL_CONTENTS_DATA);
export const setBodyAgeTrendContentsData = createAction(SET_BODY_AGE_TREND_CONTENTS_DATA);

const initialState = Map({
    headerTab: 'Detail',
    trendCount: '',
    detail: Map({
        livingAge: [],
        examination: [],
        bodyAverage: {},
        selectDate: [],
        msmtDt: ''
    }),
    trend: Map({
        livingAge: [],
        examination: [],
        recentCnt: '3',
        trendCount: ''
    }),

});

export default handleActions({
    [SET_BODY_AGE_HEADER_TAB]: (state, action) => {
        const { headerTab } = action.payload;
        return state.set('headerTab', headerTab);
    },
    [SET_BODY_AGE_TREND_COUNT]: (state, action) => {
        const { trendCount } = action.payload;
        return state.set('trendCount', trendCount);
    },
    [SET_BODY_AGE_DETAIL_CONTENTS_DATA]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['detail', type], data);
    },
    [SET_BODY_AGE_TREND_CONTENTS_DATA]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['trend', type], data);
    }
}, initialState);