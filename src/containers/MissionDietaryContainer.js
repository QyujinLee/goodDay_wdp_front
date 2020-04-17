import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';
import * as api from 'lib/api';

import * as ServiceConstants from 'constants/serviceConstants';

import * as missionAction from 'modules/mission';
import MissionDietary from 'components/MissionDietary';

class MissionDietaryContainer extends Component {

    componentDidMount(){
        
        utils.extApp('04');
        utils.extApp('05', 'Success');

        const {misnDtlSrno, ffmDt, MissionActions} = this.props;

        const param = {
            ffmDt : ffmDt,
            misnDtlSrno : misnDtlSrno
        };

        this.getMissionDayAPI(param).then((response) => {

            if(undefined !== response[0] && 200 === response[0].status) {

                MissionActions.setMisnManual({
                    misnDtl: response[0].data.data[0].execDivCd
                });

            } else {
                console.log('API request fail : ', response[0]);
            }
        });
        
    }

    handleClose = () => {
        utils.extApp('02');
    }
    handleSave = () => {
        const {misnHstSrno, misnDtlSrno, ffmDt, misnDtl} = this.props;
        const param = {
            ansNo : 1,
            ffmDt : ffmDt,
            misnDtlSrno : misnDtlSrno,
            misnHstSrno : misnHstSrno,
            ansDesc : '1567'
        };
        
        if(ServiceConstants.EXEC_DIV_CD_OFFER === misnDtl) { // 식이 입력
            this.postMissionDoAPI(param).then((response) => {
                if(undefined !== response[0] && 200 === response[0].status) {
                    console.log('API request success : ', response[0]);
                    utils.extApp('02');
                } else {
                    console.log('API request fail : ', response[0]);
                }
            });
        } else { // 식이 수정
            utils.extApp('02');
        }
    }

    /**
    * 미션 수행 API call
    * @returns {void}
    */
    postMissionDoAPI = async (param) => {
        return await Promise.all(
            [api.postMissionDoAPI(param)]
        );
    }

    /**
    * 미션 조회(수행날짜 기준) API call
    * @returns {void}
    */
    getMissionDayAPI = async (param) => {
        return await Promise.all(
            [api.getMissionDayAPI(param)]
        );
    }

    render() {
        const { misnDtlSrno, misnDtl } = this.props;

        const doFirstMissionYN = ServiceConstants.EXEC_DIV_CD_OFFER === misnDtl ? 'Y' : 'N';

        return (
            <Fragment>
                <MissionDietary misnDtlSrno={misnDtlSrno} 
                              handleClose={this.handleClose}
                              handleSave={this.handleSave}
                              doFirstMissionYN={doFirstMissionYN}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnHstSrno : state.mission.get('misnHstSrno'),
        ffmDt : state.mission.get('ffmDt'),
        misnDtl : state.mission.get('misnDtl')
    }),
    (dispatch) => ({
        MissionActions : bindActionCreators(missionAction, dispatch)
    })
)(MissionDietaryContainer);