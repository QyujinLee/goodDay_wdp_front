import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordBloodPressure from 'components/RecordBloodPressure';

import * as api from 'lib/api';
import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBloodPressureActions from 'modules/recordBloodPressure';
import * as activityPhrActions from 'modules/activityPhr';


class RecordBloodPressureContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { inputType, RecordBloodPressureActions } = this.props;

        if('create' === inputType) {

            // 혈압 기본 Set
            RecordBloodPressureActions.setRecordBloodPressureSystolic({
                bloodPressureSystolic : utils.getBodyAgeDefaultValue('bloodPressureSystolic')
            });
            RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                bloodPressureDiastolic : utils.getBodyAgeDefaultValue('bloodPressureDiastolic')
            });
            
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.bloodPressure.get('bloodPressureSystolic') !== this.props.bloodPressure.get('bloodPressureSystolic')) {
            this.handleScroll('systolic');
        } else if (prevProps.bloodPressure.get('bloodPressureDiastolic') !== this.props.bloodPressure.get('bloodPressureDiastolic')) {
            this.handleScroll('diastolic');
        }
    }

    scrollTimer1 = null;
    scrollTimer2 = null;
    /**
     * 스크롤 제어
     * @param scrollType
     */
    handleScroll = (scrollType) => {

        let active = true;
        let point = '';

        if('systolic' === scrollType) {
            point = document.querySelectorAll('.value_scroll .point')[0];

            this.activeRuler(active, point);
    
            clearTimeout(this.scrollTimer1);
            this.scrollTimer1 = setTimeout(function() {
                active = false;
                this.activeRuler(active, point);
            }.bind(this), 250);
            active = true;

        } else if ('diastolic' === scrollType) {
            point = document.querySelectorAll('.value_scroll .point')[1];

            this.activeRuler(active, point);
    
            clearTimeout(this.scrollTimer2);
            this.scrollTimer2 = setTimeout(function() {
                active = false;
                this.activeRuler(active, point);
            }.bind(this), 250);
            active = true;

        }

        
    }

    /**
     * 포인트 활성/비활성
     * @param active
     * @param scrollType
     * @returns {void}
     */
    activeRuler(active, point) {

        if (active) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    }

    /**
     * 혈압 기록 값 변경 제어
     * @param e
     * @returns {void}
     */
    handleChangeInputValue = (e) => {

        const { RecordBloodPressureActions } = this.props;

        if(e.target.classList.contains('systolic')) {
            let value = document.getElementsByClassName('inp_txt systolic')[0].value
            
            value = utils.validBodyAgeInteger(value, 'bloodPressure'); // 유효성 검사
            
            // 수축기 값 set
            RecordBloodPressureActions.setRecordBloodPressureSystolic({
                bloodPressureSystolic: value
            });

        } else if (e.target.classList.contains('diastolic')) {
            let value = document.getElementsByClassName('inp_txt diastolic')[0].value

            value = utils.validBodyAgeInteger(value, 'bloodPressure'); // 유효성 검사
            
            // 이완기 값 set
            RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                bloodPressureDiastolic: value
            });
        }
    }

    /**
     *  혈압 기록 초기화
     * @returns {void}
     */
    handleResetBloodPressureValue = () => {
        const { RecordBloodPressureActions, prevVal } = this.props;

        const title = '혈압 입력';
        const msg = '혈압 입력을 종료할까요?';
        const btnType = 'end';
        const callback = function(){
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

        utils.showAlert(title, msg, btnType, callback);

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
        const btnType = 'end';
        let valid = false;
        if(bloodPressureSystolic < range.min){
            utils.showAlert(title,'수축기는 '+ range.min + 'mmHg 미만일 수 없습니다.', btnType);
        } else if(bloodPressureSystolic > range.max){
            utils.showAlert(title,'수축기는 '+ range.max + 'mmHg를 초과할 수 없습니다.', btnType);
        } else if(bloodPressureDiastolic < range.min){
            utils.showAlert(title,'이완기는 '+ range.min + 'mmHg 미만일 수 없습니다.', btnType);
        } else if(bloodPressureDiastolic > range.max){
            utils.showAlert(title,'이완기는 '+ range.max + 'mmHg를 초과할 수 없습니다.', btnType);
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

        const title = '삭제 확인';
        const msg = '최근 혈압을<br/>정말 삭제하시겠습니까?';
        const btnType = 'remove';
        const callback = this.RemoveBloodPressureValue;

        utils.showAlert(title, msg, btnType, callback);

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

    render() {

        const { bloodPressure, slideRulerType, ActivityPhrActions } = this.props;

        if('bloodPressure' !== slideRulerType) {
            ActivityPhrActions.setSlideRulerType({
                slideRulerType : 'bloodPressure'
            });
        }

        return (
            <Fragment>
                <RecordBloodPressure 
                    bloodPressure={bloodPressure}
                    onChangeInputValue ={this.handleChangeInputValue}
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
        prevVal: state.activityPhr.get('bloodPressureSystolic'),
        slideRulerType : state.activityPhr.get('slideRulerType')
    }),
    (dispatch) => ({
        RecordBloodPressureActions: bindActionCreators(recordBloodPressureActions, dispatch),
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(RecordBloodPressureContainer);