import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailBloodSugar from 'components/DetailBloodSugar';

import * as api from 'lib/api';
import * as utils from 'lib/utils';


import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBloodSugarActions from 'modules/recordBloodSugar';
import * as activityPhrActions from 'modules/activityPhr';

class DetailBloodSugarContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { RecordBloodSugarActions, ActivityPhrActions } = this.props;

        let params = {
            gndrDivCd : utils.getUserInfo().gndrDivCd
        }

        try {
            // PHR 데이터 조회 API 호출
            const getPhrDataAPI = this.getPhrDataAPI(params);

            getPhrDataAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {

                    const phrArr = response[0].data.data.phr;

                    for (let i = 0, len = phrArr.length; i < len; i++) {

                        const phrItmDivCd = response[0].data.data.phr[i].phrItmDivCd;

                        if(ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_BEFORE_MEAL === phrItmDivCd) {

                            // Record 혈당 값 set
                            RecordBloodSugarActions.setRecordBloodSugarBeforeMeal({
                                bloodSugarBeforeMeal: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // Activity 혈당 값 set
                            ActivityPhrActions.setActivityPhrBloodSugarBeforeMeal({
                                bloodSugarBeforeMeal: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // 날짜 값 set
                            ActivityPhrActions.setLatestDateBloodBeforeMeal({
                                latestDateBloodSugarBeforeMeal: phrArr[i].msmtDtm
                            })

                        } else if(ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_AFTER_MEAL === phrItmDivCd) {

                            // Record 혈당 값 set
                            RecordBloodSugarActions.setRecordBloodSugarAfterMeal({
                                bloodSugarAfterMeal: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // Activity 혈당 값 set
                            ActivityPhrActions.setActivityPhrBloodSugarAfterMeal({
                                bloodSugarAfterMeal: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // 날짜 값 set
                            ActivityPhrActions.setLatestDateBloodAfterMeal({
                                latestDateBloodSugarAfterMeal: phrArr[i].msmtDtm
                            })

                        }
                    }
                }
            });
        } catch (error){
            console.log('error : ', error);
        }

        params = [{
            gndrDivCd : utils.getUserInfo().gndrDivCd,
            mediExamItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_BEFORE_MEAL
        },
        {
            gndrDivCd : utils.getUserInfo().gndrDivCd,
            mediExamItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_AFTER_MEAL
        }]


        for(let i = 0; i < params.length; i++){

            try {
                // PHR 데이터 조회 API 호출
                const getHealthReportNormalScopeAPI = this.getHealthReportNormalScopeAPI(params[i]);
    
                getHealthReportNormalScopeAPI.then((response) => {
    
                    if(undefined !== response[0] && 200 === response[0].status) {
                        
                        if(i === 0) {
                            // Activity 공복혈당 정상범위 값 set
                            ActivityPhrActions.setNormalScopeSugarBeforeMeal({
                                scopeBloodSugarBeforeMeal: response[0].data.data
                            });
                        } else if(i === 1) {
                            // Activity 식후혈당 정상범위 값 set
                            ActivityPhrActions.setNormalScopeSugarAfterMeal({
                                scopeBloodSugarAfterMeal: response[0].data.data
                            });
                        }
                    }
                });
            } catch (error) {
                console.log('error : ', error);
            }
        }
        
    }

    /**
     * 클래스 네임 선언
     * @param bloodPressureSystolic
     * @param bloodPressureDiastolic
     * @param scopeBloodPressureSystolic
     * @param scopeBloodPressureDiastolic
     * @returns string
     */
    getStatusClassName(bloodSugar, scope) {

        if(undefined !== bloodSugar && '' !== bloodSugar) {
            let statusClassName = null;
        
            scope.forEach((item) => {

                /* eslint-disable*/
                if (eval(item.strVal + item.strSymbNm + bloodSugar) && eval(item.endVal ? bloodSugar + item.strSymbNm + item.endVal : 1)) {

                    if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === item.refNclDivCd) {
                        statusClassName = 'recent_num_info normal';
                    } else if(ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {
                        statusClassName = 'recent_num_info caution';
                    } else if(ServiceConstants.REF_NCL_DIV_CD_DANGER === item.refNclDivCd) {
                        statusClassName = 'recent_num_info danger';
                    }
                }

            });

            return statusClassName;
        } else {
            return ;
        }

    }

    /**
    * PHR 데이터 조회 API call
    * @returns {void}
    */
    getPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.getPhrDataAPI(param)]
        );
    }

    /**
    * 건강검진 검진항목별 정상 범위 데이터 조회 API call
    * @returns {void}
    */
    getHealthReportNormalScopeAPI = async (param) => {
        return await Promise.all(
            [api.getHealthReportNormalScopeAPI(param)]
        );
    }

    /**
    * 혈당 입력 타입 변경 제어 redux 내의 bloodSugarMealFlag와 mealYn 동기화
    * @returns {void}
    */
    handleClickModifyBtn = () => {

        const { bloodSugar, RecordBloodSugarActions, latestDateBloodSugarBeforeMeal, latestDateBloodSugarAfterMeal } = this.props;

        // 혈당 입력 타입 변경 redux set
        RecordBloodSugarActions.setRecordBloodSugarInputType({
            inputType: 'modify'
        });

        if('both' === bloodSugar.get('bloodSugarMealFlag')) {

            if(latestDateBloodSugarBeforeMeal > latestDateBloodSugarAfterMeal) {
                // 혈당 식사여부 (mealYN) 변경 redux set
                RecordBloodSugarActions.setRecordBloodSugarMealYn({
                    mealYn: 'N'
                });
            } else if (latestDateBloodSugarBeforeMeal < latestDateBloodSugarAfterMeal) {
                // 혈당 식사여부 (mealYN) 변경 redux set
                RecordBloodSugarActions.setRecordBloodSugarMealYn({
                    mealYn: 'Y'
                });
            }

        } else if('after' === bloodSugar.get('bloodSugarMealFlag')) {

            // 혈당 식사여부 (mealYN) 변경 redux set
            RecordBloodSugarActions.setRecordBloodSugarMealYn({
                mealYn: 'Y'
            });
            
        } else {

            // 혈당 식사여부 (mealYN) 변경 redux set
            RecordBloodSugarActions.setRecordBloodSugarMealYn({
                mealYn: 'N'
            });

        }

    }

    /**
    * 혈당 차트 식사여부 변경 제어
    * @param e
    * @returns {void}
    */
    handleClickMealFlagBtn = (e) => {

        const { RecordBloodSugarActions, bloodSugar } = this.props;
        const prevMealFlag = bloodSugar.get('bloodSugarMealFlag');
        let nextMealFlag = bloodSugar.get('bloodSugarMealFlag');

        if(e.currentTarget.classList.contains('btn_before')) {

            if('after' === prevMealFlag) {

                e.currentTarget.classList.add('sel');
                nextMealFlag = 'both';

            } else if('both' === prevMealFlag) {

                e.currentTarget.classList.remove('sel');
                nextMealFlag = 'after'
            }
            
        } else if (e.currentTarget.classList.contains('btn_after')) {
            
            if('before' === prevMealFlag) {

                e.currentTarget.classList.add('sel');
                nextMealFlag = 'both';

            } else if('both' === prevMealFlag) {

                e.currentTarget.classList.remove('sel');
                nextMealFlag = 'before'
            }

        }

        // 기존 값과 다를 경우에만 redux set
        if(prevMealFlag !== nextMealFlag) {

            // 혈당 차트 식사여부 변경 redux set
            RecordBloodSugarActions.setRecordBloodSugarMealFlag({
                bloodSugarMealFlag: nextMealFlag
            });

        }

    }

    render() {

        const { bloodSugar, scopeBloodSugarBeforeMeal, scopeBloodSugarAfterMeal, latestDateBloodSugarBeforeMeal, latestDateBloodSugarAfterMeal } = this.props;

        const bloodSugarBeforeMeal = bloodSugar.get('bloodSugarBeforeMeal');
        const bloodSugarAfterMeal = bloodSugar.get('bloodSugarAfterMeal');
        let statusClassName = 'recent_num_info normal';
        
        // 차트에서 공복 식후 버튼이 둘 다 선택되어 있을 경우
        if((undefined !== bloodSugarBeforeMeal && undefined !== bloodSugarAfterMeal)
            && ('' !== bloodSugarBeforeMeal || '' !== bloodSugarAfterMeal)
            && 'both' === bloodSugar.get('bloodSugarMealFlag')) {

            if(latestDateBloodSugarBeforeMeal > latestDateBloodSugarAfterMeal) {
                
                statusClassName = this.getStatusClassName(bloodSugarBeforeMeal, scopeBloodSugarBeforeMeal, 1);
            } else if(latestDateBloodSugarBeforeMeal < latestDateBloodSugarAfterMeal) {

                statusClassName = this.getStatusClassName(bloodSugarAfterMeal, scopeBloodSugarBeforeMeal, 2);
            }

        } else if(undefined !== bloodSugarBeforeMeal && '' !== bloodSugarBeforeMeal && 'before' === bloodSugar.get('bloodSugarMealFlag')) { // 공복만 선택의 경우

            statusClassName = this.getStatusClassName(bloodSugarBeforeMeal, scopeBloodSugarBeforeMeal, 3);

        } else if(undefined !== bloodSugarAfterMeal && '' !== bloodSugarAfterMeal && 'after' === bloodSugar.get('bloodSugarMealFlag')) { // 식후만 선택의 경우

            statusClassName = this.getStatusClassName(bloodSugarAfterMeal, scopeBloodSugarBeforeMeal, 4);

        }

        return (
            <DetailBloodSugar 
                bloodSugar={bloodSugar}
                statusClassName={statusClassName}
                latestDateBloodSugarBeforeMeal={latestDateBloodSugarBeforeMeal}
                latestDateBloodSugarAfterMeal={latestDateBloodSugarAfterMeal}
                onClickModifyBtn={this.handleClickModifyBtn}
                onClickMealFlagBtn={this.handleClickMealFlagBtn}/>
        );
    }
}

export default connect(
    (state) => ({
        bloodSugar: state.recordBloodSugar,
        scopeBloodSugarBeforeMeal: state.activityPhr.get('scopeBloodSugarBeforeMeal'),
        scopeBloodSugarAfterMeal: state.activityPhr.get('scopeBloodSugarAfterMeal'),
        latestDateBloodSugarBeforeMeal: state.activityPhr.get('latestDateBloodSugarBeforeMeal'),
        latestDateBloodSugarAfterMeal: state.activityPhr.get('latestDateBloodSugarAfterMeal')
    }),
    (dispatch) => ({
        RecordBloodSugarActions: bindActionCreators(recordBloodSugarActions, dispatch),
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(DetailBloodSugarContainer);