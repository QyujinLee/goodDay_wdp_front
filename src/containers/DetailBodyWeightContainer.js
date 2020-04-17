import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailBodyWeight from 'components/DetailBodyWeight';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import * as recordBodyWeightActions from 'modules/recordBodyWeight';
import * as activityPhrActions from 'modules/activityPhr';

class DetailBodyWeightContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { RecordBodyWeightActions, ActivityPhrActions } = this.props;

        const params = {
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

                        if(ServiceConstants.PHR_ITM_DIV_CD_WEIGHT === phrItmDivCd) {

                            // Record 체중 값 set
                            RecordBodyWeightActions.setRecordBodyWeight({
                                weight: Number(phrArr[i].phrItmVal).toFixed(1)
                            });

                            // Activity 체중 값 set
                            ActivityPhrActions.setActivityPhrWeight({
                                weight: Number(phrArr[i].phrItmVal).toFixed(1)
                            });

                            // 날짜 값 set
                            ActivityPhrActions.setLatestDateWeight({
                                latestDateWeight: phrArr[i].msmtDtm
                            })
                        }
                    }
                }
            });
        } catch (error){
            console.log('error : ', error);
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
    * 체중 입력 타입 변경 제어
    * @returns {void}
    */
    handleClickModifyBtn = () => {

        const { RecordBodyWeightActions } = this.props;

        // 체중 입력 타입 변경 redux set
        RecordBodyWeightActions.setRecordBodyWeightInputType({
            inputType: 'modify'
        });
    }


    render() {

        const { weight, latestDateWeight } = this.props;

        return (
            <DetailBodyWeight
                weight = {weight}
                latestDateWeight = {latestDateWeight}
                onClickModifyBtn={this.handleClickModifyBtn}/>
        );
    }
}

export default connect(
    (state) => ({
        weight: state.recordBodyWeight.get('weight'),
        latestDateWeight: state.activityPhr.get('latestDateWeight')
    }),
    (dispatch) => ({
        RecordBodyWeightActions: bindActionCreators(recordBodyWeightActions, dispatch),
        ActivityPhrActions: bindActionCreators(activityPhrActions, dispatch)
    })
)(DetailBodyWeightContainer);