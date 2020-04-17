import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class MoreMembershipLevel extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

   
    render() {

        const { myInfo, onClickGoPage } = this.props;

        const level = undefined !== myInfo.lvlVal && '' !== myInfo.lvlVal ? myInfo.lvlVal : '1';

        return (
            <Fragment>
                <header className='header'>
                    <div className='title_set'>
                        <a href='#!' className='arrow_lft' onClick={() => onClickGoPage('')}><span className='blind'>페이지이동</span></a>
                        <h1>회원 등급 혜택</h1>
                    </div>
                </header>

                <div className='contents'>

                    <div className='level_benefit_wrap'>

                        <div className='cur_level_info'>
                            <dl className='lv_benefit_conts'>
                                <dt className='level_bx'>
                                    <span className={utils.getLevelClassName(myInfo)}></span>
                                </dt>
                                <dd>
                                    현재등급 <span className='lv_num'>Level {level}</span>
                                    <div className='coupons'>
                                        <span className='coupon_gray'><b>{utils.getLevelDiscountAccumulation(level, 'Discount')}%</b> 할인</span>
                                        <span className='coupon_gray'><b>{utils.numberFixed(utils.getLevelDiscountAccumulation(level, 'Accumulation'))}%</b> 적립</span>
                                    </div>
                                </dd>
                            </dl>
                        </div>

                        <div className='terms_wrap'>
                            <ol className='terms_lst'>
                                <li>
                                    <h3>아이캐첩 회원 등급 안내</h3>
                                    <p className='txt_bx'>레벨이 오를 수록 상품 구매 시 할인율과 적립금이 상승합니다.<br />
                                 최고 레벨인 8까지는 매월 미션을 달성율 만큼 참여 시 누구나 12개월이면 가능 합니다.</p>
                                    <div className='img_box'>
                                        <img src='images/img_level_graph.png' alt='' />
                                    </div>
                                </li>
                                <li>
                                    <h3>회원 등급별 혜택</h3>
                                    <table className='tb_terms'>
                                        <colgroup>
                                            <col width='33%' />
                                            <col width='33%' />
                                            <col width='34%' />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>등급</th>
                                                <th>할인율</th>
                                                <th>쇼핑 적립금</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Level8</th>
                                                <td>10%</td>
                                                <td>2.5%</td>
                                            </tr>
                                            <tr>
                                                <th>Level7</th>
                                                <td>8%</td>
                                                <td>2.0%</td>
                                            </tr>
                                            <tr>
                                                <th>Level6</th>
                                                <td>7%</td>
                                                <td>1.5%</td>
                                            </tr>
                                            <tr>
                                                <th>Level5</th>
                                                <td>6%</td>
                                                <td>1.0%</td>
                                            </tr>
                                            <tr>
                                                <th>Level4</th>
                                                <td>5%</td>
                                                <td>0.7%</td>
                                            </tr>
                                            <tr>
                                                <th>Level3</th>
                                                <td>4%</td>
                                                <td>0.4%</td>
                                            </tr>
                                            <tr>
                                                <th>Level2</th>
                                                <td>3%</td>
                                                <td>0.2%</td>
                                            </tr>
                                            <tr>
                                                <th>Level1</th>
                                                <td>3%</td>
                                                <td>0.1%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <ul className='depth2_lst'>
                                        <li><span className='txt'>할인율이란?</span></li>
                                    </ul>
                                    <p className='txt_bx'>
                                        상품 구매 시 나의 포인트(P)를 사용하여 제품을 할인 받을 수 있는 비율을 의미합니다.
                                </p>
                                    <ul className='depth2_lst'>
                                        <li><span className='txt'>쇼핑 적립금이란?</span></li>
                                    </ul>
                                    <p className='txt_bx'>
                                        고객님께서 상품을 결제하실 때 총 결제금액의 일정 비율이 적립되는 것을 의미합니다.
                                </p>
                                </li>
                                <li>
                                    <h3>레벨 Up 조건</h3>
                                    <table className='tb_terms'>
                                        <colgroup>
                                            <col width='33%' />
                                            <col width='33%' />
                                            <col width='34%' />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>레벨 Up 조건</th>
                                                <th>월 달성율</th>
                                                <th>연속 달성</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Level8</th>
                                                <td>60%</td>
                                                <td>2개월 연속</td>
                                            </tr>
                                            <tr>
                                                <th>Level7</th>
                                                <td>60%</td>
                                                <td>2개월 연속</td>
                                            </tr>
                                            <tr>
                                                <th>Level6</th>
                                                <td>60%</td>
                                                <td>2개월 연속</td>
                                            </tr>
                                            <tr>
                                                <th>Level5</th>
                                                <td>50%</td>
                                                <td>2개월 연속</td>
                                            </tr>
                                            <tr>
                                                <th>Level4</th>
                                                <td>50%</td>
                                                <td>2개월 연속</td>
                                            </tr>
                                            <tr>
                                                <th>Level3</th>
                                                <td>50%</td>
                                                <td>1개월 달성</td>
                                            </tr>
                                            <tr>
                                                <th>Level2</th>
                                                <td>50%</td>
                                                <td>1개월 달성</td>
                                            </tr>
                                            <tr>
                                                <th>Level1</th>
                                                <td>50%</td>
                                                <td>1개월 달성</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <ul className='depth2_lst'>
                                        <li><span className='txt'>월 달성율이란?</span></li>
                                    </ul>
                                    <p className='txt_bx'>
                                        일일 미션을 3개 완수했을 때 “일일 미션 달성”이라고 정의 합니다.<br />
                                                                    월 달성율은 일일 미션 달성 횟수를 월 기준으로 따져 비율로 표시한 것을 말합니다.<br />
                                                                        예를 들어 30일까지 있는 월 중 15일 이상 “일일 미션 달성”을 하면 “월 달성 50%”이라고 볼 수 있습니다.
                                </p>
                                    <ul className='depth2_lst'>
                                        <li><span className='txt'>연속 달성이란?</span></li>
                                    </ul>
                                    <p className='txt_bx'>
                                        레벨 Up 조건에는 월 달성과 연속 달성 두가지 항목이 있습니다.<br />
                                                                            이중 연속 달성이란 월 달성율 조건을 2회 연속 만족 한것을 뜻합니다.<br />
                                                                                예를 들어 4월에 월 달성을 하고 5월에 바로 이어 월 달성을 한 경우 “2개월 연속“ 달성이라고 볼 수 있습니다.
                                </p>
                                </li>
                            </ol>

                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
}
export default MoreMembershipLevel;