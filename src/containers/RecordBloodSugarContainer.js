import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';

import RecordBloodSugar from 'components/RecordBloodSugar';

import * as api from 'lib/api';
import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBloodSugarActions from 'modules/recordBloodSugar';


class RecordBloodSugarContainer extends Component {
    state = {
        num : 0.1
    }
    componentDidMount() {
        utils.extApp('04');
        const { bloodSugar } = this.props;
        const bloodSugarBeforeMeal = bloodSugar.get('bloodSugarBeforeMeal');
        const bloodSugarAfterMeal = bloodSugar.get('bloodSugarAfterMeal');

        if ('create' === bloodSugar.get('inputType')) {
            
            // 혈당 기본 Set
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(utils.getBodyAgeDefaultValue('bloodSugar'), this.state.num);
        } else if ('Y' === bloodSugar.get('mealYn')) {

            // redux에 set한 혈당 데이터가 있는 경우
            // case : after
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(Number(bloodSugarAfterMeal), this.state.num);

        } else {

            // redux에 set한 혈당 데이터가 있는 경우
            // case : before
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(Number(bloodSugarBeforeMeal), this.state.num);

        }
   
    }

    /**
     * 혈당 기록 값 변경 시 Redux set
     * @param e
     * @returns {void}
     */
    handleChangeInputValue = (e) => {

        const { RecordBloodSugarActions } = this.props;

        let value = document.getElementsByClassName('inp_txt')[0].value;

        value = utils.validBodyAgeInteger(value, 'bloodSugar'); // 유효성 검사
            
        document.getElementsByClassName('inp_txt')[0].value = value;

        // 혈당 값 set
        RecordBloodSugarActions.setRecordBloodSugar({
            bloodSugar: value
        });
        document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(value, this.state.num);
    }

    scrollTimer = null;
    /**
     * 혈당 기록 스크롤
     * @param e
     * @returns {void}
     */
    handleRecordBloodSugarScroll = e => {

        let active = true; //현재 스크롤여부
        const nowScroll = e.target.scrollLeft;

        const num = 0.1;
        const valueRange = utils.getBodyAgeValueRange('bloodSugar'); // 값 범위

        if(utils.getValueByScrollPosition(nowScroll, num) > valueRange.max) {
            document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(valueRange.max, num);
        }
        
        this.displayValue(nowScroll);
        this.activeRuler(active);

        clearTimeout(this.scrollTimer);

        this.scrollTimer = setTimeout(function() {
            active = false;
            this.activeRuler(active);
        }.bind(this), 250);
        active = true;

    }

    /**
     * 혈당 기록 값
     * @param nowScroll
     * @returns {void}
     */
    displayValue(nowScroll) {
        const { RecordBloodSugarActions, bloodSugar } = this.props;
        const curCm = utils.getValueByScrollPosition(nowScroll, this.state.num);

        if(Math.abs(bloodSugar.get('bloodSugar') - curCm) > 0.1){
            RecordBloodSugarActions.setRecordBloodSugar({
                bloodSugar: curCm.toFixed(0)
            });
        }
    }

    /**
     *  혈당 기록 포인트
     * @param active
     * @returns {void}
     */
    activeRuler(active) {

        const point = document.querySelector('.value_scroll .point');

        if (active) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    }

    /**
     *  혈당 기록 초기화
     * @returns {void}
     */
    handleResetBloodSugarValue = () => {
        const { RecordBloodSugarActions, prevVal1, prevVal2 } = this.props;

        const title = '혈당 입력';
        const msg = '혈당 입력을 종료할까요?';
        const btnType = 'end';
        const callback = function(){
            // 혈당 값 set
            RecordBloodSugarActions.setRecordBloodSugar({
                bloodSugar: ''
            });
            
            if('' === prevVal1 && '' === prevVal2) {
                window.location.href = '/activity';
            } else {
                window.location.href = '/activity/detailBloodSugar';
            }
        }

        utils.showAlert(title, msg, btnType, callback);

    }

    /**
    * 식사여부 버튼 제어
    * @param e
    * @returns {void}
    */
    handleMealYN = e => {

        const { RecordBloodSugarActions, inputType, bloodSugar } = this.props;

        document.querySelectorAll('.bt_line')[0].classList.remove('sel');
        document.querySelectorAll('.bt_line')[1].classList.remove('sel');
        e.currentTarget.classList.add('sel');

        if(e.currentTarget.classList.contains('mealN')) {

            // 식사여부 값 set
            RecordBloodSugarActions.setRecordBloodSugarMealYn({
                mealYn: 'N'
            });

        } else if (e.currentTarget.classList.contains('mealY')) {

            // 식사여부 값 set
            RecordBloodSugarActions.setRecordBloodSugarMealYn({
                mealYn: 'Y'
            });

        }

        // 수정 시 값 변경
        if('modify' === inputType) {
            if(e.currentTarget.classList.contains('mealN')) {

                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(Number(bloodSugar.get('bloodSugarBeforeMeal')), this.state.num);

            } else {

                document.querySelector('.h_range_slider').scrollLeft = utils.getScrollPosition(Number(bloodSugar.get('bloodSugarAfterMeal')), this.state.num);
                
            }
        }

    }

    /**
     *  혈당 기록 API 호출
     * @returns {void}
     */
    handleRecordBloodSugar = () => {

        const { bloodSugar, inputType } = this.props;
        
        let prevVal = '';
        let params = null;

        const range = utils.getBodyAgeValueRange('bloodSugar');
        const bloodSugarVal = bloodSugar.get('bloodSugar');

        const title = '혈당 입력';
        const btnType = 'end';
        let valid = false;
        if(bloodSugarVal < range.min){
            utils.showAlert(title,'혈당은 '+ range.min + 'mmHg 미만일 수 없습니다.', btnType);
        } else if(bloodSugarVal > range.max){
            utils.showAlert(title,'혈당은 '+ range.max + 'mmHg를 초과할 수 없습니다.', btnType); 
        } else {
            valid = true;
        }

        if(!valid) return;

        // 입력 또는 수정 전의 값 선언
        if('Y' === bloodSugar.get('mealYn')) {
            prevVal = bloodSugar.get('bloodSugarAfterMeal')
        } else {
            prevVal = bloodSugar.get('bloodSugarBeforeMeal')
        }

        if('N' === bloodSugar.get('mealYn')) {
            params = [{
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_BEFORE_MEAL,
                phrItmVal : bloodSugar.get('bloodSugar')
            }];
        } else if ('Y' === bloodSugar.get('mealYn')) {
            params = [{
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_AFTER_MEAL,
                phrItmVal : bloodSugar.get('bloodSugar')
            }];
        }

        if('' === bloodSugar.get('mealYn')) {

            confirmAlert({
                customUI : ({onClose}) => (
                    <div className='popup_wrap report'>
                        <div className='title'>공복/식후를 선택하세요</div>
                        <div className='pop_conts'>
                            <p className='msg' style={{'fontWeight':'bold'}}>공복이란?</p>
                            <p className='msg'>기상 후 1시간 이내 또는<br/>식사 후 2시간 이상 경과한 경우</p>
                            <br/>
                            <p className='msg' style={{'fontWeight':'bold'}}>식후란?</p>
                            <p className='msg'>식사 후 2시간 이내인 경우</p>
                            <ul className='pop_btns'>
                                <li>
                                    <button className='btn_middle_red' onClick={onClose}>
                                        <span>확인</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            });

        } else {

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
                                window.location.href = '/activity/detailBloodSugar';
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
                            window.location.href = '/activity/detailBloodSugar';
        
                        } else {
                            console.log('API request fail : ', response[0]);
                        }
        
                    });
                }
    
            } catch (error) {
                console.log('error : ', error);
            }

        }
            
    }

    /**
     *  혈당 기록 삭제 버튼 클릭 제어
     * @returns {void}
     */
    handleClickRemoveBtn = () => {

        const title = '삭제 확인';
        const msg = '최근 혈당을<br/>정말 삭제하시겠습니까?';
        const btnType = 'remove';
        const callback = this.RemoveBloodSugarValue;

        utils.showAlert(title, msg, btnType, callback);

    }

    /**
     *  혈당 기록 삭제 API 호출
     * @returns {void}
     */
    RemoveBloodSugarValue = () => {

        const {bloodSugar} = this.props;
        let params = null;

        if('N' === bloodSugar.get('mealYn')) {
            params = [{
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_BEFORE_MEAL,
                phrItmVal : bloodSugar.get('bloodSugar')
            }];
        } else if ('Y' === bloodSugar.get('mealYn')) {
            params = [{
                phrItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_AFTER_MEAL,
                phrItmVal : bloodSugar.get('bloodSugar')
            }];
        }

        try {
                // PHR 개별 삭제 API 호출
                const deleteInputPhrDataAPI = this.deleteInputPhrDataAPI(params);
    
                deleteInputPhrDataAPI.then((response) => {
    
                    if(undefined !== response[0] && 200 === response[0].status) {
    
                        // 성공 시 activity 페이지로 이동
                        window.location.href = '/activity/detailBloodSugar';
    
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

        const { bloodSugar, inputType } = this.props;
        const mealYn = bloodSugar.get('mealYn');
        let bloodSugarVal = bloodSugar.get('bloodSugar');

        return (
            <Fragment>
                <RecordBloodSugar 
                    bloodSugar={bloodSugarVal}
                    inputType={inputType}
                    mealYn = {mealYn}
                    onChangeInputValue ={this.handleChangeInputValue}
                    onRecordBloodSugarScroll = {this.handleRecordBloodSugarScroll}
                    onResetBloodSugarValue = {this.handleResetBloodSugarValue}
                    onRecordBloodSugar = {this.handleRecordBloodSugar}
                    onMealYN = {this.handleMealYN}
                    onClickRemoveBtn = {this.handleClickRemoveBtn}
                    />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        inputType: state.recordBloodSugar.get('inputType'),
        bloodSugar: state.recordBloodSugar,
        prevVal1 : state.activityPhr.get('bloodSugarBeforeMeal'),
        prevVal2 : state.activityPhr.get('bloodSugarAfterMeal')
    }),
    (dispatch) => ({
        RecordBloodSugarActions: bindActionCreators(recordBloodSugarActions, dispatch)
    })
)(RecordBloodSugarContainer);