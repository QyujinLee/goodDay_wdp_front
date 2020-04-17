import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

class BodyAgeGuide extends Component {

    render() {

        const { onHealthReportLoad } = this.props; // props event

        return (
            <div className='main_report'>
                <p className='txt'>
                    건강관리? 비만관리부터!<br />
                    비만 나이를 알아볼게요
               </p>
                <div className='img_tomato'>
                    <img src='images/img_report_fat.png' alt='토마토이미지' />
                </div>
                <div className='noti'><span className='ico_p'></span>불러오면 <b className='num'>1000P</b>적립</div>
                <Link to='/report/inputBodyAge'>
                    <button className='bt_red big'><span>비만 나이 검사</span></button>
                </Link>
                <div className='link_wrap'>
                    <a href='#!' className='link_txt' onClick={() => {
                        confirmAlert({
                            childrenElement: () => (
                                <Fragment>
                                    <h1>건강검진 불러오기</h1>
                                    <div className='pop_conts'>
                                        <div className='img_box'>
                                            <img src='images/img_report_info.png' alt='' />
                                        </div>
                                        <p className='msg'>건강검진 기록이 있다면<br />
                                        10년치 기록을 싹~ 모아서<br />
                                        한눈에 확인할 수 있어요</p>
                                        <p className='msg_p'><span className='ico_p'></span>검사하면 <b>5,000P</b>적립</p>
                                    </div>
                                </Fragment>
                            ),
                            buttons: [
                                { label: '검사하기', onClick: onHealthReportLoad },
                                { label: '닫기', onClick: () => null }
                            ]
                        });
                    }}>건강검진 기록을 쉽게 확인하기</a>
                </div>
                <ul className='desc_lst'>
                    <li>
                        <div className='cont_wrap'>
                            <p className='txt'>1분이면 간단하게 확인 끝</p>
                            <p className='s_txt'>간단한 절차로<br />
                            쉽고 간단하게 확인해요</p>
                            <div className='img_box'>
                                <img src='images/img_fatage_simple.png' alt='비만나이샘플' />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='cont_wrap'>
                            <p className='txt'>비만 나이로 확인하는 내 건강!</p>
                            <p className='s_txt'>몸무게 수치보다<br />
                            체지방 관리가 더 중요합니다!</p>
                            <div className='chart_sp'>
                                <div className='img_box'>
                                    <img src='images/img_fatage_fat.png' alt='타임라인샘플' />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='cont_wrap'>
                            <p className='txt'>데이터는 안전하게</p>
                            <div className='img_desc'>
                                <div className='img_box'>
                                    <img src='images/img_info_data.png' alt='보안이미지' />
                                </div>
                                <p className='txt'>
                                    <strong>
                                        IT 기술의 강력한 보안<br />
                                        검증과 데이터 암호화
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='ad_box'>
                            <p className='ad_txt'>
                                <strong>건강검진 경험이 있으세요?</strong>
                                <span>
                                    딱 한번 검진기록을 연동하면<br />
                                    10년치 기록을 하나로! 6개 생체나이를 한눈에!
                                </span>
                            </p>
                            <div className='img_box'>
                                <img src='images/img_fatage_report.png' alt='검진리스트' />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default BodyAgeGuide;