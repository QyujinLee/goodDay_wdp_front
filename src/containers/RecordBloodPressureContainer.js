import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';

import RecordBloodPressure from 'components/RecordBloodPressure';

import * as api from 'lib/api';
import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBloodPressureActions from 'modules/recordBloodPressure';


class RecordBloodPressureContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { bloodPressure, inputType } = this.props;

        if('create' === inputType) {

            // 혈압 기본 Set
            document.querySelectorAll('.h_range_slider')[0].scrollLeft = utils.getScrollPosition(utils.getBodyAgeDefaultValue('bloodPressureSystolic'));
            document.querySelectorAll('.h_range_slider')[1].scrollLeft = utils.getScrollPosition(utils.getBodyAgeDefaultValue('bloodPressureDiastolic'));
        } else {

            // redux에 set한 체중 데이터가 있는 경우
            document.querySelectorAll('.h_range_slider')[0].scrollLeft = utils.getScrollPosition(Number(bloodPressure.get('bloodPressureSystolic')));
            document.querySelectorAll('.h_range_slider')[1].scrollLeft = utils.getScrollPosition(Number(bloodPressure.get('bloodPressureDiastolic')));

        }

    }

    /**
     * 혈압 기록 값 변경 시 Redux set
     * @param e
     * @returns {void}
     */
    handleChangeInputValue = (e) => {

        const { RecordBloodPressureActions } = this.props;

        if(e.target.classList.contains('systolic')) {
            let value = document.getElementsByClassName('inp_txt systolic')[0].value
            
            value = utils.validBodyAgeInteger(value, 'bloodPressure'); // 유효성 검사
            
            document.getElementsByClassName('inp_txt systolic')[0].value = value;

            // 수축기 값 set
            RecordBloodPressureActions.setRecordBloodPressureSystolic({
                bloodPressureSystolic: value
            });
            document.querySelectorAll('.h_range_slider')[0].scrollLeft = utils.getScrollPosition(value);

        } else if (e.target.classList.contains('diastolic')) {
            let value = document.getElementsByClassName('inp_txt diastolic')[0].value

            value = utils.validBodyAgeInteger(value, 'bloodPressure'); // 유효성 검사
            
            document.getElementsByClassName('inp_txt diastolic')[0].value = value;

            // 이완기 값 set
            RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                bloodPressureDiastolic: value
            });
            document.querySelectorAll('.h_range_slider')[1].scrollLeft = utils.getScrollPosition(value);
        }
    }

    scrollTimer = null;
    /**
     * 혈압 기록 스크롤
     * @param e
     * @returns {void}
     */
    handleRecordBloodPressureScroll = e => {

        let scrollType = '';
        let active = true; //현재 스크롤여부
        const nowScroll = e.target.scrollLeft;

        const valueRange = utils.getBodyAgeValueRange('bloodPressure'); // 값 범위
        
        if(e.target.classList.contains('systolic')) {
            scrollType = 'systolic'

            if(utils.getValueByScrollPosition(nowScroll) > valueRange.max) {
                document.querySelectorAll('.h_range_slider')[0].scrollLeft = utils.getScrollPosition(valueRange.max);
            }

        } else if(e.target.classList.contains('diastolic')) {
            scrollType = 'diastolic'

            if(utils.getValueByScrollPosition(nowScroll) > valueRange.max) {
                document.querySelectorAll('.h_range_slider')[1].scrollLeft = utils.getScrollPosition(valueRange.max);
            }

        }

        this.displayValue(nowScroll, scrollType);

        this.activeRuler(active, scrollType);

        clearTimeout(this.scrollTimer);

        this.scrollTimer = setTimeout(function() {
            active = false;
            this.activeRuler(active, scrollType);
        }.bind(this), 250);
        active = true;

    }

    /**
     * 혈압 기록 값
     * @param nowScroll
     * @param scrollType
     * @returns {void}
     */
    displayValue(nowScroll, scrollType) {

        const { RecordBloodPressureActions, bloodPressure } = this.props;

        const curCm = utils.getValueByScrollPosition(nowScroll);
        if('systolic' === scrollType) {

            if(Math.abs(bloodPressure.get('bloodPressureSystolic') - curCm) > 0.1){
                // 수축기 값 set
                RecordBloodPressureActions.setRecordBloodPressureSystolic({
                    bloodPressureSystolic: curCm.toFixed(0)
                });
            }

        } else if ('diastolic' === scrollType) {

            if(Math.abs(bloodPressure.get('bloodPressureDiastolic') - curCm) > 0.1){
                // 이완기 값 set
                RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                    bloodPressureDiastolic: curCm.toFixed(0)
                });
            }

        }
    }

    /**
     *  혈압 기록 포인트
     * @param active
     * @param scrollType
     * @returns {void}
     */
    activeRuler(active, scrollType) {

        let point = ''
        if('systolic' === scrollType) {
            point = document.querySelectorAll('.value_scroll .point')[0];
        } else if ('diastolic' === scrollType) {
            point = document.querySelectorAll('.value_scroll .point')[1];
        }

        if (active) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    }

    /**
     *  혈압 기록 초기화
     * @returns {void}
     */
    handleResetBloodPressureValue = () => {
        const { RecordBloodPressureActions, prevVal } = this.props;

        confirmAlert({
            title: '혈압 입력',
            message: '혈압 입력을 종료할까요?',
            buttons: [
                { label: '종료', onClick: () => {

                        // 수축기 값 set
                        RecordBloodPressureActions.setRecordBloodPressureSystolic({
                            bloodPressureSystolic: ''
                        });

                        // 이완기 값 set
                        RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                            bloodPressureDiastolic: ''
                        });
                        
                        if('' === prevVal) {
                            window.location.href = '/activity';
                        } else {
                            window.location.href = '/activity/detailBloodPressure';
                        }
                    }
                },
                { label: '취소', onClick: () => null }
            ]
        });
    }

    /**
     *  혈압 기록 API 호출
     * @returns {void}
     */
    handleRecordBloodPressure = () => {

        const { bloodPressure, inputType, prevVal } = this.props;

        const range = utils.getBodyAgeValueRange('bloodPressure');
        const bloodPressureSystolic = bloodPressure.get('bloodPressureSystolic');
        const bloodPressureDiastolic = bloodPressure.get('bloodPressureDiastolic');

        const title = '혈압 입력';
        let valid = false;
        if(bloodPressureSystolic < range.min){
            this.showAlert(title,'수축기는 '+ range.min + 'mmHg 미만일 수 없습니다.');
        } else if(bloodPressureSystolic > range.max){
            this.showAlert(title,'수축기는 '+ range.max + 'mmHg를 초과할 수 없습니다.');
        } else if(bloodPressureDiastolic < range.min){
            this.showAlert(title,'이완기는 '+ range.min + 'mmHg 미만일 수 없습니다.');
        } else if(bloodPressureDiastolic > range.max){
            this.showAlert(title,'이완기는 '+ range.max + 'mmHg를 초과할 수 없습니다.');
        } else {
            valid = true;
        }

        if(!valid) return;

        const params = [
            {
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC,
                phrItmVal : bloodPressure.get('bloodPressureSystolic')
            },
            {
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC,
                phrItmVal : bloodPressure.get('bloodPressureDiastolic')
            }
        ];

        try {

            if('create' === inputType) {
                // PHR 개별 입력 API 호출
                const postInputPhrDataAPI = this.postInputPhrDataAPI(params);
    
                postInputPhrDataAPI.then((response) => {
    
                    if(undefined !== response[0] && 200 === response[0].status) {
                        
                        if('' === prevVal) {
                            // 메인 페이지에서의 입력 성공
                            window.location.href = '/activity';
                        } else {
                            // 상세 페이지에서의 입력 성공
                            window.location.href = '/activity/detailBloodPressure';
                        }
    
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });
            } else if ('modify' === inputType) {
                // PHR 개별 수정 API 호출
                const putInputPhrDataAPI = this.putInputPhrDataAPI(params);
    
                putInputPhrDataAPI.then((response) => {

                    console.log(response[0]);
    
                    if(undefined !== response[0] && 200 === response[0].status) {
    
                        // 성공 시 페이지 이동
                        window.location.href = '/activity/detailBloodPressure';
    
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });
            }

        } catch (error) {
            console.log('error : ', error);
        }
            
    }

    /**
     *  혈압 기록 삭제 버튼 클릭 제어
     * @returns {void}
     */
    handleClickRemoveBtn = () => {

        confirmAlert({
            childrenElement: () => (
                <Fragment>
                    <h1>삭제확인</h1>
                    <p className='msg'>최근 혈압을<br />정말 삭제하시겠습니까?</p>
                </Fragment>
            ),
            buttons: [
                { label: '삭제', onClick: () => { this.RemoveBloodPressureValue() } },
                { label: '취소', onClick: () => null }
            ]
        });

    }

    /**
     *  혈압 기록 삭제 API 호출
     * @returns {void}
     */
    RemoveBloodPressureValue = () => {

        const {bloodPressure} = this.props;

        const params = [
            {
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC,
                phrItmVal : bloodPressure.get('bloodPressureSystolic')
            },
            {
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC,
                phrItmVal : bloodPressure.get('bloodPressureDiastolic')
            }
        ];

        try {
                // PHR 개별 삭제 API 호출
                const deleteInputPhrDataAPI = this.deleteInputPhrDataAPI(params);
    
                deleteInputPhrDataAPI.then((response) => {
    
                    if(undefined !== response[0] && 200 === response[0].status) {
    
                        // 성공 시 activity 페이지로 이동
                        window.location.href = '/activity/detailBloodPressure';
    
                    } else {
                        console.log('API request fail : ', response[0]);
                    }
    
                });

            } catch(error) {
                console.log('error : ', error);
            }

    }

    /**
    * PHR 개별 입력 API call
    * @returns {void}
    */
    postInputPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.postInputPhrDataAPI(param)]
        );
    }

    /**
    * PHR 개별 수정 API call
    * @returns {void}
    */
    putInputPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.putInputPhrDataAPI(param)]
        );
    }

    /**
    * PHR 개별 삭제 API call
    * @returns {void}
    */
    deleteInputPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.deleteInputPhrDataAPI(param)]
        );
    }

    /**
     * 경고 팝업 생성
     * @param title 
     * @param msg 
     */
    showAlert(title, msg) {
        confirmAlert({
            title: title,
            message: msg,
            buttons: [
                { label: '확인', onClick: () => null }
            ]
        });
    }
    render() {

        const { bloodPressure, prevVal } = this.props;

        return (
            <Fragment>
                <RecordBloodPressure 
                    prevVal={prevVal}
                    bloodPressure={bloodPressure}
                    onChangeInputValue ={this.handleChangeInputValue}
                    onRecordBloodPressureScroll = {this.handleRecordBloodPressureScroll}
                    onResetBloodPressureValue = {this.handleResetBloodPressureValue}
                    onRecordBloodPressure = {this.handleRecordBloodPressure}
                    onClickRemoveBtn = {this.handleClickRemoveBtn}
                    />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        inputType: state.recordBloodPressure.get('inputType'),
        bloodPressure: state.recordBloodPressure,
        prevVal: state.activityPhr.get('bloodPressureSystolic')
    }),
    (dispatch) => ({
        RecordBloodPressureActions: bindActionCreators(recordBloodPressureActions, dispatch)
    })
)(RecordBloodPressureContainer);