import { Map, fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_SRV_DATA = 'mindExam/SET_SRV_DATA';
const UPD_ANS_NO = 'mindExam/UPD_ANS_NO';
const SET_QUST_ITM_NO = 'mindExam/SET_QUEST_TEM_NO';
const SET_RSLT_DATA = 'mindExam/SET_RSLT_DATA';
const UPD_END_FLAG = 'mindExam/UPD_END_FLAG';
const INIT_SRV_DATA = 'mindExam/INIT_SRV_DATA';

export const setSrvData = createAction(SET_SRV_DATA);
export const updAnsNo = createAction(UPD_ANS_NO);
export const setQustItmNo = createAction(SET_QUST_ITM_NO);
export const updEndFlag = createAction(UPD_END_FLAG);
export const setRsltData = createAction(SET_RSLT_DATA);
export const initSrvData = createAction(INIT_SRV_DATA);

const initialState = Map({
    qustItmNo : 0,
    endFlag : false,
    srvData : null,
    rsltData: null,
    mindState : 'normal'
});

export default handleActions({
    [SET_SRV_DATA] : (state, action) => {
        const  {data}  = action.payload;
        for(let i in data){
            if(data[i].ansCnt === "2") data[i].ansNo = 1;
            // else if(data[i].ansCnt === "4") data[i].ansNo = 0;
            else data[i].ansNo = 0;
        }
        return state.set('srvData', fromJS(data));
    },
    [INIT_SRV_DATA] : (state, action) => {
        let data = state.get('srvData').toJS();
        for(let i in data){
            if(data[i].ansCnt === "2") data[i].ansNo = 1;
            // else if(data[i].ansCnt === "4") data[i].ansNo = 0;
            else data[i].ansNo = 0;
        }
        return state.set('srvData', fromJS(data)).set('qustItmNo', 0);
    },
    [UPD_ANS_NO] : (state, action) => {
        const{qustItmNo, ansNo} = action.payload;
        return state.set('srvData', state.get('srvData').setIn([qustItmNo,'ansNo'], ansNo));
    },
    [SET_QUST_ITM_NO] : (state, action) => {
        return state.set('qustItmNo', action.payload);
    },
    [UPD_END_FLAG] : (state, action) => {
        return state.set('endFlag', action.payload)
    },
    [SET_RSLT_DATA] : (state, action) => {
        let data  = action.payload;
        let caution = 0;
        let danger = 0;
        for(let i in data){
            const guidDesc = data[i].guidDesc;
            if(guidDesc.indexOf('caution') > 0) caution++;
            if(guidDesc.indexOf('danger') > 0) danger++;

            const idx = guidDesc.indexOf('.') + 1;
            if(idx === guidDesc.length){//한 문장 이상일 경우
                data[i].subGuidDesc = '';
            }else{
                data[i].guidDesc = guidDesc.substring(0,idx);
                data[i].subGuidDesc = guidDesc.substring(idx, guidDesc.length);
            }
        }
        let mindState = 'normal';
        if(danger > 0) mindState = 'danger';
        else if(caution > 0) mindState = 'caution';
        
        return state.set('rsltData', data).set('mindState', mindState);
    }
}, initialState);
