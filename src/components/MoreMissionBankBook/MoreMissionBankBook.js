import React, { Component } from 'react';

import * as utils from 'lib/utils';

class MoreMissionBankBook extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

    render() {

        const { myInfo, myPoint, onClickGoPage } = this.props;

        return (
            <div className='wrap_app'>

                <header className='header'>
                    <div className='title_set'>
                        <h1>iCatchUp Plus 건강통장</h1>
                        <div className='right_btn'>
                            <a href='#!' className='close_btn' onClick={() => onClickGoPage('product')}> </a>
                        </div>
                    </div>
                </header>

                <div className='contents'>

                    <div className='mission_wrap'>
                        <div className='health_bank_bx'>
                            <dl className='bank_book'>
                                <dt><strong>{undefined !== myInfo.nickNm ? myInfo.nickNm : ''}</strong>님의 건강통장</dt>
                                <dd>
                                    <span className='cash'>{undefined !== myPoint.accmPnt ? utils.comma(myPoint.accmPnt) : '0'}</span>
                                    <ul className='cash_bnts'>
                                        <li><button className='btn_cash'>출금</button></li>
                                        <li><button className='btn_cash'>충전</button></li>
                                    </ul>
                                </dd>
                            </dl>
                        </div>

                        <div className='m_detail_lst_wrap'>
                            <div className='sort_sel'>
                                <a href='#!'>1개월/최신순</a>
                            </div>
                            <ol className='m_detail_lst'>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>프로그램 미션 달성</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>걷기 미션 달성</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>출석 체크 보너스</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>걷기 미션 달성</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>데일리 미션 달성</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>출석 체크 보너스</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className='acquire_conts'>
                                        <dt>
                                            <span className='date'>2020.4.30</span>
                                            <span className='tit'>건강검진 연동</span>
                                        </dt>
                                        <dd>
                                            <span className='n_pt'><b>5</b>P</span>
                                            <span className='total_pt'>35,900 P</span>
                                        </dd>
                                    </dl>
                                </li>
                            </ol>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
} export default MoreMissionBankBook;