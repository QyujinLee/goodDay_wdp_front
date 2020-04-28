import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';

import BodyAgeDetailView from 'components/BodyAgeDetailView';

import * as bodyAgeActions from 'modules/bodyAge';

class BodyAgeDetailViewContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
    }

    /**
     * 비만체형나이 추이 화면이동
     * @param e
     * @returns {void}
     */
    handleBodyAgeMoveTrend = (e) => {

        const { BodyAgeActions } = this.props;

        BodyAgeActions.setBodyAgeHeaderTab({
            headerTab: 'Trend'
        });

    }
    render() {
        const { layout, normalScope, detail, selectDate } = this.props;
        const { onBodyAgeToggle } = this.props;

        const dateLength = selectDate.length;
        const diffYear = utils.yearDiff(selectDate[dateLength - 1].msmtDt, selectDate[0].msmtDt, 'year') + 1;

        return (
            <ul className='detail_set'>
                <li className='tit'>
                    <h2>{layout[0].title}</h2>
                </li>
                {
                    layout[0].contents.map((item, index) => {

                        let normalScopeFilter = [];
                        let examinationFilter = [];
                        const length = item.mediExamItmDivCd.length;

                        if (1 === length) {

                            // layout contents 항목이 1개일때
                            normalScopeFilter = normalScope.filter(filterItem => {
                                return filterItem.mediExamItmDivCd === item.mediExamItmDivCd[0];
                            });
                            examinationFilter = detail.get('examination').filter(filterItem => {
                                return filterItem.mediExamItmDivCd === item.mediExamItmDivCd[0];
                            });



                        } else if (2 === length) {

                            // layout contents 항목이 2개일때
                            examinationFilter = detail.get('examination').filter(innerItem => {
                                return innerItem.mediExamItmDivCd === item.mediExamItmDivCd[0] || innerItem.mediExamItmDivCd === item.mediExamItmDivCd[1];
                            });

                        }
                        return (

                            <BodyAgeDetailView
                                key={index}
                                contents={item}
                                normalScope={normalScopeFilter}
                                examination={examinationFilter}
                                diffYear={diffYear}
                                onBodyAgeToggle={onBodyAgeToggle}
                                onBodyAgeMoveTrend={this.handleBodyAgeMoveTrend}
                            />
                        );
                    })
                }
            </ul>
        );

    }
}
export default connect(
    (state) => ({
        normalScope: state.reportCommon.get('normalScope'),
        detail: state.bodyAge.get('detail'),
        selectDate: state.bodyAge.get('detail').get('selectDate')
    }),
    (dispatch) => ({
        BodyAgeActions: bindActionCreators(bodyAgeActions, dispatch)
    })
)(BodyAgeDetailViewContainer);