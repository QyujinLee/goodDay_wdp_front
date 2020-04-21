import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';

import * as utils from 'lib/utils';

import HealthReportHistory from 'components/HealthReportHistory';

import * as healthReportContentsActions from 'modules/healthReportContents';

class HealthReportHistoryContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
    }
    /**
     * 건강검진 레포트 상세로 이동
     * @param healthReport
     * @returns {void}
     */
    handleHealthReportDetail = (healthReport) => {

        const { HealthReportContentsActions } = this.props;
        
        if (0 === Number(healthReport.bwCnt)) {

            confirmAlert({
                customUI: ({onClose}) => (
                    <Fragment>
                        <div className='popup_wrap'>
                            <div className='title'>알림</div>
                            <div className='pop_conts'>
                            <p className='msg'>해당 {healthReport.mediExamDivNm} 검진 기록은<br />건강보험공단으로부터<br />상세정보를 제공받지 못합니다.</p>
                                <ul className='pop_btns'>
                                    <li>
                                        <button className='btn_middle' onClick={onClose}>
                                            <span>확인</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Fragment>
                )
            });
        }

        if (0 < healthReport.bwCnt) {

            // 헤더 Redux set
            HealthReportContentsActions.setHealthReportHeaderTab({
                headerTab: 'Detail'
            });

            // mediExamGrpId Redux set
            HealthReportContentsActions.setHealthReportDetailContentsData({
                type: 'mediExamGrpId',
                data: healthReport.mediExamGrpId
            });
        }
    }

    render() {

        const { year, history } = this.props;

        return (
            <HealthReportHistory
                year={year}
                history={history}
                onHealthReportDetail={this.handleHealthReportDetail}
            />
        );
    }
}

export default connect(
    (state) => ({
        year: state.healthReportContents.get('year'),
        history: state.healthReportContents.get('history')
    }),
    (dispatch) => ({
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch)
    })
)(HealthReportHistoryContainer);