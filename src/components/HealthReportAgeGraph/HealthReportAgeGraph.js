import React, { Component } from 'react';

import * as ServiceConstants from 'constants/serviceConstants';

class HealthReportAgeGraph extends Component {

    render() {

        const { livingAge } = this.props; // props data
        const { onHealthReportAgeGraphView, onHealthReportReduceBodyAge } = this.props; // props event

        return (
            <div className='health_age_graph'>
                <span className='m_tit'>검진 결과로 분석한 건강나이</span>
                <div className='card_lst_wrap'>
                    <ul className='card_lst'>
                        {
                            undefined !== livingAge ? livingAge.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => onHealthReportAgeGraphView(item.lbdyAgeDivCd)}>
                                        <div className={
                                            Number(item.lbdyAge) === 0 ? 'age_card same'
                                                : Number(item.lbdyAge) > 0 ? 'age_card over'
                                                    : 'age_card less'
                                        }>
                                            <span className='tit'>
                                                {
                                                    '' === item.comCdAdtnNm ? '생체나이'
                                                        : item.comCdAdtnNm
                                                }
                                            </span>
                                            <div className={
                                                '' === item.lbdyAgeDivCd ? 'age_img_bx body'
                                                    : ServiceConstants.LBDY_AGE_DIV_OBESE_BODY_AGE === item.lbdyAgeDivCd ? 'age_img_bx fat'
                                                        : ServiceConstants.LBDY_AGE_DIV_OBESE_HEART_AGE === item.lbdyAgeDivCd ? 'age_img_bx heart'
                                                            : ServiceConstants.LBDY_AGE_DIV_OBESE_PANCREAS_AGE === item.lbdyAgeDivCd ? 'age_img_bx pancreas'
                                                                : ServiceConstants.LBDY_AGE_DIV_OBESE_LIVER_AGE === item.lbdyAgeDivCd ? 'age_img_bx liver'
                                                                    : ServiceConstants.LBDY_AGE_DIV_OBESE_KIDNEY_AGE === item.lbdyAgeDivCd ? 'age_img_bx kidney'
                                                                        : ''
                                            }>
                                                <span className='cal_num'>{item.lbdyAge > 0 ? '+' + item.lbdyAge : item.lbdyAge}</span>
                                            </div>
                                            <p className='age_num'><b>{item.bioAge}</b> 세</p>
                                        </div>
                                    </li>
                                )
                            }) : null
                        }
                        <li className='lst_btn_wrap'>
                            <div className='btn_more' onClick={onHealthReportReduceBodyAge}>
                                <a href='#!' className='btn_next'> </a>
                                <span className='txt'>생체나이<br />줄이기</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default HealthReportAgeGraph;