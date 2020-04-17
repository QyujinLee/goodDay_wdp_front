import React, { Component } from 'react';

import * as utils from 'lib/utils';
class MoreMyDataCancel extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

    render() {
        const { onClickGoPage } = this.props;

        return (
            <div className='wrap_app'>

                <header className='header normal'>
                    <div className='title_set'>
                        <h1>My Data 제공 동의 약관</h1>
                        <div className='right_btn'>
                            <a href='#!' className='close_btn' onClick={() => onClickGoPage('myDataHistory')}> </a>
                        </div>
                    </div>
                </header>

                <div className='contents'>

                    <div className='my_data_wrap'>

                        <div className='terms_wrap'>

                            <ol className='terms_lst'>
                                <li>
                                    <h3>1. 제공받는 자</h3>
                                    <div className='img_box'><img src='images/img_logo_cancer_2.png' alt='' /></div>
                                    <ul className='depth2_lst'>
                                        <li><span className='txt'>법인명 : 국립암센터</span> </li>
                                        <li><span className='txt'>주소 :  경기도 고양시 일산동구 일산로 323</span></li>
                                        <li><span className='txt'>대표 전화 : 1588-8110</span> </li>
                                    </ul>
                                </li>
                                <li>
                                    <h3>2. 제공 목적</h3>
                                    <dl className='object_bx'>
                                        <dt className='ico_report'>
                                            학술논문
                                        </dt>
                                        <dd>
                                            대사증후군 고위험 군의<br />
                                                건강습관 현황 조사/연구를 통한<br />
                                                    암 예방에 좋은<br />
                                                        대 국민 2020 생활 백서 자료 조사
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <h3>3. 동의 일시 및 제공 기간</h3>
                                    <ul className='depth2_lst'>
                                        <li><span className='txt'>동의 일 : 2020.03.05 17:17:17</span> </li>
                                        <li><span className='txt'>제공 기간 : 2020.04.01 ~ 2020.4.30</span> </li>
                                    </ul>
                                </li>
                                <li>
                                    <h3>4. 제공하는 My Data</h3>
                                    <ul className='depth2_lst'>
                                        <li>
                                            <span className='txt'>기본정보</span>
                                            <table className='tb_terms'>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>이름</th>
                                                        <th>성별</th>
                                                        <th>생년월일</th>
                                                        <th>나이</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>제공여부</td>
                                                        <td>X</td>
                                                        <td>O</td>
                                                        <td></td>
                                                        <td>O</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                        <li>
                                            <span className='txt'>연락처 정보</span>
                                            <table className='tb_terms'>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>이동전화번호</th>
                                                        <th>이메일 주소</th>
                                                        <th>주 생활권역</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>제공여부</td>
                                                        <td>X</td>
                                                        <td>X</td>
                                                        <td>O</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                        <li>
                                            <span className='txt'>건강 검진 및 습관 정보</span>
                                            <table className='tb_terms'>
                                                <thead>
                                                    <tr>
                                                        <th>Data</th>
                                                        <th>제공여부</th>
                                                        <th>기간</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>건강검진결과 정보</td>
                                                        <td>O</td>
                                                        <td rowSpan='9'>최근 4년</td>
                                                    </tr>
                                                    <tr>
                                                        <td>생체 나이 분석 정보</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>걸음 수, 이동거리 정보</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>운동, 활동 미션 이력</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>마음 건강 문진 결과</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>음식/수분 섭취 기록</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>식단 구매 이력</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>건강기능식품 구매 이력</td>
                                                        <td>O</td>
                                                    </tr>
                                                    <tr>
                                                        <td>마인드 카페 심리상담 구매 이력</td>
                                                        <td>O</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                        <li>
                                            <span className='txt'>Device 측정 정보</span>
                                            <table className='tb_terms'>
                                                <thead>
                                                    <tr>
                                                        <th>Data</th>
                                                        <th>제공여부</th>
                                                        <th>기간</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>수면시간 측정 기록</td>
                                                        <td>O</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>몸무게 측정 기록</td>
                                                        <td>O</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>혈압 측정 기록</td>
                                                        <td>O</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>혈당 측정 기록</td>
                                                        <td>O</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <h3>5. 보상</h3>
                                    <div className='img_box'><img src='images/img_mydata_coupon_point.png' alt='' /></div>
                                    <p className='cmmt'>* 단, 포인트는 2020. 05. 01.에 일괄 지급 됩니다.</p>
                                </li>
                            </ol>

                            <div className='terms_check_wrap'>
                                <div className='terms_chk_bx'>
                                    <input type='checkbox' id='terms_chk' className='terms_chk' defaultChecked />
                                    <label htmlFor='terms_chk'>동의 철회 시 , 제공 data는 익일 00:00부로 즉시 파기되며, 지급 예정인 보상 1,000p 지급되지 않습니다.<br />상기 내용을 모두 확인 및 이해 하였으며, My Data 제공을 철회합니다.</label>
                                </div>

                            </div>

                            <div className='btn_wrap'>
                                <button className='bt_red big' onClick={() => onClickGoPage('myDataHistory')}> <span>동의 철회</span> </button>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
export default MoreMyDataCancel;