import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as pointActions from 'modules/point';

class PointContainer extends Component {

    constructor() {
        super();
        window.pointContainer = this;
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.reward !== nextProps.reward) {

            this.pointProcess(nextProps);
            return true;
        }

        return true;
    }

    /**
     * 포인트 지급 프로세스
     * @param props
     * @returns {void}
     */
    pointProcess(props) {

        const param = {
            rwdMgmtId: props.reward.rwdMgmtId,
            misnDtlSrno: props.reward.misnDtlSrno,
            misnHstSrno: props.reward.misnHstSrno,
            ffmDt: props.reward.ffmDt
        };

        const postPoint = this.postPointAPI(param);
        const targetElement = document.querySelector('.coin_bag').childNodes;

        postPoint.then((response) => {

            if (undefined !== response[0]) {

                const responseData = response[0].data.data;

                document.getElementById('point').innerHTML = responseData.pnt;

                // 미션일 경우 포인트 수령완료 처리
                if ('' === param.rwdMgmtId) {
                    
                    param.pntRecvYn = 'Y';
                    const putMissionPoint = this.putMissionPointAPI(param);
                    putMissionPoint.then((response) => {
                        console.log('포인트 수령완료 처리');
                    });
                }

                // dropBox move
                targetElement.forEach(element => {

                    setTimeout(() => {
                        element.classList.add('move');
                    }, utils.boxRandom(0, 500));
                });

                // dropBox delete
                targetElement.forEach(element => {

                    setTimeout(() => {
                        element.remove();
                    }, 1000);
                });
            }

        }, setTimeout(() => {
            document.querySelector('.coin_bag').remove();
        }, 1000));
    }

    /**
    * 포인트 지급 요청
    * @param param
    * @returns {void}
    */
    extSetPoint(param) {

        const { PointActions } = this.props;
        PointActions.setPointType(param.type);
        PointActions.setPointReward(param.reward);
    }

    /**
    * 포인트 등록 API call
    * @param param
    * @returns {response}
    */
    postPointAPI = async (param) => {
        return await Promise.all(
            [api.postPointAPI(param)]
        );
    }

    /**
    * Mission 포인트 수행이력 변경 API call
    * @param param
    * @returns {response}
    */
   putMissionPointAPI = async (param) => {
        return await Promise.all(
            [api.putMissionPointAPI(param)]
        );
    }

    /**
     * 팝업 닫기
     * @returns {void}
     */
    handleClosed = () => {

        utils.extApp('02');
    }

    render() {

        const { type } = this.props; //props data
        const boxList = [];
        for (let i = 0; i < 30; i++) {
            boxList.push(utils.dropBoxStyle());
        }

        return (
            <Fragment>
                <div className='popup_wrap point'>
                    <div className='title'>{'attendance' === type ? '출석체크 EVENT' : ''}</div>
                    <div className='pop_conts'>
                        <div className='tomi_coin'>
                        </div>
                        {
                            'attendance' === type ?
                                (
                                    <p className='msg_M'>
                                        <strong className='highlight'><b><span id='point'></span>P</b> 획득</strong>
                                        매일 매일 출석만해도<br />
                                        포인트가 팡팡팡!
                                    </p>

                                ) : (
                                    <p className='msg_L'><b><span id='point'></span>P</b>를<br />획득하였습니다.</p>
                                )
                        }
                        <div className='pop_btns'>
                            <button className='btn_middle_red' onClick={this.handleClosed}>
                                {'attendance' === type ? <span>오늘도 하이파이브</span> : <span>확인</span>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='coin_bag'>
                    {
                        boxList.map((item, index) => {
                            return <div key={index} className='box' style={item.boxStyle}></div>
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        type: state.point.get('type'),
        reward: state.point.get('reward')
    }),
    (dispatch) => ({
        PointActions: bindActionCreators(pointActions, dispatch)
    })
)(PointContainer);