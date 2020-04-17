import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';

import * as missionAction from 'modules/mission';

import * as ServiceConstants from 'constants/serviceConstants';

import MissionInterestContainer from 'containers/MissionInterestContainer';
import InputBodyAgeContainer from 'containers/InputBodyAgeContainer';
import MissionInputFormContainer from 'containers/MissionInputFormContainer';
import MissionWeightContainer from 'containers/MissionWeightContainer';
import MissionEsteemContainer from 'containers/MissionEsteemContainer';
import MissionHabitContainer from 'containers/MissionHabitContainer';

class MissionContainer extends Component {

    componentDidMount(){
        utils.extApp('04');
        utils.extApp('05', 'Success');
        window.missionContainer = this;
        // const testId = this.props.group;
    }

    extSetMisnSrno = (param) =>{
        const {MissionActions} = this.props;
        MissionActions.setMisnSrno(param);
    }

    

    render() {
        const { misnSrno } = this.props;
        let missionContents = "";

        if(misnSrno === ServiceConstants.MISN_DIV_CD_INTEREST || misnSrno === ServiceConstants.MISN_DIV_CD_CHG_MISN){//관심사 선택 및 미션 변경
            missionContents = <MissionInterestContainer />;
        } else if (misnSrno === ServiceConstants.MISN_DIV_CD_HEIGHT || misnSrno === ServiceConstants.MISN_DIV_CD_OBESITY) { // 키/몸무게 입력 미션 OR 비만체형 나이 유도 데일리 미션
            missionContents = <InputBodyAgeContainer/>;
        } else if (ServiceConstants.MISN_DIV_CD_WORD === misnSrno) { // 첫날 다짐 한마디 미션
            missionContents = <MissionInputFormContainer/>;
        } else if(ServiceConstants.MISN_DIV_CD_WEIGHT === misnSrno) { // 몸무게 미션
            missionContents = <MissionWeightContainer/>;
        } else if(ServiceConstants.MISN_DIV_CD_ESTEEM === misnSrno) { // 자존감 미션
            missionContents = <MissionEsteemContainer/>;
        } else if(ServiceConstants.MISN_DIV_CD_HABIT === misnSrno) { // 습관 미션
            missionContents = <MissionHabitContainer/>;
        } 

        return (
            <Fragment>
                { missionContents }
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        misnSrno : state.mission.get('misnSrno')
    }),
    (dispatch) => ({
        MissionActions : bindActionCreators(missionAction, dispatch)
    })
)(MissionContainer);