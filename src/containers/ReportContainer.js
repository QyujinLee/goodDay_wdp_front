import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import BodyAgeHeader from 'components/BodyAgeHeader';
import BodyAgeGuide from 'components/BodyAgeGuide';
import BodyAgeContents from 'components/BodyAgeContents';
import HealthReportGuide from 'components/HealthReportGuide';
import HealthReportHeader from 'components/HealthReportHeader';
import HealthReportContents from 'components/HealthReportContents';

import HealthReportLivingAgeDetailContainer from 'containers/HealthReportLivingAgeDetailContainer';

import * as bodyAgeActions from 'modules/bodyAge';
import * as reportCommonActions from 'modules/reportCommon';
import * as healthReportContentsActions from 'modules/healthReportContents';

class ReportContainer extends Component {

    constructor() {
        super();
        window.reportContainer = this;
    }

    componentDidMount() {

        const query = queryString.parse(window.location.search);

        utils.extApp('04');

        if ('true' === query.inputBodyAge) {
            this.getPhrBodyMsmtdtProcess();
        } else {
            this.getHealthReportHistoryYearProcess();
            this.getHealthReportHistoryProcess();
            this.getPhrBodyMsmtdtProcess();
        }

        this.getHealthReportDetailNormalScopeProcess();
    }

    /**
     * 검진연동 후 앱에서 호출
     * @returns {void}
     */
    extSetReportPointPayment() {
        // 포인트 지급 처리
        utils.pointPayment('1', ServiceConstants.RWD_MGMT_ID_HEALTH_REPORT);
    }

    /**
     * 건강검진 레포트 이력 연도 조회 프로세스
     * @returns {void}
     */
    getHealthReportHistoryYearProcess() {

        const { HealthReportContentsActions } = this.props;
        const getHealthReportHistoryYear = this.getHealthReportHistoryYearAPI();

        getHealthReportHistoryYear.then((response) => {

            if (undefined !== response[0]) {

                const responseData = response[0].data.data;

                // 연도 Redux set
                HealthReportContentsActions.setHealthReportHistoryYearData({
                    year: responseData
                });
            }
        });
    }

    /**
     * 건강검진 레포트 이력 조회 프로세스
     * @returns {void}
     */
    getHealthReportHistoryProcess() {

        const { HealthReportContentsActions } = this.props;
        const gethealthReportHistory = this.getHealthReportHistoryAPI();

        gethealthReportHistory.then((response) => {

            if (undefined !== response[0]) {

                const selectList = [];
                const responseData = response[0].data.data;

                responseData.forEach(element => {

                    // SelectBox
                    if (0 < Number(element.bwCnt)) {
                        selectList.push({
                            mediExamYr: element.mediExamYr,
                            mediExamDt: element.mediExamDt,
                            mediExamGrpId: element.mediExamGrpId
                        })
                    }
                });

                // 이력 카운트 Redux set
                HealthReportContentsActions.setHealthReportHistoryCount({
                    historyCount: responseData.length
                });

                // 추이 카운트 Redux set
                HealthReportContentsActions.setHealthReportTrendCount({
                    trendCount: selectList.length
                });

                // selectBox Redux set
                HealthReportContentsActions.setHealthReportDetailContentsData({
                    type: 'selectDate',
                    data: selectList
                });

                // 이력 데이터 Redux set
                HealthReportContentsActions.setHealthReportHistoryContentsData({
                    history: responseData
                });
            }
        });
    }

    /**
    * 건강검진 검진항목별 정상 범위 조회 프로세스
    * @returns {void}
    */
    getHealthReportDetailNormalScopeProcess() {

        const { ReportCommonActions } = this.props;
        const params = {
            gndrDivCd: utils.getUserInfo().gndrDivCd
        };
        const getHealthReportNormalScope = this.getHealthReportNormalScopeAPI(params);

        getHealthReportNormalScope.then((response) => {

            if (undefined !== response[0]) {

                const responseData = response[0].data.data;

                // 정상 범위 Redux set
                ReportCommonActions.setReportCommonNormalScope({
                    normalScope: responseData
                });
            }
        });
    }

    /**
     * 비만체형나이 측정일자 목록 조회 프로세스
     * @returns {void}
     */
    getPhrBodyMsmtdtProcess() {

        const { BodyAgeActions } = this.props;
        const getPhrBodyMsmtdt = this.getPhrBodyMsmtdtAPI();

        getPhrBodyMsmtdt.then((response) => {

            if (undefined !== response[0]) {

                const responseData = response[0].data.data;

                // selectBox Redux set
                BodyAgeActions.setBodyAgeDetailContentsData({
                    type: 'selectDate',
                    data: responseData
                });

                // trendCount Redux set
                BodyAgeActions.setBodyAgeTrendCount({
                    trendCount: responseData.length
                });
            }
        });

    }

    /**
     * 건강검진 레포트 이력 연도 조회 API call
     * @returns {response}
     */
    getHealthReportHistoryYearAPI = async () => {
        return await Promise.all([
            api.getHealthReportHistoryYearAPI()
        ]);
    }

    /**
     * 건강검진 레포트 이력 조회 API call
     * @returns {response}
     */
    getHealthReportHistoryAPI = async () => {
        return await Promise.all([
            api.getHealthReportHistoryAPI()
        ]);
    }

    /**
    * 건강검진 검진항목별 정상 범위 API call
    * @param params
    * @returns {response}
    */
    getHealthReportNormalScopeAPI = async (params) => {
        return await Promise.all([
            api.getHealthReportNormalScopeAPI(params)
        ]);
    }

    /**
     * 비만체형나이 측정일자 목록을 조회 API call
     * @returns {response}
     */
    getPhrBodyMsmtdtAPI = async () => {
        return await Promise.all([
            api.getPhrBodyMsmtdtAPI()
        ]);
    }

    /**
     * 미션 조회 API call
     * @param params
     * @returns {response}
     */
    getMissionMediAPI = async (params) => {
        return await Promise.all([
            api.getMissionMediAPI(params)
        ]);
    }

    /**
     * 미션 수행 처리 API call
     * @param params
     * @returns {response}
     */
    postMissionDoAPI = async (params) => {
        return await Promise.all([
            api.postMissionDoAPI(params)
        ]);
    }

    /**
     * 검강검진 레포트 불러오기 (앱)
     * @returns {void}
     */
    handleHealthReportLoad = (e) => {

        utils.extApp('03');
    };

    /**
     * 건강검진 레포트 헤더 제어
     * @param e
     * @returns {void}
     */
    handleHealthReportHeaderTab = (e) => {

        const { HealthReportContentsActions } = this.props;
        const target = e.target.getAttribute('type');

        if ('History' === target) {

            // mediExamGrpId 초기화 Redux set
            HealthReportContentsActions.setHealthReportDetailContentsData({
                type: 'mediExamGrpId',
                data: ''
            });
        }

        // 헤더 Redux set
        HealthReportContentsActions.setHealthReportHeaderTab({
            headerTab: e.target.getAttribute('type')
        });
    };

    /**
     * 비만체형나이 헤더 제어
     * @param e
     * @returns {void}
     */
    handleBodyAgeHeaderTab = (e) => {

        const { BodyAgeActions } = this.props;

        BodyAgeActions.setBodyAgeHeaderTab({
            headerTab: e.target.getAttribute('type')
        })

    };

    /**
   * 건강검진 레포트 내용 토글 제어
   * @param e
   * @returns {void}
   */
    handleHealthReportContentsToggle = (e) => {

        let  targetElement = e.target.parentElement;

        if (targetElement.classList.contains('title_set')) {
            targetElement = targetElement.parentElement;
        } else if (!targetElement.classList.contains('toggle_conts')) {
            return false;
        }

        if (targetElement.classList.contains('open')) {
            targetElement.classList.remove('open');
            targetElement.classList.add('close');

        } else {
            targetElement.classList.remove('close');
            targetElement.classList.add('open');
        }
    };

    render() {

        const { historyCount, headerTab, bodyAge } = this.props;

        let reportArea = null;

        if (0 === historyCount && 0 === bodyAge.get('trendCount')) {

            const age = utils.getAge(utils.getUserInfo().brthDt);
            reportArea = age > 35 ? <HealthReportGuide onHealthReportLoad={this.handleHealthReportLoad} /> : <BodyAgeGuide onHealthReportLoad={this.handleHealthReportLoad} />;

        } else if (0 < historyCount) {

            reportArea = (

                <div className={'History' === headerTab ? 'report_wrap' : ''}>
                    <HealthReportHeader
                        historyCount={historyCount}
                        headerTab={headerTab}
                        onHealthReportHeaderTab={this.handleHealthReportHeaderTab}
                    />
                    <HealthReportContents
                        headerTab={headerTab}
                        onHealthReportContentsToggle={this.handleHealthReportContentsToggle}
                    />
                </div>
            );

        } else if (0 < bodyAge.get('trendCount')) {

            reportArea = (
                <Fragment>
                    <BodyAgeHeader
                        headerTab={bodyAge.get('headerTab')}
                        onhandleBodyAgeHeaderTab={this.handleBodyAgeHeaderTab}
                    />
                    <BodyAgeContents
                        headerTab={bodyAge.get('headerTab')}
                        onBodyAgeToggle={this.handleHealthReportContentsToggle}
                    />
                </Fragment>
            );

        }

        if ('LivingAgeDetail' === headerTab) {
            reportArea = <HealthReportLivingAgeDetailContainer />;
        }

        return (
            <Fragment>
                {reportArea}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        historyCount: state.healthReportContents.get('historyCount'),
        headerTab: state.healthReportContents.get('headerTab'),
        bodyAge: state.bodyAge
    }),
    (dispatch) => ({
        ReportCommonActions: bindActionCreators(reportCommonActions, dispatch),
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch),
        BodyAgeActions: bindActionCreators(bodyAgeActions, dispatch)
    })
)(ReportContainer);