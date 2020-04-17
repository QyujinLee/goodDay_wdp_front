import { Map, fromJS } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_INPUT_TYPE = 'mission/SET_INPUT_TYPE';
const SET_MISN_SRNO = 'mission/SET_MISN_SRNO';
const SET_INTEREST_ANSWERS = 'mission/SET_INTEREST_ANSWERS';
const SET_TOGGLE = 'mission/SET_TOGGLE';
const SET_ANSWER_FIR = 'mission/SET_ANSWER_FIR';
const SET_ANSWER_SEC = 'mission/SET_ANSWER_SEC';
const SET_MISN_MANUAL = 'mission/SET_MISN_MANUAL';


export const setInputType = createAction(SET_INPUT_TYPE);
export const setMisnSrno = createAction(SET_MISN_SRNO);
export const setInterestAnswers = createAction(SET_INTEREST_ANSWERS);
export const setToggle = createAction(SET_TOGGLE);
export const setAnswerFir = createAction(SET_ANSWER_FIR);
export const setAnswerSec = createAction(SET_ANSWER_SEC);
export const setMisnManual = createAction(SET_MISN_MANUAL);

const initialState = Map({
    inputType : 'create',
    misnSrno : '',
    misnDtlSrno : '',
    misnHstSrno : '',
    // misnMode : "C", //C : insert, R : read , U : update, D : delete
    oriAnsNo : -1,
    ffmDt : '',
    interestAnswers : null,
    answerFir : '',
    answerSec : '',
    misnDtl : []
});

export default handleActions(
    {
        [SET_INPUT_TYPE]: (state, action) => {
            const { inputType } = action.payload;
            return state.set('inputType', inputType);
        },
        [SET_MISN_SRNO]: (state, action) => {
            const {misnSrno, misnDtlSrno, misnHstSrno, ffmDt} = action.payload;
            return state.set('misnSrno', misnSrno).set('misnDtlSrno', misnDtlSrno).set('misnHstSrno', misnHstSrno).set('ffmDt', ffmDt);
        },
        [SET_INTEREST_ANSWERS]: (state, action) => {
            let {data} = action.payload;
            for(let i in data){
                data[i].toggle = false;
                if(i === "0") data[i].classNm = 'weight';
                else if(i === "1") data[i].classNm = 'sports';
                else if(i === "2") data[i].classNm = 'walk';
                else if(i === "3") data[i].classNm = 'habit';
                else if(i === "4") data[i].classNm = 'mind';
                else if(i === "5") data[i].classNm = 'water';
                else if(i === "6") data[i].classNm = 'sleep';
                else if(i === "7") data[i].classNm = 'medi';
                else if(i === "8") data[i].classNm = 'pressure';
                else if(i === "9") data[i].classNm = 'blood_suger';
                else if(i === "10") data[i].classNm = 'checkup';
            }
            let oriAnsNo = -1;
            if(state.get('misnSrno') === '9999'){//미션 변경의 경우
                const misnDtlSrno = state.get('misnDtlSrno');
                if(misnDtlSrno.indexOf('2003') > -1){
                    data[0].toggle = true;
                    oriAnsNo = data[0].ansNo;
                } else if(misnDtlSrno.indexOf('2004') > -1){
                    data[3].toggle = true;
                    oriAnsNo = data[3].ansNo;
                } else if(misnDtlSrno.indexOf('2005') > -1){
                    data[2].toggle = true;
                    oriAnsNo = data[2].ansNo;
                }
            }
            return state.set("interestAnswers", fromJS(data)).set('oriAnsNo', oriAnsNo);
        },
        [SET_TOGGLE]: (state, action) => {
            const index = action.payload;
            let toggle = state.get('interestAnswers').getIn([index, 'toggle']);

            if(state.get('misnSrno') === '9999'){
                const unTogleIndex = state.get('interestAnswers').findIndex(item => item.get('toggle') === true);
                return state.set('interestAnswers',state.get('interestAnswers').setIn([unTogleIndex, 'toggle'], false).setIn([index, 'toggle'], true));
            } else {
                return state.set('interestAnswers', state.get('interestAnswers').setIn([index,'toggle'], !toggle));
            }

        },
        [SET_ANSWER_FIR]: (state, action) => {
            const { answerFir } = action.payload;
            return state.set('answerFir', answerFir);
        },
        [SET_ANSWER_SEC]: (state, action) => {
            const { answerSec } = action.payload;
            return state.set('answerSec', answerSec);
        },
        [SET_MISN_MANUAL]: (state, action) => {
            const { misnDtl } = action.payload;
            return state.set('misnDtl', misnDtl);
        },

    },
    initialState
);
