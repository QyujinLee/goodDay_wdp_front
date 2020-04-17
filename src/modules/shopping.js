import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_SHOPPING_DIVISION = 'shpping/SET_SHOPPING_DIVISION';
const SET_SHOPPING_RECOMMEND = 'shpping/SET_SHOPPING_RECOMMEND';
const SET_SHOPPING_PROFILE = 'shpping/SET_SHOPPING_PROFILE';

export const setShoppingDivision = createAction(SET_SHOPPING_DIVISION);
export const setShoppingRecommend = createAction(SET_SHOPPING_RECOMMEND);
export const setShoppingProfile = createAction(SET_SHOPPING_PROFILE);

const initialState = Map({
    division: '',
    recommend: [],
    profile: Map({
        information: []
    })
});

export default handleActions({
    [SET_SHOPPING_DIVISION]: (state, action) => {
        const { division } = action.payload;
        return state.set('division', division);
    },
    [SET_SHOPPING_RECOMMEND]: (state, action) => {
        const { recommend } = action.payload;
        return state.set('recommend', recommend);
    },
    [SET_SHOPPING_PROFILE]: (state, action) => {
        const { type, data } = action.payload;
        return state.setIn(['profile', type], data);
    },
}, initialState);