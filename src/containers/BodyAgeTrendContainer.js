import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import BodyAgeTrend from 'components/BodyAgeTrend';

import * as bodyAgeActions from 'modules/bodyAge';

class BodyAgeTrendContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
        this.bodyAgeTrendProcess(this.props);
    }


    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.recentCnt !== nextProps.recentCnt) {
            this.bodyAgeTrendProcess(nextProps);
        }
        return true;
    }


    bodyAgeTrendProcess(props) {
        //비만체형나이 추이 그래프 중 최근 1건 조회 프로세스
        this.getStatisticGraphObesityLatelyProcess(props);
    }

    /**
    * 비만체형나이 추이 그래프 중 최근 1건 조회 프로세스
    * @param props
    * @returns {void}
    */
    getStatisticGraphObesityLatelyProcess(props) {

        const { BodyAgeActions } = this.props;

        const param = {
            gndrDivCd: utils.getUserInfo().gndrDivCd,
            recentCnt: props.recentCnt
        }

        const getStatisticGraphObesityLately = this.getStatisticGraphObesityLatelyAPI(param);

        getStatisticGraphObesityLately.then((response) => {


            if (undefined !== response[0]) {

                const livingAgeData = response[0].data.data.data[0].data;
                const examinationData = response[0].data.data.data[1];

                // 생체나이 데이터 Redux set
                BodyAgeActions.setBodyAgeTrendContentsData({
                    type: 'livingAge',
                    data: livingAgeData
                });
                
                // 비만검사 데이터 Redux set
                BodyAgeActions.setBodyAgeTrendContentsData({
                    type: 'examination',
                    data: examinationData
                });
            }
        });
    }

    /**
 * 비만체형나이 추이 그래프 중 최근 1건 조회 API call
 * @returns {response}
 */
    getStatisticGraphObesityLatelyAPI = async (param) => {

        return await Promise.all([
            api.getStatisticGraphObesityLatelyAPI(param)
        ]);
    }



    render() {

        const { trend, onBodyAgeToggle } = this.props;
        return (
            <BodyAgeTrend
                livingAge={trend.get('livingAge')}
                examination={trend.get('examination')}
                onBodyAgeToggle={onBodyAgeToggle}
            />
        );
    }
}
export default connect(
    (state) => ({
        trend: state.bodyAge.get('trend'),
        recentCnt: state.bodyAge.get('trend').get('recentCnt')
    }),
    (dispatch) => ({
        BodyAgeActions: bindActionCreators(bodyAgeActions, dispatch)
    })
)(BodyAgeTrendContainer);