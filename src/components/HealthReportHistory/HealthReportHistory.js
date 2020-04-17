import React, { Component } from 'react';

class HealthReportHistory extends Component {

    render() {

        const { year, history } = this.props; // props data
        const { onHealthReportDetail } = this.props; // props event

        return (
            <div className='report_lst'>
                {
                    undefined !== year ? year.map((item, index) => {
                        return (
                            <dl key={index}>
                                <dt>{item.mediExamYr}</dt>
                                {
                                    undefined !== history ? history.map((innerItem, index) => {
                                        
                                        return (
                                            item.mediExamYr === innerItem.mediExamYr ? (
                                                <dd key={index}>
                                                    <div className='card_bx' onClick={() => onHealthReportDetail(innerItem)}>
                                                        <span className='label'>{'' !== innerItem.jugNm ? innerItem.jugNm : '-'}</span>
                                                        <span className='date'>{innerItem.mediExamDt}</span>
                                                        <ul className='chk_info'>
                                                            <li>{innerItem.mediExamDivNm}</li>
                                                            <li>{innerItem.mediExamInstnNm} </li>
                                                        </ul>
                                                        <p className='cmmt'>
                                                            {innerItem.opinDesc}
                                                        </p>
                                                        {0 < innerItem.bwCnt ? <div className='link_wrap'><a href='#!' className='txt_link'>상세정보</a></div> : null}
                                                    </div>
                                                </dd>
                                            ) : null
                                        )
                                    }) : null
                                }
                            </dl>
                        )
                    }) : null
                }
            </div>
        );
    }
}

export default HealthReportHistory;