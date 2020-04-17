import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as utils from 'lib/utils';

class DetailBodyWeight extends Component {

    componentDidMount() {

        // 포인트 지급 처리
        utils.pointPayment('4');
    }

    render() {

        const { weight, latestDateWeight, /*onClickModifyBtn*/ } = this.props;
        const charClassNm = 'recent_num_info ' + (weight < 50 ? 'w_small' : weight < 90 ? 'w_normal' : 'w_big');
        return (
            <>
                <header className='header'>
                    <div className='title_set'>
                        <a href='/activity' className='arrow_lft'><span className='blind'>페이지이동</span></a>
                        <h1>몸무게</h1>
                        <div className='right_btn'>
                            <a href='#!' className='bt_line'><span>목표관리</span></a>
                        </div>
                    </div>
                </header>

                <div className='contents'>
                    <div className='active_chart_wrap'>
                        {'' === weight ? (
                            <div className='recent_num_info no_data'>
                                <div className='time_set'>
                                    <span>최근</span>
                                </div>
                                <div className='figure'>
                                    <p>입력된 데이터가 없습니다.</p>
                                </div> 
                            </div>
                        ) : (
                            <div className={charClassNm}>
                                <div className='time_set'>
                                    <span>최근</span>
                                    <time>{latestDateWeight}</time>
                                </div>
                                <div className='figure'>
                                    <span className='num'>{weight}<em className='unit'>kg</em></span>
                                    {/* 모든 데이터 삭제 시 테스트 데이터가 날아갈 우려가 있어서 개발 기간 동안 잠시 숨김 */}
                                    {/* <Link to='/activity/recordBodyWeight' className='btn_edit' onClick={onClickModifyBtn}/> */}
                                </div>
                            </div>
                        )}
                        <p className='chart_info'>목표 : <b>67</b></p>
                        <div className='img_box'>
                            <img src='/images/img_graph_weight.png' alt='몸무게차트'/>
                        </div>
                    </div>
                    
                    <div className='btn_wrap'>
                        <Link to='/activity/recordBodyWeight'>
                            <button className='bt_red big'><span>몸무게입력</span></button>
                        </Link>
                    </div>
                </div>
                
            </>
        );
    }
}

export default DetailBodyWeight;