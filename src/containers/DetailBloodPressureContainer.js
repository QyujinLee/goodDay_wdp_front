import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailBloodPressure from 'components/DetailBloodPressure';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBloodPressureActions from 'modules/recordBloodPressure';
import * as activityPhrActions from 'modules/activityPhr';

class DetailBloodPressureContainer extends Component {

    componentDidMount() {
        utils.extApp('04');

        const { RecordBloodPressureActions, ActivityPhrActions } = this.props;

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

                        if(ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC === phrItmDivCd) {

                            // Record 수축기 값 set
                            RecordBloodPressureActions.setRecordBloodPressureSystolic({
                                bloodPressureSystolic: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // Activity 수축기 값 set
                            ActivityPhrActions.setActivityPhrBloodPressureSystolic({
                                bloodPressureSystolic: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // 날짜 값 set
                            ActivityPhrActions.setLatestDateBloodPressure({
                                latestDateBloodPressure: phrArr[i].msmtDtm
                            })

                        } else if (ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC === phrItmDivCd) {

                            // Record 이완기 값 set
                            RecordBloodPressureActions.setRecordBloodPressureDiastolic({
                                bloodPressureDiastolic: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                            // Activity 이완기 값 set
                            ActivityPhrActions.setActivityPhrBloodPressureDiastolic({
                                bloodPressureDiastolic: Number(phrArr[i].phrItmVal).toFixed(0)
                            });

                        }
                    }
                }
            });
        } catch (error){
            console.log('error : ', error);
        }

        params = [{
            gndrDivCd : utils.getUserInfo().gndrDivCd,
            mediExamItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC
        },
        {
            gndrDivCd : utils.getUserInfo().gndrDivCd,
            mediExamItmDivCd : ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC
        }]

        for(let i = 0; i < params.length; i++){

            try {
                // PHR 데이터 조회 API 호출
                const getHealthReportNormalScopeAPI = this.getHealthReportNormalScopeAPI(params[i]);
    
                getHealthReportNormalScopeAPI.then((response) => {
    
                    if(undefined !== response[0] && 200 === response[0].status) {
                        
                        if(i === 0) {
                            // Activity 수축기 정상범위 값 set
                            ActivityPhrActions.setNormalScopeBloodPressureSystolic({
                                scopeBloodPressureSystolic: response[0].data.data
                            });
                        } else if(i === 1) {
                            // Activity 이완기 정상범위 값 set
                            ActivityPhrActions.setNormalScopeBloodPressureDiastolic({
                                scopeBloodPressureDiastolic: response[0].data.data
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
    getStatusClassName(bloodPressureSystolic, bloodPressureDiastolic, scopeBloodPressureSystolic, scopeBloodPressureDiastolic) {

        let statusClassName = null;
        let systolicStatus = null;
        let diastolicStatus = null;
        
        scopeBloodPressureSystolic.forEach((item) => {

            /* eslint-disable*/
            if (eval(item.strVal + item.strSymbNm + bloodPressureSystolic) && eval(item.endVal ? bloodPressureSystolic + item.strSymbNm + item.endVal : 1)) {

                if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === item.refNclDivCd) {
                    systolicStatus = 1;
                } else if(ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {
                    systolicStatus = 2;
                } else if(ServiceConstants.REF_NCL_DIV_CD_DANGER === item.refNclDivCd) {
                    systolicStatus = 3;
                }
            }

        });

        scopeBloodPressureDiastolic.forEach((item) => {
            
            /* eslint-disable*/
            if (eval(item.strVal + item.strSymbNm + bloodPressureDiastolic) && eval(item.endVal ? bloodPressureDiastolic + item.strSymbNm + item.endVal : 1)) {
                
                if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === item.refNclDivCd) {
                    diastolicStatus = 1;
                } else if(ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {
                    diastolicStatus = 2;
                } else if(ServiceConstants.REF_NCL_DIV_CD_DANGER === item.refNclDivCd) {
                    diastolicStatus = 3;
                }
            }
            
        });

        if(systolicStatus === diastolicStatus) {
            statusClassName = this.getClassName(systolicStatus);
        } else if(systolicStatus > diastolicStatus) {
            statusClassName = this.getClassName(systolicStatus);
        } else if(systolicStatus < diastolicStatus) {
            statusClassName = this.getClassName(diastolicStatus);
        }

        return statusClassName;
    }

    /**
     * 수축기 값과 이완기 값 비교 후 className 반환
     * @param value 
     * @returns string
     */
    getClassName(value) {
        if(1 === value) {
            return 'recent_num_info normal'
        } else if(2 === value) {
            return 'recent_num_info caution'
        } else if(3 === value) {
            return 'recent_num_info danger'
        } else {
            return null;
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
    * 혈압 입력 타입 변경 제어
    * @returns {void}
    */
    handleClickModifyBtn = () => {

    const { RecordBloodPressureActions } = this.props;

        // 혈압 입력 타입 변경 redux set
        RecordBloodPressureActions.setRecordBloodPressureInputType({
            inputType: 'modify'
        });
    }

    render() {

        const { bloodPressureSystolic, bloodPressureDiastolic, scopeBloodPressureSystolic, scopeBloodPressureDiastolic, latestDateBloodPressure } = this.props;

        let statusClassName = 'recent_num_info normal';
        
        if(bloodPressureSystolic && bloodPressureDiastolic && '' !== bloodPressureSystolic && '' !== bloodPressureDiastolic){
            statusClassName = this.getStatusClassName(bloodPressureSystolic, bloodPressureDiastolic, scopeBloodPressureSystolic, scopeBloodPressureDiastolic);
        }

        return (
            <DetailBloodPressure 
                bloodPressureSystolic={bloodPressureSystolic}
                bloodPressureDiastolic={bloodPressureDiastolic}
                statusClassName={statusClassName}
                latestDateBloodPressure={latestDateBloodPressure}
                onClickModifyBtn={this.handleClickModifyBtn}/>
        );
    }
}

export default connect(
    (state) => ({
        bloodPressureSystolic: state.recordBloodPressure.get('bloodPressureSystolic'),
        bloodPressureDiastolic: state.recordBloodPressure.get('bloodPressureDiastolic'),
        scopeBloodPressureSystolic: state.activityPhr.get('scopeBloodPressureSystolic'),
        scopeBloodPressureDiastolic: state.activityPhr.get('scopeBloodPressureDiastolic'),
        latestDateBloodPressure: state.activityPhr.get('latestDateBloodPressure')
    }),
    (dispatch) => ({
        RecordBloodPressureActions: bindActionCreators(recordBloodPressureActions, dispatch),
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(DetailBloodPressureContainer);