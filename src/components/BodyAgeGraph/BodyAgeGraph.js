import React, { Component } from 'react';

import * as utils from 'lib/utils';

class BodyAgeGraph extends Component {

    getprovalueStyle(rankdata) {

        return 'inset(0 ' + (100 - Number(rankdata)) + '% 0 0)';
    }

    render() {

        const { livingAgeData } = this.props;
        
        let bodyAgeContentsArea = null;
       
        if (3 === livingAgeData.length) {

            const obesity = livingAgeData[0];
            const bodyfat = livingAgeData[1];
            const abdominalfat = livingAgeData[2];

            bodyAgeContentsArea = (
                <div className='health_age_graph'>
                    <span className='m_tit'>실제나이 <strong> {obesity.msmtAge}</strong></span>
                    <div className='card_wrap'>
                        <div className={'age_card ' + utils.getBodyAgeClass(obesity.lbdyAge).gapage}>
                            <span className='tit'>{obesity.mediExamItmDivCdNm}</span>
                            <div className='age_img_bx fat'>
                                <span className='cal_num'>{utils.getBodyAgeClass(obesity.lbdyAge).agesign}</span>
                            </div>
                            <p className='age_num'><b> {obesity.calLbdyAge}</b> 세</p>
                            <ol className='detail_lst'>
                                <li className={utils.getBodyAgeClass(bodyfat.lbdyAge).gapage}>
                                    <span className='tit'>{bodyfat.mediExamItmDivCdNm}</span>
                                    <p className='age_num'><b>{bodyfat.calLbdyAge}</b> 세</p>
                                    <span className='cal_num'>{utils.getBodyAgeClass(bodyfat.lbdyAge).agesign}</span>
                                </li>
                                <li className={utils.getBodyAgeClass(abdominalfat.lbdyAge).gapage}>
                                    <span className='tit'>{abdominalfat.mediExamItmDivCdNm}</span>
                                    <p className='age_num'><b>{abdominalfat.calLbdyAge}</b> 세</p>
                                    <span className='cal_num'>{utils.getBodyAgeClass(abdominalfat.lbdyAge).agesign}</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

            );
        }
        return (
            <>
            { bodyAgeContentsArea }
           </>
        );
    }
}


export default BodyAgeGraph;