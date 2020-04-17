import React, { Component } from 'react';

import * as utils from 'lib/utils';
class MoreMyDataAgree extends Component {
    
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

                <div className='my_data_wrap'>

                    <div className='terms_wrap'>

                        <ol className='terms_lst'>
                            <li>
                                <h3>1. 제공받는 자</h3>
                                <div className='img_box'><img src='images/img_logo_kia.png' alt='' /></div>
                                <ul className='depth2_lst'>
                                    <li><span className='txt'>법인명 : 기아자동차주식회사</span></li>
                                    <li><span className='txt'>주소 :  서울특별시 서초구 헌릉로 12</span></li>
                                    <li><span className='txt'>대표 전화 : 080-200-2000</span></li>
                                </ul>
                            </li>
                            <li>
                                <h3>2. 제공 목적</h3>
                                <dl className='object_bx'>
                                    <dt className='ico_marketing'>
                                        마케팅
                                    </dt>
                                    <dd>
                                        <b>After 6 life begins!</b>
                                    퇴근 후, 레저/취미를 꿈꾸는<br />
                                    3040세대를 겨냥한 2020 소렌토!<br />
                                        시승 행사  및 특가 판매 안내
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <h3>3. 동의 일시 및 제공 기간</h3>
                                <ul className='depth2_lst'>
                                    <li><span className='txt'>동의 일 : 미동의 </span></li>
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
                                                    <td>O</td>
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
                                                    <td>O</td>
                                                    <td>O</td>
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
                                                    <td>X</td>
                                                    <td rowSpan='9'>최근 1년</td>
                                                </tr>
                                                <tr>
                                                    <td>생체 나이 분석 정보</td>
                                                    <td>X</td>
                                                </tr>
                                                <tr>
                                                    <td>걸음 수, 이동거리 정보</td>
                                                    <td>X</td>
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
                                                    <td>X</td>
                                                </tr>
                                                <tr>
                                                    <td>식단 구매 이력</td>
                                                    <td>X</td>
                                                </tr>
                                                <tr>
                                                    <td>건강기능식품 구매 이력</td>
                                                    <td>O</td>
                                                </tr>
                                                <tr>
                                                    <td>심리상담 구매 이력</td>
                                                    <td>X</td>
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
                                                    <td>X</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>몸무게 측정 기록</td>
                                                    <td>X</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>혈압 측정 기록</td>
                                                    <td>X</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>혈당 측정 기록</td>
                                                    <td>X</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h3>5. 보상</h3>
                                <div className='img_box'><img src='images/img_mydata_coupon.png' alt='' /></div>
                                <p className='cmmt'>* 단, 추가할인은 소렌토 구매 시에만 적용됩니다. </p>
                            </li>
                        </ol>
                        <div className='terms_check_wrap'>
                            <div className='terms_chk_bx'>
                                <input type='checkbox' id='terms_chk' className='terms_chk' defaultChecked />
                                <label htmlFor='terms_chk'>상기 My Data 제공 동의 약관을 모두 확인 및 이해 하였으며 약관에 명시된 My Data 제공에 동의합니다.</label>
                            </div>

                        </div>
                        <div className='btn_wrap'>
                            <button type='button' className='bt_red big' id='MyDatabtn' onClick={()=>onClickGoPage('myDataHistory')} ><span>동의</span></button>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}
export default MoreMyDataAgree;