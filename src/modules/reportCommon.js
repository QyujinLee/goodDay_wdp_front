import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_REPORT_COMMON_NORMAL_SCOPE = 'healthReportCommon/SET_REPORT_COMMON_NORMAL_SCOPE';

export const setReportCommonNormalScope = createAction(SET_REPORT_COMMON_NORMAL_SCOPE);

const initialState = Map({
    normalScope: []
});

export default handleActions({
    [SET_REPORT_COMMON_NORMAL_SCOPE]: (state, action) => {
        const { normalScope } = action.payload;
        return state.set('normalScope', normalScope);
    }
}, initialState);