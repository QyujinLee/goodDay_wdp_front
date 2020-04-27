import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HealthReportLivingAgeDetail from 'components/HealthReportLivingAgeDetail';

import * as healthReportContentsActions from 'modules/healthReportContents';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

class HealthReportLivingAgeDetailContainer extends Component {

    componentDidMount() {

        utils.extApp('04');

        // 항목별 생체나이 상세 조회
        this.getHealthReportDetailLivingAgeItemProcess();
    }

    /**
     * 건강검진 항목별 생체 나이 조회 프로세스
     * @param props
     * @returns {void}
     */
    getHealthReportDetailLivingAgeItemProcess() {

        const { HealthReportContentsActions } = this.props;
        const { mediExamGrpId, lbdyAgeDivCd } = this.props;

        const param = {
            mediExamGrpId: mediExamGrpId,
            lbdyAgeDivCd: lbdyAgeDivCd
        };

        // 항목별 생체나이 API 호출
        const getHealthReportDetailLivingAgeItem = this.getHealthReportDetailLivingAgeItemAPI(param);

        // 항목별 생체나이 데이터 변수 값 할당
        getHealthReportDetailLivingAgeItem.then((response) => {

            if (undefined !== response[0]) {

                const responseData = response[0].data.data;

                // 항목별 생체 나이 Redux set
                HealthReportContentsActions.setHealthReportDetailContentsData({
                    type: 'livingAgeDetail',
                    data: responseData
                });
            }
        });
    }

    /**
    * 건강검진 레포트 상세 중 항목별 생체나이 API call
    * @param param
    * @returns {response}
    */
    getHealthReportDetailLivingAgeItemAPI = async (param) => {
        return await Promise.all(
            [api.getHealthReportDetailLivingAgeItemAPI(param)]
        );
    }

    handleClosed = (e) => {

        const { HealthReportContentsActions } = this.props;

        // 헤더 Redux set
        HealthReportContentsActions.setHealthReportHeaderTab({
            headerTab: 'Detail'
        });
    }

    render() {

        const { lbdyAgeDivCd, livingAge, livingAgeDetail, mediExamGrpId, selectDate } = this.props;

        const livingAgeFilter = livingAge.filter(filterItem => {
            return filterItem.lbdyAgeDivCd === lbdyAgeDivCd;
        });
        const selectDateFilter = selectDate.filter(filterItem => {
            return filterItem.mediExamGrpId === mediExamGrpId;
        });

        return (
            <HealthReportLivingAgeDetail
                livingAge={livingAgeFilter[0]}
                livingAgeDetail={livingAgeDetail}
                selectDate={selectDateFilter[0]}
                onClosed={this.handleClosed}
            />
        );
    }
}

export default connect(
    (state) => ({
        mediExamGrpId: state.healthReportContents.get('detail').get('mediExamGrpId'),
        lbdyAgeDivCd: state.healthReportContents.get('detail').get('lbdyAgeDivCd'),
        livingAge: state.healthReportContents.get('detail').get('livingAge'),
        livingAgeDetail: state.healthReportContents.get('detail').get('livingAgeDetail'),
        selectDate: state.healthReportContents.get('detail').get('selectDate')
    }),
    (dispatch) => ({
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch)
    })
)(HealthReportLivingAgeDetailContainer);