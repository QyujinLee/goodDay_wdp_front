import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';

import * as missionAction from 'modules/mission';

import * as utils from 'lib/utils';
import * as api from 'lib/api';

import * as ServiceConstants from 'constants/serviceConstants';

import MissionInputForm from 'components/MissionInputForm';

class MissionInputFormContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
        utils.extApp('05', 'Success');
        
        const { misnSrno, misnDtlSrno, misnHstSrno, ffmDt, MissionActions } = this.props;

        if(undefined !== misnDtlSrno){

            try {
    
                const param = {
                    ffmDt : ffmDt,
                    misnDtlSrno : misnDtlSrno
                }
    
                // 미션 조회 (수행날짜 기준) API 호출
                const getMissionDayAPI = this.getMissionDayAPI(param);
    
                getMissionDayAPI.then((response) => {
    
                    if(undefined !== response[0] && 200 === response[0].status) {
                        
                        // 첫 대답
                        let ansDesc1 = '';
                        // 두번째 대답 
                        let ansDesc2 = '';
                        // 미션 실행 여부
                        let execDivCd = '';
    
                        response[0].data.data.forEach(element => {
                            if(element.misnSrno === misnSrno && element.misnDtlSrno === misnDtlSrno && element.misnHstSrno === misnHstSrno && element.ffmDt === ffmDt) {
                                if(element.ansDesc) {
                                    execDivCd = element.execDivCd;
                                    ansDesc1 = element.ansDesc.split('|')[0];
                                    ansDesc2 = element.ansDesc.split('|')[1];
                                }
                            }
                        });
    
                        if(ServiceConstants.EXEC_DIV_CD_EXECUTION === execDivCd) { // 수정 일 경우
                            
                            // inputType redux set
                            MissionActions.setInputType({
                                inputType: 'modify'
                            });

                            if(ServiceConstants.MISN_DIV_CD_WORD === misnSrno || ServiceConstants.MISN_DIV_CD_WEIGHT === misnSrno) {
                                // 입력값 redux set
                                MissionActions.setAnswerSec({
                                    answerSec: ansDesc1
                                });
                            } else if(ServiceConstants.MISN_DIV_CD_ESTEEM === misnSrno){

                                // 감사할 대상 redux set
                                MissionActions.setAnswerFir({
                                    answerFir: ansDesc1
                                });
                                // 감사 문구 redux set
                                MissionActions.setAnswerSec({
                                    answerSec: ansDesc2
                                });

                            }
    
                        }
    
                        console.log('API request success : ', response[0]);
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });
                
            } catch (error) {
                console.log('error : ', error);
            }
        }
    }

    /**
     * 미션 수행 (단건 용) API 호출 프로세스
     * @param param
     */
    postMissionDoProcess(param) {
        try {

            // 미션 수행 (단건 용) API 호출
            const postMissionDoAPI = this.postMissionDoAPI(param);

            postMissionDoAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }

            });
            
        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
     * 미션 수행 수정 (답변 수정) API 호출 프로세스
     * @param param
     */
    putMissionDoProcess(param) {
        try {

            // 미션 수행 수정 (답변 수정) API 호출
            const putMissionDoAPI = this.putMissionDoAPI(param);

            putMissionDoAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }

            });
            
        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
     * 미션 수행 (리스트 용) API 호출 프로세스
     * @param param
     */
    postMissionDosProcess(param) {
        try {

            // 미션 수행 (단건 용) API 호출
            const postMissionDosAPI = this.postMissionDosAPI(param);

            postMissionDosAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }

            });
            
        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
     * 미션 수행 수정 (답변 수정 : 리스트용) API 호출 프로세스
     * @param param
     */
    putMissionDosProcess(param) {
        try {

            // 미션 수행 수정 (답변 수정) API 호출
            const putMissionDosAPI = this.putMissionDosAPI(param);

            putMissionDosAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }

            });
            
        } catch (error) {
            console.log('error : ', error);
        }
    }

    /**
    * 미션 수행 (단건 용) API call
    * @returns {void}
    */
    postMissionDoAPI = async (param) => {
        return await Promise.all(
            [api.postMissionDoAPI(param)]
        );
    }

    /**
    * 미션 수행 수정 (답변 수정) API call
    * @returns {void}
    */
    putMissionDoAPI = async (param) => {
        return await Promise.all(
            [api.putMissionDoAPI(param)]
        );
    }

    /**
    * 미션 수행 (리스트 용) API call
    * @returns {void}
    */
    postMissionDosAPI = async (param) => {
        return await Promise.all(
            [api.postMissionSave(param)]
        );
    }

    /**
    * 미션 수행 수정 (답변 수정 : 리스트 용) API call
    * @returns {void}
    */
    putMissionDosAPI = async (param) => {
        return await Promise.all(
            [api.putMissionDosAPI(param)]
        );
    }

    /**
    * 미션 조회 (수행날짜 기준) API call
    * @returns {void}
    */
    getMissionDayAPI = async (param) => {
        return await Promise.all(
            [api.getMissionDayAPI(param)]
        );
    }

    /**
     * 뒤로가기 버튼 클릭 제어
     * @returns {void}
     */
    handleClickBackBtn = () => {
        utils.extApp('02');
    }

    /**
     * 입력 버튼 클릭 제어
     * @param misnSrno
     * @param textareaList
     * @returns {void}
     */
    handleClickInputBtn = (misnSrno, textareaList) => {

        const { misnDtlSrno, misnHstSrno, ffmDt, inputType } = this.props;

        if(misnSrno === ServiceConstants.MISN_DIV_CD_WEIGHT || misnSrno === ServiceConstants.MISN_DIV_CD_HABIT || misnSrno === ServiceConstants.MISN_DIV_CD_WORD) {
            
            if('' !== textareaList[0].value.trim()) {
                // 몸무게 입력, 습관 목표 입력, 처음 다짐 한마디 입력
                const param = {
                    ansDesc : textareaList[0].value,
                    ansNo : 1,
                    ffmDt : ffmDt,
                    misnDtlSrno : misnDtlSrno,
                    misnHstSrno : misnHstSrno
                }

                if('modify' === inputType) { // 수정의 경우
    
                    this.putMissionDoProcess(param);
    
                } else { // 입력의 경우
    
                    this.postMissionDoProcess(param);
                    
                }

            } else {
                confirmAlert({
                    title: '다짐 입력',
                    message: '다짐을 입력해 주세요',
                    buttons: [
                        { label: '닫기', onClick: () => null }
                    ]
                });
            }

        } else if(misnSrno === ServiceConstants.MISN_DIV_CD_ESTEEM) {
            // 감사일기 입력,수정

            if('' !== textareaList[0].value.trim() && '' !== textareaList[1].value.trim()) {
                const params = [{
                    ansDesc : textareaList[0].value,
                    ansNo : 1,
                    ffmDt : ffmDt,
                    misnDtlSrno : misnDtlSrno,
                    misnHstSrno : misnHstSrno
                },
                {
                    ansDesc : textareaList[1].value,
                    ansNo : 2,
                    ffmDt : ffmDt,
                    misnDtlSrno : misnDtlSrno,
                    misnHstSrno : misnHstSrno
                }];
    
                if('modify' === inputType) { // 감사일기 수정의 경우
    
                    this.putMissionDosProcess(params);
    
                } else { // 감사일기 입력의 경우
    
                    this.postMissionDosProcess(params);
                    
                }

            } else {

                confirmAlert({
                    title: '감사일기 입력',
                    message: '감사한 사람과 내용을 모두 입력해 주세요',
                    buttons: [
                        { label: '닫기', onClick: () => null }
                    ]
                });

            }

        }
    }

    /**
     * 텍스트 입력 제어
     * @param e
     */
    handleInputKeyUp = e => {

        const { MissionActions } = this.props;
       
        e.preventDefault();
       
        const value = e.target.value;
        const targetId = e.target.id;
        const enterCnt = (value.match(/\n/g) || []).length;

        if(1 < enterCnt) {

        const message = '줄바꿈은 한 번만 가능합니다';
        this.showAlert(message, targetId, e);
              
        } else if(0 === enterCnt && 15 < value.length) {

        const message = '최대 15자까지 입력 가능합니다';
        this.showAlert(message, targetId, e);

        } else if(1 === enterCnt && 16 < value.length) {

        const message = '최대 15자까지 입력 가능합니다';
        this.showAlert(message, targetId, e);

        } else {

            if('inputPerson' === targetId) {
                MissionActions.setAnswerFir({
                    answerFir: value
                });
            } else {
                MissionActions.setAnswerSec({
                    answerSec: value
                });
            }
           
        }
        
    }

    /**
     * 텍스트 입력 시 alert 창 출력 제어
     * @param message
     * @param targetId
     * @param e
     */
    showAlert = (message, targetId, e) => {

        const { answerFir, answerSec } = this.props;

        confirmAlert({
            title: '다짐 입력',
            message: message,
            buttons: [
                { label: '닫기', onClick: () => null }
            ]
        });

        if('inputPerson' === targetId) {
            e.target.value = answerFir;
        } else {
            e.target.value = answerSec;
        }
    }


    render() {
        
        const { misnSrno, answerFir, answerSec, inputType } = this.props;
    
        return (
                <MissionInputForm
                    inputType={inputType}
                    misnSrno={misnSrno}
                    answerFir={answerFir}
                    answerSec={answerSec}
                    onClickBackBtn={this.handleClickBackBtn}
                    onClickInputBtn={this.handleClickInputBtn}
                    onKeyUpText={this.handleInputKeyUp}
                />
        );
    }
}

export default connect(
    (state) => ({
        misnSrno : state.mission.get('misnSrno'),
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnHstSrno : state.mission.get('misnHstSrno'),
        ffmDt : state.mission.get('ffmDt'),
        answerFir : state.mission.get('answerFir'),
        answerSec : state.mission.get('answerSec'),
        inputType : state.mission.get('inputType')
    }),
    (dispatch) => ({
        MissionActions : bindActionCreators(missionAction, dispatch)
    })
)(MissionInputFormContainer);