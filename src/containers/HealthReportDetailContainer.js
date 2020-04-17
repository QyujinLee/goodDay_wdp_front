import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import HealthReportDetail from 'components/HealthReportDetail';

import * as healthReportContentsActions from 'modules/healthReportContents';

class HealthReportDetailContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
        this.healthReportDetailProcess(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.mediExamGrpId !== nextProps.mediExamGrpId) {

            this.healthReportDetailProcess(nextProps);
            return true;
        }

        return true;
    }

    healthReportDetailProcess(props) {

        // 건강검진 상세 생체 나이 API 조회
        this.getHealthReportDetailLivingAgeProcess(props);
        // 건강검진 상세 API 조회
        this.getHealthReportDetailProcess(props);
    }

    /**
     * 건강검진 생체 나이 조회 프로세스
     * @param props
     * @returns {void}
     */
    getHealthReportDetailLivingAgeProcess(props) {

        const { HealthReportContentsActions } = this.props;

        const params = {
            mediExamGrpId: props.mediExamGrpId
        };

        // 생체나이 API 호출
        const getHealthReportDetailLivingAge = this.getHealthReportDetailLivingAgeAPI(params);

        // 생체나이 데이터 변수 값 할당
        getHealthReportDetailLivingAge.then((response) => {

            if (undefined !== response[0]) {

                const responseData = response[0].data.data;

                // 생체 나이 Redux set
                HealthReportContentsActions.setHealthReportDetailContentsData({
                    type: 'livingAge',
                    data: responseData
                });
            }
        });
    }

    /**
    * 건강검진 상세 조회 프로세스
    * @param props
    * @returns {void}
    */
    getHealthReportDetailProcess(props) {

        const { HealthReportContentsActions } = this.props;

        const params = {
            gndrDivCd: utils.getUserInfo().gndrDivCd,
            mediExamGrpId: props.mediExamGrpId
        };

        // 상세조회 API 호출
        const getHealthReportDetail = this.getHealthReportDetailAPI(params);

        // getHealthReportDetail 데이터 변수 값 할당
        getHealthReportDetail.then((response) => {

            if (undefined !== response[0]) {
               
                const responseData = response[0].data.data;

                // 상세조회 Redux set
                HealthReportContentsActions.setHealthReportDetailContentsData({
                    type: 'examination',
                    data: responseData
                });
            }
        });

    }

    /**
    * 건강검진 레포트 상세 중 생체나이 API call
    * @param params
    * @returns {response}
    */
    getHealthReportDetailLivingAgeAPI = async (params) => {
        return await Promise.all(
            [api.getHealthReportDetailLivingAgeAPI(params)]
        );
    }

    /**
    * 건강검진 레포트 상세 API call
    * @param params
    * @returns {response}
    */
    getHealthReportDetailAPI = async (params) => {
        return await Promise.all(
            [api.getHealthReportDetailAPI(params)]
        );
    }

    /**
    * 신체나이 세부
    * @param lbdyAgeDivCd
    * @returns {void}
    */
    handleHealthReportAgeGraphView = (lbdyAgeDivCd) => {

        if ('' !== lbdyAgeDivCd) {

            const { HealthReportContentsActions } = this.props;

            // 생체나이구분코드 Redux set
            HealthReportContentsActions.setHealthReportDetailContentsData({
                type: 'lbdyAgeDivCd',
                data: lbdyAgeDivCd
            });

            // 헤더 Redux set
            HealthReportContentsActions.setHealthReportHeaderTab({
                headerTab: 'LivingAgeDetail'
            });
        }
    }

    /**
    * 신체나이 줄이기
    * @param e
    * @returns {void}
    */
    handleHealthReportReduceBodyAge = (e) => {
        // 쇼핑 페이지 이동
        utils.extApp('09');
    }

    render() {

        const { detail } = this.props;
        const { onHealthReportContentsToggle } = this.props;

        return (
            <HealthReportDetail
                livingAge={detail.get('livingAge')}
                onHealthReportContentsToggle={onHealthReportContentsToggle}
                onHealthReportAgeGraphView={this.handleHealthReportAgeGraphView}
                onHealthReportReduceBodyAge={this.handleHealthReportReduceBodyAge}
            />
        );
    }
}

export default connect(
    (state) => ({
        mediExamGrpId: state.healthReportContents.get('detail').get('mediExamGrpId'),
        detail: state.healthReportContents.get('detail')
    }),
    (dispatch) => ({
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch)
    })
)(HealthReportDetailContainer);