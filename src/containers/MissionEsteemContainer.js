import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import MoreMissionDetail from 'components/MoreMissionDetail';

import MissionInputFormContainer from 'containers/MissionInputFormContainer';
import MissionTimerContainer from 'containers/MissionTimerContainer';

import * as missionAction from 'modules/mission';
import MindExamContainer from './MindExamContainer';

class MissionEsteemContainer extends Component {

    componentDidMount(){

        const { ffmDt, misnSrno, MissionActions } = this.props;

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

        let missionEsteemContents = '';

        if(ServiceConstants.MISN_DTL_SRNO_ESTEEM_DIARY_START <= misnDtlSrno && ServiceConstants.MISN_DTL_SRNO_ESTEEM_DIARY_END >= misnDtlSrno) {
            // 감사 일기 작성 미션
            missionEsteemContents = <MissionInputFormContainer/>;
        } else if(ServiceConstants.MISN_DTL_SRNO_ESTEEM_MANUAL === misnDtlSrno) {
            // 자존감 올리기 미션 프로그램 안내 
            missionEsteemContents = <MoreMissionDetail 
                                        onClickGoPage={this.handleClickGoPage}
                                        detail={misnDtl}
                                        category={category}/>;
        } else if(ServiceConstants.MISN_DTL_SRNO_TIMER_MEDITATION_START <= misnDtlSrno && misnDtlSrno <= ServiceConstants.MISN_DTL_SRNO_TIMER_MEDITATION_END ){
            // 5분 명상하기 7회
            missionEsteemContents = <MissionTimerContainer />
        } else if(ServiceConstants.MISN_DTL_SRNO_ESTEEM_MIND_EXAM_FIR === misnDtlSrno || ServiceConstants.MISN_DTL_SRNO_ESTEEM_MIND_EXAM_SEC === misnDtlSrno) {
            // 마음문진 최초, 비교 1회
            missionEsteemContents = <MindExamContainer />
        }

        return (
            <>
                {missionEsteemContents}
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
)(MissionEsteemContainer);