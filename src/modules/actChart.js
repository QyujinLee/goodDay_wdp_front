import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_ATVCHART_DATA = 'atvChart/SET_ATVCHART_DATA';

export const setData = createAction(SET_ATVCHART_DATA);

const initialState = Map({
    stepCount: 0,
    date: 0
});

export default handleActions(
    {
        [SET_ATVCHART_DATA]: (state, action) => {
            const { data } = action.payload;
            data.map(item => {
                return new Map({
                    stepCount: item.stpCnt,
                    date: item.fromDate
                });
            });
            return state.set('atvData', data);
        }
    },
    initialState
);
