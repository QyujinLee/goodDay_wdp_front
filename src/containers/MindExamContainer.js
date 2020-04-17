import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mindExamActions from 'modules/mindExam';
import MindExamMain from 'components/MindExamMain';
import MindExamDetail from 'components/MindExamDetail';
import { confirmAlert } from 'react-confirm-alert';

import * as ServiceConstants from 'constants/serviceConstants';
import * as api from 'lib/api';
import * as utils from 'lib/utils';

class MindExamContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        const { MindExamActions } = this.props;
        this.getSrvMindExamContents({ srvSrno: "1" }).then((response) => {
            if (response[0].data === undefined) {
                console.log("An Error Occured");
            } else {
                MindExamActions.setSrvData(response[0].data);
                return true;
            }
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        //문진 순서가 변경되지 않으면 랜더링하지 않는다.
        // if(this.props.qustItmNo === nextProps.qustItmNo) return false;
        return true;
    }

    handleClickNext = (e) => {
        const { qustItmNo } = this.props;
        this.moveQuestion(qustItmNo + 1);
        // this.moveQuestion(18);
    }
    handleClickBack = (e) => {
        const { qustItmNo, MindExamActions } = this.props;
        MindExamActions.setQustItmNo(qustItmNo === 0 ? 0 : qustItmNo - 1);
    }
    handleClickClose = (e) => {
        const { misnSrno, MindExamActions } = this.props;

        let alertCtt = '';
        let closeAction = function(){};

        if(undefined !== misnSrno && '' !== misnSrno) {

            alertCtt = (<Fragment>
                            <h1>미션</h1>
                            <p className='msg'>미션을 종료할까요?</p>
                        </Fragment>);
            
            closeAction = function(){
                // 앱 메인 페이지로 이동
                utils.extApp('02')
            };
            
        } else {

            alertCtt = (<Fragment>
                            <h1>마음건강 진단하기</h1>
                            <p className='msg'>마음건강 진단을 종료할까요?<br />언제든 다시 시작할 수 있어요.</p>
                        </Fragment>);

            closeAction = function(){
                MindExamActions.initSrvData();
            };

        }

        confirmAlert({
            childrenElement: () => (
                alertCtt
            ),
            buttons: [
                { label: '종료', onClick: () => { closeAction() } },
                { label: '취소', onClick: () => null }
            ]
        });
    }

    moveQuestion = (nextQustItmNo) => {
        const { MindExamActions, srvData } = this.props;
        //페이지 이동 전 처리
        if (nextQustItmNo === 8) {//우울 및 불안 점수 합산에 따라 종료 처리
            const jsonData = srvData.toJS();
            const depressedPoint = Number(jsonData[4].ansNo) + Number(jsonData[5].ansNo);//우울합산
            const unrestPonit = Number(jsonData[6].ansNo) + Number(jsonData[7].ansNo);//불안합산

            if (depressedPoint < 3 && unrestPonit < 3) {//우울합산이 3미만이고 불안합산이 3미만일경우 종료
                MindExamActions.updEndFlag(true);
            } else {
                MindExamActions.updEndFlag(false);
            }
        } else if(nextQustItmNo === 17) { //음주문진의 전혀 안마심일 경우 19번으로 이동
            const jsonData = srvData.toJS();
            if(Number(jsonData[15].ansNo) === 0) {
                nextQustItmNo = 19;
                if (Number(jsonData[18].ansNo) === 1) {
                    MindExamActions.updEndFlag(true);
                } else {
                    MindExamActions.updEndFlag(false);
                }
            }
        } else if (nextQustItmNo === 19) {//19번 문진의 답변이 아니오 일 경우 종료
            const jsonData = srvData.toJS();
            if (Number(jsonData[18].ansNo) === 1) {
                MindExamActions.updEndFlag(true);
            } else {
                MindExamActions.updEndFlag(false);
            }
        } else if (nextQustItmNo === 24) {//마지막 문진일 경우
            MindExamActions.updEndFlag(true);
        } else {
            MindExamActions.updEndFlag(false);
        }

        //페이지 이동 처리
        MindExamActions.setQustItmNo(nextQustItmNo);
    }
    handleClickAnswer = (ansNo) => {
        const { qustItmNo, srvData, MindExamActions } = this.props;
        if (qustItmNo === 8) {//8번항목의 답변에 따라 결과 보기 버튼이 활성화될수 있음
            const jsonData = srvData.toJS();
            const depressedPoint = Number(jsonData[4].ansNo) + Number(jsonData[5].ansNo);//우울합산
            const unrestPonit = Number(jsonData[6].ansNo) + Number(ansNo);//불안합산

            if (depressedPoint < 3 && unrestPonit < 3) {//우울합산이 3미만이고 불안합산이 3미만일경우 종료
                MindExamActions.updEndFlag(true);
            } else {
                MindExamActions.updEndFlag(false);
            }
        } else if (qustItmNo === 19) {
            if (Number(ansNo) === 1) {
                MindExamActions.updEndFlag(true);
            } else {
                MindExamActions.updEndFlag(false);
            }
        }

        var param = { qustItmNo: qustItmNo - 1, ansNo: ansNo };
        MindExamActions.updAnsNo(param);
        return true;
    }
    //결과보기
    handleClickViewResult = (e) => {
        const { srvData, misnDtlSrno } = this.props;
        this.saveSrvMindExamResult(srvData.toJS()).then((response) => {
            if (response[0].data === undefined) {
                console.log("An Error Occured");
            } else {
                if(ServiceConstants.MISN_DTL_SRNO_ESTEEM_MIND_EXAM_FIR === misnDtlSrno || ServiceConstants.MISN_DTL_SRNO_ESTEEM_MIND_EXAM_SEC === misnDtlSrno) {
                    window.location.href = "/activity/mindExamResult?mission=yes";
                } else {
                    window.location.href = "/activity/mindExamResult"
                }
            }
        });

    }

    /**
    * 설문 내용 조회
    * @returns {void}
    */
    getSrvMindExamContents = async (param) => {
        return await Promise.all(
            [api.getSrvMindExamContents(param)]
        );
    }
    saveSrvMindExamResult = async (param) => {
        return await Promise.all(
            [api.postSrvMindExamResult(param)]
        );
    }

    /**
     * 미션 수행 처리 (단건) API call
     * @param props
     * @returns {response}
     */
    postMissionDoAPI = async (param) => {
        return await Promise.all([
            api.postMissionDoAPI(param)
        ]);
    }

    render() {
        const { qustItmNo, srvData, endFlag } = this.props;

        return (
            <Fragment>
                {
                    qustItmNo <= 0 ?
                        <MindExamMain handleClickNext={this.handleClickNext} />
                        :
                        <MindExamDetail handleClickNext={this.handleClickNext}
                            handleClickAnswer={this.handleClickAnswer}
                            handleClickViewResult={this.handleClickViewResult}
                            handleClickBack={this.handleClickBack}
                            handleClickClose={this.handleClickClose}
                            qustItmNo={qustItmNo}
                            srvData={srvData}
                            endFlag={endFlag} />
                }
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        qustItmNo: state.mindExam.get('qustItmNo'),
        srvData: state.mindExam.get('srvData'),
        endFlag: state.mindExam.get('endFlag'),
        misnSrno : state.mission.get('misnSrno'),
        ffmDt : state.mission.get('ffmDt'),
        misnDtlSrno : state.mission.get('misnDtlSrno'),
        misnHstSrno : state.mission.get('misnHstSrno')
    }),
    (dispatch) => ({
        MindExamActions: bindActionCreators(mindExamActions, dispatch)
    })
)(MindExamContainer);