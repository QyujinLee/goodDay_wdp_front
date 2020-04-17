import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';
import * as api from 'lib/api';

import * as missionAction from 'modules/mission';
import MissionTimer from 'components/MissionTimer';

class MissionTimerContainer extends Component {

    componentDidMount(){
        utils.extApp('04');
        utils.extApp('05', 'Success');
    }

    handleClose = () => {
        utils.extApp('02');
    }
    handleSave = () => {
        const {misnHstSrno, misnDtlSrno, ffmDt} = this.props;
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
        const { misnDtlSrno } = this.props;

        return (
            <Fragment>
                <MissionTimer misnDtlSrno={misnDtlSrno} 
                              handleClose={this.handleClose}
                              handleSave={this.handleSave}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnHstSrno : state.mission.get('misnHstSrno'),
        ffmDt : state.mission.get('ffmDt')
    }),
    (dispatch) => ({
        MissionActions : bindActionCreators(missionAction, dispatch)
    })
)(MissionTimerContainer);