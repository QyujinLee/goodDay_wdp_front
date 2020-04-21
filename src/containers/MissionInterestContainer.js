import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MissionInterest from 'components/MissionInterest';
import * as missionAction from 'modules/mission';
import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as cstts from 'constants/serviceConstants';
class MissionInterestContainer extends Component {

    componentDidMount(){
        utils.extApp('04');

        const {MissionActions,misnSrno, misnDtlSrno} = this.props;
        if(misnSrno === cstts.MISN_DIV_CD_INTEREST){//관삼사 일 경우
            this.getMissionAnswerList({misnDtlSrno: misnDtlSrno}).then((response) => {
                if (response[0].data === undefined) {
                    console.log("An Error Occured");
                } else {
                    MissionActions.setInterestAnswers(response[0].data);
                }
            });
        } else if(misnSrno === cstts.MISN_DIV_CD_CHG_MISN){//미션 변경일 경우
            this.getInterestAnsList({misnDtlSrno: misnDtlSrno}).then((response) => {
                if (response[0].data === undefined) {
                    console.log("An Error Occured");
                } else {
                    MissionActions.setInterestAnswers(response[0].data);
                }
            });
        }
    }
    getMissionAnswerList = async (param) => {
        return await Promise.all(
            [api.getMissionAnswerList(param)]
        );
    }
    getInterestAnsList = async (param) => {
        return await Promise.all(
            [api.getInterestAnsList(param)]
        );
    }
    postMissionSave = async (param) => {
        return await Promise.all(
            [api.postMissionSave(param)]
        );
    }
    putMission = async (param) => {
        return await Promise.all(
            [api.putMission(param)]
        );
    }

    handleToggle = (index) =>{
        const {MissionActions, misnSrno} = this.props;
        if(misnSrno === cstts.MISN_DIV_CD_INTEREST) {
            MissionActions.setToggle(index);
        }else{
            //현재 몸무게, 습관, 마음 등 3개만 변경 가능
            if(index === 0 || index === 2 || index === 3){
                MissionActions.setToggle(index);
            } else {
                // alert('준비 중입니다.');
            }
        }
    }
    handleSave = () => {
        const { misnSrno, misnDtlSrno, misnHstSrno, ffmDt, interestAnswers} = this.props;
        
        let data = interestAnswers.toJS();
        if(misnSrno === cstts.MISN_DIV_CD_INTEREST){
            let param = [];
            for(let i in data){
                if(data[i].toggle === true){
                    data[i].misnHstSrno = misnHstSrno;
                    data[i].misnDtlSrno = misnDtlSrno;
                    data[i].ffmDt = ffmDt;
                    param.push(data[i]);
                }
            }
            this.postMissionSave(param).then((response) => {
                if (response[0] === undefined) {
                    console.log("An Error Occured");
                } else {
                    this.handleClose();
                }
            });
        } else {
            let idx = data.findIndex(item => item.toggle === true);
            let nextMisnDtlSrno = '2003000';
            if(idx === 2) nextMisnDtlSrno = '2005000';
            else if(idx === 3) nextMisnDtlSrno = '2004000';

            let param = {
                misnHstSrno : misnHstSrno,
                misnDtlSrno : misnDtlSrno,
                misnSrno : misnDtlSrno.substring(0,4),
                nextMisnDtlSrno : nextMisnDtlSrno,
                nextMisnSrno : nextMisnDtlSrno.substring(0,4),
                ffmDt : ffmDt
            };
            this.putMission(param).then((response) => {
                if (response[0] === undefined) {
                    console.log("An Error Occured");
                } else {
                    this.handleClose();
                }
            });
        }
    }
    handleClose = () => {
        //닫기
        utils.extApp('02');
    }
    render() {
        const {interestAnswers ,misnSrno, oriAnsNo} =this.props;
        return (
            <MissionInterest misnSrno={misnSrno}
                             handleToggle={this.handleToggle} 
                             interestAnswers={interestAnswers}
                             handleSave={this.handleSave}
                             handleClose={this.handleClose}
                             oriAnsNo={oriAnsNo}
                             />
        );
    }
}

export default connect(
    (state) => ({
        misnSrno : state.mission.get('misnSrno'),
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnHstSrno : state.mission.get('misnHstSrno'),
        oriAnsNo : state.mission.get('oriAnsNo'),
        ffmDt : state.mission.get('ffmDt'),
        interestAnswers : state.mission.get('interestAnswers'),
    }),
    (dispatch) => ({
        MissionActions : bindActionCreators(missionAction, dispatch)
    })
)(MissionInterestContainer);