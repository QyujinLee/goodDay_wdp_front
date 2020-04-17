import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class BodyAgeSearch extends Component {

    render() {
        const { headerTab, trendCount, selectDate, detail, recentCnt } = this.props; // props data
        const { onSearchToggle, onSearchSelect } = this.props;

        let recentDataArea = null;

        if ('Detail' === headerTab) {
            if (1 <= selectDate.length && undefined !== detail) {

                recentDataArea = (
                    <Fragment>
                        <span className='sel_data'>{utils.momentDateFormat(detail.mediExamDt)}</span>
                        <ol className='sel_lst'>
                            {
                                0 < selectDate.length ? (
                                    selectDate.map((item, index) => (
                                        <li key={index} onClick={() => onSearchSelect('msmtDt', item.msmtDt)} ><a href='#!'>{utils.momentDateFormat(item.msmtDt)}</a></li>
                                    ))
                                ) : null
                            }
                        </ol>
                    </Fragment>
                );
            }
        } else if ('Trend' === headerTab) {

            recentDataArea = (
                <Fragment>
                    <span className='sel_data'>{trendCount === recentCnt ? '전체' : '최근'} {trendCount < recentCnt ? trendCount : recentCnt}건</span>
                    <ol className='sel_lst'>
                        {
                            3 <= trendCount ? <li onClick={() => onSearchSelect('recentCnt', 3)}><a href='#!'>최근 3건</a></li> : null
                        }
                        <li><a href='#!' onClick={() => onSearchSelect('recentCnt', trendCount)}>전체 {trendCount}건</a></li>
                    </ol>
                </Fragment>
            );
        }
        return (
            <div className='data_set'>
                <div className='recent_data'>
                    {recentDataArea}
                    {
                        1 === trendCount ? null : (
                            <a href='#!' className='info_lst' onClick={onSearchToggle}>
                                <span className='blind'>툴팁화살표</span>
                            </a>
                        )
                    }
                </div>
            </div>
        );
    }
}
export default BodyAgeSearch;