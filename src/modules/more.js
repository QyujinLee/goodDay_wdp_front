import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_MORE_DIVISION = 'myProfile/SET_MORE_DIVISION';
const SET_MORE_PROFILE = 'myProfile/SET_MORE_PROFILE';
const SET_MORE_MENU_MISSION = 'myProfile/SET_MORE_MENU_MISSION';

export const setMoreDivision = createAction(SET_MORE_DIVISION);
export const setMoreProfile = createAction(SET_MORE_PROFILE);
export const setMoreMenuMission = createAction(SET_MORE_MENU_MISSION);

const initialState = Map({
    division: '',
    profile: Map({
        information: [],
        point: []
    }),
    menu: Map({
        mission: Map({
            missionDivision:'program',
            missionCnt: [],
            missionProgram: [],
            selectMission: [],
            missionDetail: [],
            missionDaily:[]
        }),

    })
});

export default handleActions({
    [SET_MORE_DIVISION]: (state, action) => {
        const { division } = action.payload;
        return state.set('division', division);
    },
    [SET_MORE_PROFILE]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['profile', type], data);
    },
    [SET_MORE_MENU_MISSION]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['menu', 'mission', type], data);
    }
}, initialState);