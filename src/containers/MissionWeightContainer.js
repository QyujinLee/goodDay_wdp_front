import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import MoreMissionDetail from 'components/MoreMissionDetail';

import MissionInputFormContainer from 'containers/MissionInputFormContainer';
import InputBodyAgeContainer from 'containers/InputBodyAgeContainer';
import MissionTimerContainer from 'containers/MissionTimerContainer';
import MissionDietaryContainer from 'containers/MissionDietaryContainer';

import * as missionAction from 'modules/mission';

class MissionWeightContainer extends Component {

    componentDidMount(){

        const { ffmDt, misnSrno, misnDtlSrno, MissionActions } = this.props;

        if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_MANUAL === misnDtlSrno) { // 프로그램 안내 시에만 redux set

            const param = {
                ffmDt: ffmDt,
                misnDtlSrno: misnSrno
            }
    
            const getMissionPresentConditionProgramDetail = this.getMissionPresentConditionProgramDetailAPI(param);
    
            getMissionPresentConditionProgramDetail.then((response) => {
    
                const responseData = response[0].data.data
    
                MissionActions.setMisnManual({
                    misnDtl: responseData
                });
            });

        }

    }

    /**
     * 미션현황 프로그램 세부 조회 API call
     *  @returns {response}
     */
    getMissionPresentConditionProgramDetailAPI = async (params) => {
        return await Promise.all([
            api.getMissionPresentConditionProgramDetailAPI(params)
        ]);
    }

    /**
     * 프로그램 안내 뒤로가기 제어
     * @param e
     * @returns {void}
     */
    handleClickGoPage = (value) => {

        if('goMain' === value) {
            utils.extApp('02');
        }
    }

    render() {

        const { misnDtlSrno, misnDtl } = this.props;
        
        const category = 'guide';

        let missionWeightContents = '';

        if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_PROMISE === misnDtlSrno) {
            // 한줄 다짐 입력
            missionWeightContents = <MissionInputFormContainer/>;

        } else if((ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_START <= misnDtlSrno && ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_END >= misnDtlSrno) ||
                    ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_BODY_AGE_FIR === misnDtlSrno || ServiceConstants.MISN_DTL_SRNO_WEIGHT_INPUT_BODY_AGE_SEC === misnDtlSrno) {
            // 몸무게 입력 7회 또는 비만체형 나이 진단, 비만체형 나이 비교 시 페이지 이동
            missionWeightContents = <InputBodyAgeContainer/>;

        } else if(ServiceConstants.MISN_DTL_SRNO_WEIGHT_MANUAL === misnDtlSrno) {
            // 몸무게 감량 미션 프로그램 안내 
            missionWeightContents = <MoreMissionDetail 
                                        onClickGoPage={this.handleClickGoPage}
                                        detail={misnDtl}
                                        category={category}/>;
        } else if(ServiceConstants.MISN_DTL_SRNO_TIMER_WALK_START <= misnDtlSrno && ServiceConstants.MISN_DTL_SRNO_TIMER_STRETCH_END >= misnDtlSrno) {
            // 타이머
            missionWeightContents = <MissionTimerContainer />
        } else if(ServiceConstants.MISN_DTL_SRNO_DIETARY_START <= misnDtlSrno && ServiceConstants.MISN_DTL_SRNO_DIETARY_END >= misnDtlSrno){
            // 식이입력
            missionWeightContents = <MissionDietaryContainer />
        } 

        return (
            <>
                {missionWeightContents}
            </>
        );
    }
}

export default connect(
    (state) => ({
        misnSrno : state.mission.get('misnSrno'),
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnDtl : state.mission.get('misnDtl'),
        ffmDt : state.mission.get('ffmDt')
    }),
    (dispatch) => ({
        MissionActions: bindActionCreators(missionAction, dispatch)
    })
)(MissionWeightContainer);