import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';


import HealthReportTrend from 'components/HealthReportTrend';

import * as healthReportContentsActions from 'modules/healthReportContents';

class HealthReportTrendContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
        this.healthReportTrendProcess(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.recentCnt !== nextProps.recentCnt) {

            this.healthReportTrendProcess(nextProps);
            return true;
        }

        return true;
    }

    healthReportTrendProcess(props) {

        // 건강검진 생체나이 추이 API 조회
        this.getHealthReportLivingAgeProcess(props);
        // 건강검진 레포트 추이 API 조회
        this.getHealthReportTrendProcess(props);
    }

    /**
     * 건강검진 생체나이 추이 조회 프로세스
     * @param props
     * @returns {void}
     */
    getHealthReportLivingAgeProcess(props) {

        const { HealthReportContentsActions } = this.props;

        const params = {
            recentCnt: props.recentCnt,
            gndrDivCd: utils.getUserInfo().gndrDivCd
        };

        const gethealthReportLivingAge = this.getHealthReportLivingAgeTrendAPI(params);

        gethealthReportLivingAge.then((response) => {

            const responseData = response[0].data.data.data[0].data;

            // 데이터 Redux set
            HealthReportContentsActions.setHealthReportTrendContentsData({
                type: 'livingAge',
                data: responseData
            });
        });
    }

    /**
     * 건강검진 레포트 추이 조회 프로세스
     * @param props
     * @returns {void}
     */
    getHealthReportTrendProcess(props) {

        const { HealthReportContentsActions } = this.props;

        const params = {
            recentCnt: props.recentCnt,
            gndrDivCd: utils.getUserInfo().gndrDivCd
        };

        const gethealthReportTrend = this.getHealthReportTrendAPI(params);

        gethealthReportTrend.then((response) => {

            const responseData = response[0].data.data.data;
            // 데이터 Redux set
            HealthReportContentsActions.setHealthReportTrendContentsData({
                type: 'examination',
                data: responseData
            });
        });
    }

    /**
    * 건강검진 생체나이 추이 API call
    * @param params
    * @returns {response}
    */
    getHealthReportLivingAgeTrendAPI = async (params) => {

        return await Promise.all([
            api.getHealthReportLivingAgeTrendAPI(params)
        ]);
    }

    /**
    * 건강검진 레포트 API call
    * @param params
    * @returns {response}
    */
    getHealthReportTrendAPI = async (params) => {

        return await Promise.all([
            api.getHealthReportTrendAPI(params)
        ]);
    }

    render() {
        
        const { trend } = this.props;
        const { onHealthReportContentsToggle } = this.props;

        return (
            <HealthReportTrend
                livingAge={trend.get('livingAge')}
                examination={trend.get('examination')}
                onHealthReportContentsToggle={onHealthReportContentsToggle}
            />
        );
    }
}

export default connect(
    (state) => ({
        recentCnt: state.healthReportContents.get('trend').get('recentCnt'),
        trend: state.healthReportContents.get('trend')
    }),
    (dispatch) => ({
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch)
    })
)(HealthReportTrendContainer);