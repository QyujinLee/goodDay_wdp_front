import React, { Component, Fragment } from 'react';
import { confirmAlert } from 'react-confirm-alert';

class HealthReportGuide extends Component {

    render() {

        const { onHealthReportLoad } = this.props; // props event

        return (
            <div className='main_report'>
                <p className='txt'>
                    내 건강검진 기록을<br />
                    앱 하나에 싹~ 모아보세요
               </p>
                <div className='img_tomato'>
                    <img src='images/img_report_info.png' alt='토마토이미지' />
                </div>
                <div className='noti'><span className='ico_p'></span>불러오면 <b className='num'>5000P</b>적립</div>
                <button className='bt_red big' onClick={onHealthReportLoad}><span>한번에 불러오기</span></button>
                <div className='link_wrap'>
                    <a href='#!' className='link_txt' onClick={() => {
                        confirmAlert({
                            childrenElement: () => (
                                <Fragment>
                                    <h1>비만 나이 검사하기</h1>
                                    <div className='pop_conts'>
                                        <div className='img_box'>
                                            <img src='images/img_report_fat.png' alt='' />
                                        </div>
                                        <p className='msg'>건강검진 기록이 없거나<br />
                                        연동이 귀찮은 경우<br />
                                        쉽고 간단하게 <br />
                                        비만 나이 검사를 할 수 있어요</p>
                                        <p className='msg_p'><span className='ico_p'></span>검사하면 <b>1,000P</b>적립</p>
                                    </div>
                                </Fragment>
                            ),
                            buttons: [
                                { label: '검사하기', onClick: () => { window.location.href = '/report/inputBodyAge'; } },
                                { label: '닫기', onClick: () => null }
                            ]
                        });
                    }}>혹시 건강검진 경험이 없나요?</a>
                </div>
                <ul className='desc_lst'>
                    <li>
                        <div className='cont_wrap'>
                            <p className='txt'>타임라인으로 한눈에~</p>
                            <div className='img_box'>
                                <img src='images/img_report_info_timeline.png' alt='타임라인샘플' />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='cont_wrap'>
                            <p className='txt'>모든 변화를 그래프로!</p>
                            <div className='chart_sp'>
                                <div className='img_box'>
                                    <img src='images/img_chart_sample.png' alt='타임라인샘플' />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='cont_wrap'>
                            <p className='txt'>어려운 용어는 쉽게</p>
                            <div className='img_desc'>
                                <div className='img_box'>
                                    <img src='images/img_info_hdl.png' alt='HDL이미지' />
                                </div>
                                <p className='txt'>
                                    <strong>HDL콜레스테롤</strong>
                                    <span>
                                        동맥 안에 달라붙은 <b>나쁜<br />
                                            콜레스테롤을 수거해서<br />
                                            동맥경화를 방지</b>해줍니다.
                                    </span>
                                </p>
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
                </ul>
            </div>
        );
    }
}

export default HealthReportGuide;