import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import MoreMenu from 'components/MoreMenu';
import MoreProfileInfo from 'components/MoreProfileInfo';
import MoreMissionDetail from 'components/MoreMissionDetail';
import MoreProduct from 'components/MoreProduct';
import MoreMyDataHistory from 'components/MoreMyDataHistory';
import MoreMyDataAgree from 'components/MoreMyDataAgree';
import MoreMyDataCancel from 'components/MoreMyDataCancel';
import MoreMembershipLevel from 'components/MoreMembershipLevel';
import MoreShoppingHistory from 'components/MoreShoppingHistory';
import MoreMissionBankBook from 'components/MoreMissionBankBook';
import MoreOurMission from 'components/MoreOurMission';

import MoreMissionContainer from 'containers/MoreMissionContainer';

import * as moreActions from 'modules/more';

class MoreContainer extends Component {

    componentDidMount() {
        
        utils.extApp('04');

        const query = queryString.parse(window.location.search);

        if ('true' === query.mission) {
            this.handleClickGoPage('mission');
        }

        this.myProfileProcess(this.props);
    }

    myProfileProcess(props) {

        //포인트 조회 프로세스 
        this.getPointProcess(props);
        //사용자 정보 조회 프로세스
        this.getUserInfoProcess(props);
    }

    /**
     * GET /svc/point
     * 포인트 조회
     *  @param params {object}
     *  @returns {response}
     */
    getPointProcess(props) {

        //포인트 조회 API 호출
        const getPoint = this.getPointAPI();

        getPoint.then((response) => {

            const { MoreActions } = this.props;

            const responseData = response[0].data.data;

            if (undefined !== responseData) {

                //myPoint Redux set
                MoreActions.setMoreProfile({
                    type: 'point',
                    data: responseData
                });

            }
        })

    }

    /**
     * 사용자 정보 조회
     */
    getUserInfoProcess(props) {

        const { MoreActions } = this.props;

        MoreActions.setMoreProfile({
            type: 'information',
            data: utils.getUserInfo()
        })

    }

    getPointAPI = async () => {
        return await Promise.all([
            api.getPointAPI()
        ]);
    }

    /**
     * 로그아웃
     * @param e
     * @returns {void}
     */
    handleClickLogout = (e) => {
        utils.extApp('11');
    }

    /**
     * 더보기 이동 제어
     * @param e
     * @returns {void}
     */
    handleClickGoPage = (value) => {

        const { MoreActions } = this.props;

        if (undefined !== value) {

            if ('missionback' === value) {

                MoreActions.setMoreMenuMission({
                    type: 'missionDetail',
                    data: ''
                })

                MoreActions.setMoreDivision({
                    division: 'mission'
                })

            } else {

                MoreActions.setMoreMenuMission({
                    type: 'missionDivision',
                    data: 'program'
                });

                //division Redux set
                MoreActions.setMoreDivision({
                    division: value
                })
            }

        }
    }

    /** 
    * myData 클래스 제어
    * @param e
    * @returns {void}
    */
    handleClickClass = e => {

        e.preventDefault();

        const targetElement = e.target.parentNode;
        const showContents = targetElement.getAttribute('rel');
        const parentElement = targetElement.parentNode.children;
        let hiddenContents = '';

        for (let i = 0, length = parentElement.length; i < length; i++) {
            hiddenContents = parentElement[i].getAttribute('rel');
            document.getElementsByClassName('my_tab_conts ' + hiddenContents)[0].style.display = 'none';
            parentElement[i].classList.remove('on');
        }
        document.getElementsByClassName('my_tab_conts ' + showContents)[0].style.display = 'block';
       
        if (targetElement.classList.contains('on')) {

            targetElement.classList.remove('on');

        } else {
            targetElement.classList.add('on');
        }
    }

    /** 
    * 우리의미션 클래스 제어
    * @param e
    * @returns {void}
    */
    handleClickOurMissionToggle = e => {

        e.preventDefault();
        const targetElement = e.target.parentNode;
       
        if (targetElement.classList.contains('on')) {

            targetElement.classList.remove('on');

        } else {
            targetElement.classList.add('on');
        }
    }




    render() {


        const { point, information, division, mission } = this.props;

        const category = 'more';

        let myProfileArea = null;

        if ('' === division) {
            myProfileArea = (
                <Fragment>
                    <MoreProfileInfo
                        myInfo={information}
                        myPoint={point}
                        onClickGoPage={this.handleClickGoPage}
                        onClickLogout={this.handleClickLogout}
                    />
                    <MoreMenu
                        onClickGoPage={this.handleClickGoPage}
                    />
                </Fragment>
            )

        } else if ('mission' === division) {
            myProfileArea = (
                <MoreMissionContainer />
            );
        } else if ('missionDetail' === division && '' !== mission.get('missionDetail')) {
            myProfileArea = (
                <MoreMissionDetail
                    onClickGoPage={this.handleClickGoPage}
                    detail={mission.get('missionDetail')}
                    category={category}
                    selectMission={mission.get('selectMission')}
                />
            );
        } else if ('product' === division) {
            myProfileArea = (
                <MoreProduct
                    onClickGoPage={this.handleClickGoPage}
                />
            );
        } else if ('myDataHistory' === division) {
            myProfileArea = (
                <MoreMyDataHistory
                    onClickClass={this.handleClickClass}
                    onClickGoPage={this.handleClickGoPage}
                />
            );
        } else if ('myDataAgree' === division) {
            myProfileArea = (
                <MoreMyDataAgree
                    onClickGoPage={this.handleClickGoPage}
                />
            );
        } else if ('myDataCancel' === division) {
            myProfileArea = (
                <MoreMyDataCancel
                    onClickGoPage={this.handleClickGoPage}
                />
            );
        } else if ('membershipLevel' === division) {
            myProfileArea = (
                <MoreMembershipLevel
                    myInfo={information}
                    onClickGoPage={this.handleClickGoPage}
                />
            )
        } else if ('shoppingHistory' === division) {
            myProfileArea = (
                <MoreShoppingHistory
                    onClickGoPage={this.handleClickGoPage}
                />
            )
        } else if ('missionBank' === division) {
            myProfileArea = (
                <MoreMissionBankBook
                    myInfo={information}
                    myPoint={point}
                    onClickGoPage={this.handleClickGoPage}
                />
            )
        }else if ('ourMission' === division) {
            myProfileArea = (
                <MoreOurMission 
                    onClickToggle={this.handleClickOurMissionToggle}
                    onClickGoPage={this.handleClickGoPage}
                />
            )
        }
        return (
            <div className='my_more_main'>
                {myProfileArea}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        point: state.more.get('profile').get('point'),
        information: state.more.get('profile').get('information'),
        division: state.more.get('division'),
        mission: state.more.get('menu').get('mission')
    }),
    (dispatch) => ({
        MoreActions: bindActionCreators(moreActions, dispatch)
    })
)(MoreContainer);