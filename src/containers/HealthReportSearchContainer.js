import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';

import HealthReportSearch from 'components/HealthReportSearch';

import * as healthReportContentsActions from 'modules/healthReportContents';

class HealthReportSearchContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
    }

    /**
     * 건강검진 레포트, 건수 토글 제어
     * @param e
     * @returns {void}
     */
    handleSearchToggle = (e) => {

        e.preventDefault();

        const targetElement = e.target.parentNode;

        if (targetElement.classList.contains('open')) {

            targetElement.classList.remove('open');
            targetElement.classList.add('close');

        } else {

            targetElement.classList.remove('close');
            targetElement.classList.add('open');
        }
    }

    /**
     * 건강검진 레포트, 건수 선택 제어
     * @param e
     * @returns {void}
     */
    handleSearchSelect = (type, value) => {

        const { HealthReportContentsActions } = this.props;
        const targetElement = document.querySelector('.recent_data');

        if ('mediExamGrpId' === type) {

            // mediExamGrpId Redux set
            HealthReportContentsActions.setHealthReportDetailContentsData({
                type: 'mediExamGrpId',
                data: value
            });
        } else if ('recentCnt' === type) {

            // recentCnt Redux set
            HealthReportContentsActions.setHealthReportTrendContentsData({
                type: 'recentCnt',
                data: value
            });
        }

        targetElement.classList.remove('open');
        targetElement.classList.add('close');
    }

    /**
     * 건강검진 레포트 바로가기 클릭 시 스크롤 이동 제어
     * @param e
     * @returns {void}
     */
    handleHealthReportSearch = (e) => {
        const classNm = e.target.className;
        
        if("all" !== classNm){
          this.moveScroll(classNm);
        } else {
            window.scrollTo(0, 0);
        }
    };
    moveScroll(classNm){
        window.scrollTo(0, 0);
        const header = document.querySelector('.header').getBoundingClientRect().height;
        const data_set = document.querySelector('.data_set').getBoundingClientRect().height;

        const relativeTop = document.querySelectorAll('.'+classNm)[1].getBoundingClientRect().top;
        const toScroll = relativeTop - (header + data_set);
        window.scrollTo(0, toScroll);
    }
    
    render() {

        const { headerTab, trendCount, selectDate, mediExamGrpId, recentCnt } = this.props;

        return (
            <HealthReportSearch
                trendCount={trendCount}
                headerTab={headerTab}
                selectDate={selectDate}
                mediExamGrpId={mediExamGrpId}
                recentCnt={recentCnt}
                onSearchToggle={this.handleSearchToggle}
                onSearchSelect={this.handleSearchSelect}
                onHealthReportSearch={this.handleHealthReportSearch}
            />
        );
    }
}

export default connect(
    (state) => ({
        headerTab: state.healthReportContents.get('headerTab'),
        trendCount: state.healthReportContents.get('trendCount'),
        selectDate: state.healthReportContents.get('detail').get('selectDate'),
        mediExamGrpId: state.healthReportContents.get('detail').get('mediExamGrpId'),
        recentCnt: state.healthReportContents.get('trend').get('recentCnt')
    }),
    (dispatch) => ({
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch)
    })
)(HealthReportSearchContainer);