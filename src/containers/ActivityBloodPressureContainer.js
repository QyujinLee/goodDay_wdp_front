import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import ActivityBloodPressure from 'components/ActivityBloodPressure';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import * as activityPhrActions from 'modules/activityPhr';

class ActivityBloodPressureContainer extends Component {

    componentDidMount(){
        utils.extApp('04');
        const {ActivityPhrActions} = this.props;

        const params = [{
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
            return 'my_info state'
        } else if(2 === value) {
            return 'my_info state caution'
        } else if(3 === value) {
            return 'my_info state danger'
        } else {
            return null;
        }
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

    render() {

        const { bloodPressureSystolic, bloodPressureDiastolic, latestDateBloodPressure, scopeBloodPressureSystolic, scopeBloodPressureDiastolic } = this.props;

        let activityBloodPressureArea = null;
        let statusClassName = '';
        
        if(bloodPressureSystolic && bloodPressureDiastolic && '' !== bloodPressureSystolic && '' !== bloodPressureDiastolic){
            statusClassName = this.getStatusClassName(bloodPressureSystolic, bloodPressureDiastolic, scopeBloodPressureSystolic, scopeBloodPressureDiastolic);
        }
        
        if('' === bloodPressureSystolic || '' === bloodPressureDiastolic) {

            activityBloodPressureArea = (
                <Link to='/activity/recordBloodPressure'>
                    <ActivityBloodPressure 
                        bloodPressureSystolic={bloodPressureSystolic}
                        bloodPressureDiastolic={bloodPressureDiastolic}
                        scopeBloodPressureSystolic={scopeBloodPressureSystolic}
                        scopeBloodPressureDiastolic={scopeBloodPressureDiastolic}/>
                </Link>
            );

        } else {

            activityBloodPressureArea = (
                <Link to='/activity/detailBloodPressure'>
                    <ActivityBloodPressure 
                        bloodPressureSystolic={bloodPressureSystolic}
                        bloodPressureDiastolic={bloodPressureDiastolic}
                        latestDateBloodPressure={latestDateBloodPressure}
                        statusClassName={statusClassName}/>
                </Link>
            );

        }
        return (
            <Fragment>
                {activityBloodPressureArea}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        bloodPressureSystolic: state.activityPhr.get('bloodPressureSystolic'),
        bloodPressureDiastolic: state.activityPhr.get('bloodPressureDiastolic'),
        latestDateBloodPressure: state.activityPhr.get('latestDateBloodPressure'),
        scopeBloodPressureSystolic: state.activityPhr.get('scopeBloodPressureSystolic'),
        scopeBloodPressureDiastolic: state.activityPhr.get('scopeBloodPressureDiastolic')
    }),
    (dispatch) => ({
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(ActivityBloodPressureContainer);