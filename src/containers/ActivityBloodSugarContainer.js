import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import ActivityBloodSugar from 'components/ActivityBloodSugar';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import * as activityPhrActions from 'modules/activityPhr';

class ActivityBloodSugarContainer extends Component {
    
    componentDidMount(){
        utils.extApp('04');
        const {ActivityPhrActions} = this.props;

        const params = [{
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

        let statusClassName = null;
        
        scope.forEach((item) => {

            /* eslint-disable*/
            if (eval(item.strVal + item.strSymbNm + bloodSugar) && eval(item.endVal ? bloodSugar + item.endSymbNm + item.endVal : 1)) {

                if (ServiceConstants.REF_NCL_DIV_CD_NORMAL === item.refNclDivCd) {
                    statusClassName = 'my_info state';
                } else if(ServiceConstants.REF_NCL_DIV_CD_CAUTION === item.refNclDivCd) {
                    statusClassName = 'my_info state caution';
                } else if(ServiceConstants.REF_NCL_DIV_CD_DANGER === item.refNclDivCd) {
                    statusClassName = 'my_info state danger';
                }
            }

        });

        return statusClassName;
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

        const { bloodSugarBeforeMeal, bloodSugarAfterMeal, latestDateBloodSugarBeforeMeal, latestDateBloodSugarAfterMeal, 
                scopeBloodSugarBeforeMeal, scopeBloodSugarAfterMeal } = this.props;
        
        let activityBloodSugarArea = null;
        let statusClassName = '';
        
        if((bloodSugarBeforeMeal && bloodSugarAfterMeal) && ('' !== bloodSugarBeforeMeal && '' !== bloodSugarAfterMeal)) {

            if(latestDateBloodSugarBeforeMeal > latestDateBloodSugarAfterMeal) {
                statusClassName = this.getStatusClassName(bloodSugarBeforeMeal, scopeBloodSugarBeforeMeal);
            } else if(latestDateBloodSugarBeforeMeal < latestDateBloodSugarAfterMeal) {
                statusClassName = this.getStatusClassName(bloodSugarAfterMeal, scopeBloodSugarBeforeMeal);
            }

        } else if(bloodSugarBeforeMeal && '' !== bloodSugarBeforeMeal && '' === bloodSugarAfterMeal) {

            statusClassName = this.getStatusClassName(bloodSugarBeforeMeal, scopeBloodSugarBeforeMeal);

        } else if(bloodSugarAfterMeal && '' !== bloodSugarAfterMeal && '' === bloodSugarBeforeMeal) {

            statusClassName = this.getStatusClassName(bloodSugarAfterMeal, scopeBloodSugarBeforeMeal);

        }


        if('' === bloodSugarBeforeMeal && '' === bloodSugarAfterMeal) {

            activityBloodSugarArea = (
                <Link to='/activity/recordBloodSugar'>
                    <ActivityBloodSugar 
                        bloodSugarBeforeMeal={bloodSugarBeforeMeal}
                        bloodSugarAfterMeal={bloodSugarAfterMeal}/>
                </Link>
            );

        } else {

            activityBloodSugarArea = (
                <Link to='/activity/detailBloodSugar'>
                    <ActivityBloodSugar 
                        bloodSugarBeforeMeal={bloodSugarBeforeMeal}
                        bloodSugarAfterMeal={bloodSugarAfterMeal}
                        latestDateBloodSugarBeforeMeal={latestDateBloodSugarBeforeMeal}
                        latestDateBloodSugarAfterMeal={latestDateBloodSugarAfterMeal}
                        statusClassName={statusClassName}/>
                </Link>
            );

        }
        return (
            <Fragment>
                {activityBloodSugarArea}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        bloodSugarBeforeMeal: state.activityPhr.get('bloodSugarBeforeMeal'),
        bloodSugarAfterMeal: state.activityPhr.get('bloodSugarAfterMeal'),
        latestDateBloodSugarBeforeMeal:state.activityPhr.get('latestDateBloodSugarBeforeMeal'),
        latestDateBloodSugarAfterMeal:state.activityPhr.get('latestDateBloodSugarAfterMeal'),
        scopeBloodSugarBeforeMeal: state.activityPhr.get('scopeBloodSugarBeforeMeal'),
        scopeBloodSugarAfterMeal: state.activityPhr.get('scopeBloodSugarAfterMeal')
    }),
    (dispatch) => ({
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(ActivityBloodSugarContainer);