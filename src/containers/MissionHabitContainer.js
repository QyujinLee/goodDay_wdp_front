import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import MoreMissionDetail from 'components/MoreMissionDetail';
import MissionResult from 'components/MissionResult';

import MissionInputFormContainer from 'containers/MissionInputFormContainer';

import * as missionAction from 'modules/mission';

class MissionHabitContainer extends Component {

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

        const {misnHstSrno, misnDtlSrno, ffmDt} = this.props;

        if('goMain' === value) {
            utils.extApp('02');
        } else if ('doMissionNgoMain' === value) {

            const param = {
                ansNo : 1,
                ffmDt : ffmDt,
                misnDtlSrno : misnDtlSrno,
                misnHstSrno : misnHstSrno
            };

            this.postMissionDoAPI(param).then((response) => {
                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }
            });

        }
    }

    /**
    * 미션 수행 (단건 호출) API call
    * @returns {void}
    */
    postMissionDoAPI = async (param) => {
        return await Promise.all(
            [api.postMissionDoAPI(param)]
        );
    }

    render() {

        const { misnDtlSrno, misnDtl } = this.props;
        const category = 'guide';
        let missionHabitContents = '';

        if(undefined !== misnDtl && misnDtl.length !== 0) {
            
            if(ServiceConstants.MISN_DTL_SRNO_HABIT_GOAL === misnDtlSrno ) {
                missionHabitContents = <MissionInputFormContainer/>;
            } else if (ServiceConstants.MISN_DTL_SRNO_HABIT_MANUAL === misnDtlSrno) {
                // 습관 만들기 미션 프로그램 안내 
                missionHabitContents = <MoreMissionDetail 
                                            onClickGoPage={this.handleClickGoPage}
                                            detail={misnDtl}
                                            category={category}/>;
            } else if(ServiceConstants.MISN_DTL_SRNO_HABIT_RESULT === misnDtlSrno) {
                // 습관 만들기 미션 결과 확인
                missionHabitContents = <MissionResult
                                            onClickGoPage={this.handleClickGoPage}
                                            data={misnDtl}/>;
            }
            
        }


        return (
            <>
                {missionHabitContents}
            </>
        );
    }
}

export default connect(
    (state) => ({
        misnSrno : state.mission.get('misnSrno'),
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnDtl : state.mission.get('misnDtl'),
        misnHstSrno : state.mission.get('misnHstSrno'),
        ffmDt : state.mission.get('ffmDt')
    }),
    (dispatch) => ({
        MissionActions: bindActionCreators(missionAction, dispatch)
    })
)(MissionHabitContainer);