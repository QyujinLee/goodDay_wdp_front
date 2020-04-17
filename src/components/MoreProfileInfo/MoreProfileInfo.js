import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class MoreProfileInfo extends Component {

    render() {

        const { myInfo, myPoint } = this.props; // props data
        const { onClickGoPage, onClickLogout } = this.props; // props event

        const level = undefined !== myInfo.lvlVal && '' !== myInfo.lvlVal ? myInfo.lvlVal : '1';

        return (
            <Fragment>
                {undefined !== myPoint ? (
                    <div className='my_info_top'>
                        <div className='info_set'>
                            <span className='my_photo'><img src={myInfo.picLocNm} alt='' /></span>
                            <dl className='my_info'>
                                <dt>{myInfo.nickNm}</dt>
                                <dd className='bt_lst'>
                                    <ul>
                                        <li><a href='#!'>프로필 관리</a></li>
                                        <li><a href='#!' onClick={onClickLogout}>로그아웃</a></li>
                                    </ul>
                                </dd>
                            </dl>
                            <a href='#!' className='btn_alram'><span className='num_push'>3</span></a>
                        </div>
                        <div className='point_bx'>
                            <dl>
                                <dt>포인트</dt>
                                <dd>{undefined !== myPoint.avlbPnt ? utils.comma(myPoint.avlbPnt) : '0'} <em className='txt_p'>P</em></dd>
                            </dl>
                        </div>
                        <div className='level_bx' onClick={() => onClickGoPage('membershipLevel')}>
                            <div className={utils.getLevelClassName(myInfo)}></div>
                            <div className='level_benefit'>
                                <a className='benefit_link' href='#!'>회원 등급 혜택</a>
                                <div className='detail_lst'>
                                    <span>전상품 할인 <b className='per'>{utils.getLevelDiscountAccumulation(level, 'Discount')}%</b></span>
                                    <span>상시적립 <b className='per'>{utils.numberFixed(utils.getLevelDiscountAccumulation(level, 'Accumulation'))}%</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Fragment>
        )
    }
}
export default MoreProfileInfo;