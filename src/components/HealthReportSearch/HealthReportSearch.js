import React, { Component, Fragment } from 'react';

class HealthReportSearch extends Component {

    render() {

        const { headerTab, trendCount, selectDate, mediExamGrpId, recentCnt } = this.props; // props data
        const { onSearchToggle, onSearchSelect, onHealthReportSearch } = this.props; // props event

        let recentDataArea = null;

        if ('Detail' === headerTab) {

            const dateIndex = selectDate.findIndex(data => data.mediExamGrpId === mediExamGrpId);

            recentDataArea = (
                <Fragment>
                    <span className='sel_data'>{selectDate[dateIndex].mediExamDt}</span>
                    <ol className='sel_lst'>
                        {
                            0 < selectDate.length ? (
                                selectDate.map((item, index) => (
                                    <li key={index} onClick={() => onSearchSelect('mediExamGrpId', item.mediExamGrpId)}><a href='#!'>{item.mediExamDt}</a></li>
                                ))
                            ) : null
                        }
                    </ol>
                </Fragment>
            );
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
                <ul className='tab_txt'>
                    <li className='on'>
                        <a href='#!' className='all' onClick={onHealthReportSearch}>
                            전체
                        </a>
                    </li>
                    <li className='on'>
                        <a href='#!' className='measurement' onClick={onHealthReportSearch}>
                            계측
                        </a>
                    </li>
                    <li className='on'>
                        <a href='#!' className='blood' onClick={onHealthReportSearch}>
                            혈액
                        </a>
                    </li>
                    <li className='on'>
                        <a href='#!' className='chronicDiseases' onClick={onHealthReportSearch} >
                            기타
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default HealthReportSearch;