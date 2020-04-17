import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as api from 'lib/api';
import * as utils from 'lib/utils';

import MoreHeader from 'components/MoreHeader';
import MoreMissionHeader from 'components/MoreMissionHeader';
import MoreMissionDailyHistory from 'components/MoreMissionDailyHistory';
import MoreMissionProgramHistory from 'components/MoreMissionProgramHistory';


import * as moreActions from 'modules/more';

class MoreMissionContainer extends Component {


    componentDidMount() {
        utils.extApp('04');
        this.myMissionProcess(this.props);
    }

    myMissionProcess(props) {
        //미션 현황 조회 프로세스
        this.getMissionPresentConditionProcess();

        //미션현황 프로그램 세부 목록 조회
        this.getMissionPresentConditionProgramProcess();

        //미션현황 데일리 세부 목록 조회
        this.getMissionPresentConditionDailyProcess();
    }

    getMissionPresentConditionDailyProcess() {

        const { MoreActions } = this.props;

        const getMissionPresentConditionDaily = this.getMissionPresentConditionDailyAPI();

        getMissionPresentConditionDaily.then((response) => {

            const responseData = response[0].data.data;

            if (undefined !== responseData) {

                MoreActions.setMoreMenuMission({
                    type: 'missionDaily',
                    data: responseData
                });
            }

        })
    }

    /**
     * GET /svc/mission/present/condition
    * 미션현황 조회(데일리/프로그램/상시)
    *  @param params {object}
    *  @returns {response}
    */
    getMissionPresentConditionProcess() {

        const { MoreActions } = this.props;

        const getMissionPresentCondition = this.getMissionPresentConditionAPI();

        getMissionPresentCondition.then((response) => {

            const responseData = response[0].data.data;

            if (undefined !== responseData) {

                MoreActions.setMoreMenuMission({
                    type: 'missionCnt',
                    data: responseData
                });

            }

        })
    }

    /**
     * GET /svc/mission/present/condition/program
     * 미션현황 프로그램 세부 목록 조회
     *  @param params {object}
     *  @returns {response}
     */
    getMissionPresentConditionProgramProcess() {

        const { MoreActions } = this.props;

        const getMissionPresentConditionProgram = this.getMissionPresentConditionProgramAPI();

        getMissionPresentConditionProgram.then((response) => {

            const responseData = response[0].data.data;

            if (undefined !== responseData) {

                MoreActions.setMoreMenuMission({
                    type: 'missionProgram',
                    data: responseData
                });
            }
        })
    }
    /**
    * 미션 세부 이동 제어 
    * @param e
    * @returns {void}
    */
    handleClickGoDetail = (item) => {

        const { MoreActions } = this.props;
      
        const selectMission = {
            'misnOfrCnt': item.misnOfrCnt,
            'execCnt': item.execCnt,
            'ffmDt': item.ffmDt,
            'strDt': item.strDt,
            'endDt': item.endDt,
            'misnStatDivCd': undefined !== item.misnStatDivCd?item.misnStatDivCd:''
        }
        
        MoreActions.setMoreMenuMission({
            type: 'selectMission',
            data: selectMission
        })

        const ffmDt = undefined !== item.ffmDt ? item.ffmDt :'99991231';

        const param = {
            ffmDt: ffmDt,
            misnDtlSrno: item.misnSrno
        }

        const getMissionPresentConditionProgramDetail = this.getMissionPresentConditionProgramDetailAPI(param);

        getMissionPresentConditionProgramDetail.then((response) => {

            const responseData = response[0].data.data;

            MoreActions.setMoreMenuMission({
                type: 'missionDetail',
                data: responseData
            })
        })

        MoreActions.setMoreDivision({
            division: 'missionDetail'
        })




    }

    /**
    * 더보기 이동 제어
    * @param e
    * @returns {void}
    */
    handleClickGoPage = (value) => {

        const { MoreActions } = this.props;

        if (undefined !== value) {

            //division Redux set
            MoreActions.setMoreDivision({
                division: value
            })
        }
    }

    /**
    * 미션 이동 제어
    * @param e
    * @returns {void}
    */
    handleClickGoMission = (value) => {

        if ('walking' === value) {

            utils.extApp('10');
           
        } else {

            const { MoreActions } = this.props;

            if (undefined !== value) {

                //division Redux set
                MoreActions.setMoreMenuMission({
                    type: 'missionDivision',
                    data: value
                });
            }
        }

    }

    /**
     * 미션현황 데일리 목록 조회 API call
     *  @returns {response}
     */
    getMissionPresentConditionDailyAPI = async () => {
        return await Promise.all([
            api.getMissionPresentConditionDailyAPI()
        ]);
    }

    /**
     *미션현황 조회 API call
     * @returns {response}
     */
    getMissionPresentConditionAPI = async () => {
        return await Promise.all([
            api.getMissionPresentConditionAPI()
        ]);
    }

    /**
     *미션현황 프로그램 세부 목록 조회 API call
     * @returns {response}
     */
    getMissionPresentConditionProgramAPI = async () => {
        return await Promise.all([
            api.getMissionPresentConditionProgramAPI()
        ]);
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

    render() {

        const { missionDivision, missionCnt, program, daily ,information} = this.props;

        let missionHistoryArea = null;


        if ('program' === missionDivision) {
            missionHistoryArea = (
                <MoreMissionProgramHistory
                    program={program}
                    onClickGoDetail={this.handleClickGoDetail} />
            );
        } else if ('daily' === missionDivision) {
            missionHistoryArea = (
                /**데일리 미션 들어갈 부분  */
                <MoreMissionDailyHistory
                    daily={daily} 
                     myInfo={information}/>
            );
        }


        return (
            <div className='wrap_app'>
                <MoreHeader
                    onClickGoPage={this.handleClickGoPage} />
                <div className='contents'>
                    <div className='mission_wrap'>
                        <MoreMissionHeader
                            missionDivision={missionDivision}
                            onClickGoMission={this.handleClickGoMission}
                            missionCnt={missionCnt} />
                        {missionHistoryArea}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        missionDivision: state.more.get('menu').get('mission').get('missionDivision'),
        missionCnt: state.more.get('menu').get('mission').get('missionCnt'),
        program: state.more.get('menu').get('mission').get('missionProgram'),
        daily: state.more.get('menu').get('mission').get('missionDaily'),
        information: state.more.get('profile').get('information')
    }),
    (dispatch) => ({
        MoreActions: bindActionCreators(moreActions, dispatch)
    })
)(MoreMissionContainer);