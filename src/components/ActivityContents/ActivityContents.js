import React, { Component } from 'react';

import ActivityWeightContainer from 'containers/ActivityWeightContainer';
import ActivityMindExamContainer from 'containers/ActivityMindExamContainer';
import ActivityBloodPressureContainer from 'containers/ActivityBloodPressureContainer';
import ActivityBloodSugarContainer from 'containers/ActivityBloodSugarContainer';

class ActivityContents extends Component {

    render() {

        return (
            <div className='contents'>
                <div className='active_wrap main'>
                    <div className='main_banner'>
                        <div className='img_box'>
                            <img src='images/img_active_banner.png' alt='활동메인배너' />
                        </div>
                    </div>
                    
                    <ul className='condition_lst'>
                        <ActivityWeightContainer />
                        <ActivityMindExamContainer />
                        <li>
                            <dl className='codition_info'>
                                <dt className='title'>
                                    <span className='tit'>복약</span>
                                    <span className='date'>2020.3.5 11:21:00</span>
                                </dt>
                                <dd className='my_info state'>
                                    <span className='chk_bx'>
                                        <span className='lb_txt'>알림</span>
                                        <span className='tg_check'>
                                            <input type='checkbox' id='tg_check' />
                                            <label htmlFor='tg_check'></label>
                                        </span>
                                    </span>
                                    <div className="txt_wrap">
                                        <span className='txt'>
                                            다이아벡스<br />외 3종
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl className='codition_info'>
                                <dt className='title'>
                                    <span className='tit'>식이</span>
                                    <span className='date'>2020.3.5 11:21:00</span>
                                </dt>
                                <dd className='my_info diet'>
                                    <span className='img_info'>
                                        <img src='images/img_active_01.png' alt='칼로리차트' />
                                    </span>
                                    <span className='num'>1100<em> kcal</em></span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl className='codition_info'>
                                <dt className='title'>
                                    <span className='tit'>수면</span>
                                    <span className='date'>2020.3.5 11:21:00</span>
                                </dt>
                                <dd className='my_info sleep'>
                                    <span className='img_info'>
                                        <img src='images/img_active_02.png' alt='수면' />
                                    </span>
                                    <span className='num'>6<em> 시간</em> 20<em>분</em></span>
                                </dd>
                            </dl>
                        </li>
                        <ActivityBloodPressureContainer />
                        <ActivityBloodSugarContainer />
                    </ul>
                </div>
            </div>
        );
    }
}

export default ActivityContents;