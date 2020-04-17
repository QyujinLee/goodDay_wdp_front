import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ActivityContents from 'components/ActivityContents';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import * as activityPhrActions from 'modules/activityPhr';
import * as mindExamActions from 'modules/mindExam';

class ActivityContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { ActivityPhrActions, MindExamActions } = this.props;

        const params = {
            gndrDivCd : utils.getUserInfo().gndrDivCd
        }

        try {
            // PHR 데이터 조회 API 호출
            const getPhrDataAPI = this.getPhrDataAPI(params);

            getPhrDataAPI.then((response) => {

                if(undefined !== response[0] && 200 === response[0].status) {

                    const phrArr = response[0].data.data.phr;

                    // 마음 문진 데이터 set
                    MindExamActions.setRsltData(response[0].data.data.atms);

                    for (let i = 0, len = phrArr.length; i < len; i++) {

                        const phrItmDivCd = response[0].data.data.phr[i].phrItmDivCd;

                        switch(phrItmDivCd) {

                            case ServiceConstants.PHR_ITM_DIV_CD_WEIGHT :
                                // 체중 값 set
                                ActivityPhrActions.setActivityPhrWeight({
                                    weight: Number(phrArr[i].phrItmVal).toFixed(1)
                                });
                                // 날짜 값 set
                                ActivityPhrActions.setLatestDateWeight({
                                    latestDateWeight: phrArr[i].msmtDtm
                                })
                                break;

                            case ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC :
                                // 수축기 값 set
                                ActivityPhrActions.setActivityPhrBloodPressureSystolic({
                                    bloodPressureSystolic: Number(phrArr[i].phrItmVal).toFixed(0)
                                });
                                // 날짜 값 set
                                ActivityPhrActions.setLatestDateBloodPressure({
                                    latestDateBloodPressure: phrArr[i].msmtDtm
                                })
                                break;

                            case ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC :
                                // 이완기 값 set
                                ActivityPhrActions.setActivityPhrBloodPressureDiastolic({
                                    bloodPressureDiastolic: Number(phrArr[i].phrItmVal).toFixed(0)
                                });
                                break;

                            case ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_BEFORE_MEAL :
                                // 공복 혈당 값 set
                                ActivityPhrActions.setActivityPhrBloodSugarBeforeMeal({
                                    bloodSugarBeforeMeal: Number(phrArr[i].phrItmVal).toFixed(0)
                                });
                                // 날짜 값 set
                                ActivityPhrActions.setLatestDateBloodBeforeMeal({
                                    latestDateBloodSugarBeforeMeal: phrArr[i].msmtDtm
                                })
                                break;

                            case ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_AFTER_MEAL :
                                // 식후 혈당 값 set
                                ActivityPhrActions.setActivityPhrBloodSugarAfterMeal({
                                    bloodSugarAfterMeal: Number(phrArr[i].phrItmVal).toFixed(0)
                                });
                                // 날짜 값 set
                                ActivityPhrActions.setLatestDateBloodAfterMeal({
                                    latestDateBloodSugarAfterMeal: phrArr[i].msmtDtm
                                })
                                break;
                            
                            default :
                                break;
                        }
                    }

                } else {
                    console.log('API request fail : ', response[0]);
                }

            });

        } catch (error) {
            console.log('error : ', error);
        }

    }

    /**
    * PHR 데이터 조회 API call
    * @returns {response}
    */
    getPhrDataAPI = async (param) => {
        return await Promise.all(
            [api.getPhrDataAPI(param)]
        );
    }

    render() {

        return (
            <ActivityContents />
        );
    }
}

export default connect(
    (state) => ({
        activityPhr : state.activityPhr
    }),
    (dispatch) => ({
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch),
        MindExamActions : bindActionCreators(mindExamActions, dispatch)
    })
)(ActivityContainer);