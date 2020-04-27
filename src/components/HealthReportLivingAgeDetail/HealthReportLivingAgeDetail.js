import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class HealthReportLivingAgeDetail extends Component {

    pointStyle(lbdyAge) {

        const minMax = 15;
        const standard = 50;
        const per = lbdyAge * 100 / minMax;
        const left = (per / 2) + standard;

        return { left: left + '%' };
    }

    render() {

        const { livingAge, livingAgeDetail, selectDate } = this.props; // props data
        const { onClosed } = this.props; // props event

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        <h1>{livingAge.comCdAdtnNm} 세부</h1>
                        <div className='right_btn'>
                            <a href='#!' className='close_btn' onClick={onClosed}> </a>
                        </div>
                    </div>
                </header>
                <div className='contents'>
                    <div className='detail_compare_wrap'>
                        <p className='detail_noti'>검진일 {selectDate.mediExamDt}을 기준으로 한 결과 입니다.</p>
                        <div className='detail_age_bx'>
                            <dl>
                                <dt>실제나이</dt>
                                <dd><span className='num'>{livingAge.msmtAge}</span> 세</dd>
                            </dl>
                            <dl>
                                <dt>{livingAge.comCdAdtnNm}</dt>
                                <dd><span className='num'>{livingAge.bioAge}</span> 세</dd>
                            </dl>
                            <span className={
                                Number(livingAge.lbdyAge) === 0 ? 'gap_num same'
                                    : Number(livingAge.lbdyAge) > 0 ? 'gap_num older'
                                        : 'gap_num younger'
                            }>{livingAge.lbdyAge > 0 ? '+' + livingAge.lbdyAge : livingAge.lbdyAge}</span>
                        </div>
                    </div>
                    <div className='border_title'>주요요인</div>
                    <ul className='gap_chart_lst'>
                        {
                            undefined !== livingAgeDetail ? livingAgeDetail.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <span className='tit_chart'>{item.comCdAdtnNm}</span>
                                        <ul className='gap_chart'>
                                            <li className='younger'></li>
                                            <li className='older'></li>
                                            <li className={
                                                Number(item.lbdyAge) === 0 ? 'point same'
                                                    : Number(item.lbdyAge) > 0 ? 'point older'
                                                        : 'point younger'
                                            } style={this.pointStyle(item.lbdyAge)}><span>{item.lbdyAge > 0 ? '+' + utils.numberFixed(item.lbdyAge, true) : utils.numberFixed(item.lbdyAge, true)}</span></li>
                                        </ul>
                                        <ol className='gap_label'>
                                            <li>younger</li>
                                            <li>0</li>
                                            <li>older</li>
                                        </ol>
                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default HealthReportLivingAgeDetail;