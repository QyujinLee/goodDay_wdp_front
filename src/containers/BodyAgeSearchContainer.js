import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BodyAgeSearch from 'components/BodyAgeSearch';
import * as bodyAgeActions from 'modules/bodyAge';

import * as utils from 'lib/utils';

class BodyAgeSearchContainer extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

    /**
     * 비만 상세, 건수 토글 제어
     * @param e
     * @returns {void}
     */
    handleSearchToggle = e => {

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
     * 비만 상세, 건수 선택 제어
     * @param e
     * @returns {void}
     */
    handleSearchSelect = (type, value) => {

        const { BodyAgeActions } = this.props;
        const targetElement = document.querySelector('.recent_data');

        if ('msmtDt' === type) {
            //msmDt 데이터 Redux set
            BodyAgeActions.setBodyAgeDetailContentsData({
                type: 'msmtDt',
                data: value
            });
        } else if ('recentCnt' === type) {
            BodyAgeActions.setBodyAgeTrendContentsData({
                type: 'recentCnt',
                data: value
            });
        }


        targetElement.classList.remove('open');
        targetElement.classList.add('close');
    }

    render() {

        const { trend, detail, bodyAge } = this.props;

        return (
            <BodyAgeSearch
                trendCount={bodyAge.get('trendCount')}
                headerTab={bodyAge.get('headerTab')}
                selectDate={detail.get('selectDate')}
                recentCnt={trend.get('recentCnt')}
                detail={detail.get('livingAge')[0]}
                onSearchToggle={this.handleSearchToggle}
                onSearchSelect={this.handleSearchSelect}
            />
        );
    }
}

export default connect(
    (state) => ({
        detail: state.bodyAge.get('detail'),
        bodyAge: state.bodyAge,
        trend: state.bodyAge.get('trend'),
    }),
    (dispatch) => ({
        BodyAgeActions: bindActionCreators(bodyAgeActions, dispatch)
    })
)(BodyAgeSearchContainer);