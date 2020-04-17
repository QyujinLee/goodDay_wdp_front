import React, { Component } from 'react';

import * as utils from 'lib/utils';

class MoreShoppingHistory extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

    render() {
       
        const { onClickGoPage } = this.props;

        return (
            <div className='wrap_app'>

                <header className='header'>
                    <div className='title_set'>
                        <a className='arrow_lft' href='#!' onClick={()=>onClickGoPage('')}><span className='blind'>페이지이동</span></a>
                        <h1>쇼핑내역</h1>
                    </div>
                </header>

                <div className='contents'>

                    <div className='mall_wrap'>
                        <ul className='buy_lst_tab'>
                            <li className='on'><a href='#!'>주문/배송 내역</a></li>
                            <li><a href='#!'>교환/반품 내역</a></li>
                        </ul>
                        <p className='older_date'>2020.03.21</p>

                        <div className='order_lst_wrap'>

                            <div className='order_info'>
                                <span className='n_total'>총 주문수 <b>2</b>건</span>
                                <span className='price_total'><strong>7,100</strong> 원</span>
                            </div>

                            <ul className='order_lst'>
                                <li>
                                    <dl>
                                        <dt className='pro_img'><img src='images/img_shop_list_03.png' alt='' /></dt>
                                        <dd className='pro_info'>
                                            <div className='prd_tit'>
                                                <span className='c_name'>비타민하우스</span>
                                                <span>파이토 멀티비타민 포우먼</span>
                                            </div>
                                            <div className='prd_price'>
                                                <span className='n_price'><b>23,000</b>원 / 1개</span>
                                                <button className='bt_buy'>재구매</button>
                                            </div>
                                        </dd>
                                    </dl>
                                    <a href='#!' className='sel_layer'><span className='blind'>레이어오픈</span></a>
                                </li>
                                <li>
                                    <dl>
                                        <dt className='pro_img'><img src='images/img_shop_list_04.png' alt='' /></dt>
                                        <dd className='pro_info'>
                                            <div className='prd_tit'>
                                                <span className='c_name'>포프리</span>
                                                <span>베타카로틴 1세트 [30정/2병/2개월분]</span>
                                            </div>
                                            <div className='prd_price'>
                                                <span className='n_price'><b>59,000</b>원 / 1개</span>
                                                <button className='bt_buy'>재구매</button>
                                            </div>
                                        </dd>
                                    </dl>
                                    <a href='#!' className='sel_layer'><span className='blind'>레이어오픈</span></a>
                                </li>
                            </ul>

                            <ol className='link_order'>
                                <li><a href='#!'>리뷰작성</a></li>
                                <li><a href='#!'>배송조회</a></li>
                                <li><a href='#!'>주문상세</a></li>
                            </ol>

                        </div>

                        <p className='older_date'>2020.03.21</p>

                        <div className='order_lst_wrap'>

                            <div className='order_info'>
                                <span className='n_total'>총 주문수 <b>2</b>건</span>
                                <span className='price_total'><strong>7,100</strong> 원</span>
                            </div>

                            <ul className='order_lst'>
                                <li>
                                    <dl>
                                        <dt className='pro_img'><img src='images/img_shop_list_03.png' alt='' /></dt>
                                        <dd className='pro_info'>
                                            <div className='prd_tit'>
                                                <span className='c_name'>비타민하우스</span>
                                                <span>파이토 멀티비타민 포우먼</span>
                                            </div>
                                            <div className='prd_price'>
                                                <span className='n_price'><b>23,000</b>원 / 1개</span>
                                                <button className='bt_buy'>재구매</button>
                                            </div>
                                        </dd>
                                    </dl>
                                    <a href='#!' className='sel_layer'><span className='blind'>레이어오픈</span></a>
                                </li>
                                <li>
                                    <dl>
                                        <dt className='pro_img'><img src='images/img_shop_list_04.png' alt='' /></dt>
                                        <dd className='pro_info'>
                                            <div className='prd_tit'>
                                                <span className='c_name'>포프리</span>
                                                <span>베타카로틴 1세트 [30정/2병/2개월분]</span>
                                            </div>
                                            <div className='prd_price'>
                                                <span className='n_price'><b>59,000</b>원 / 1개</span>
                                                <button className='bt_buy'>재구매</button>
                                            </div>
                                        </dd>
                                    </dl>
                                    <a href='#!' className='sel_layer'><span className='blind'>레이어오픈</span></a>
                                </li>
                            </ul>

                            <ol className='link_order'>
                                <li><a href='#!'>리뷰작성</a></li>
                                <li><a href='#!'>배송조회</a></li>
                                <li><a href='#!'>주문상세</a></li>
                            </ol>

                            <div className='btn_more_wrap'>
                                <button className='bt_l_gray big'><span className='ico_plus'>최근 6개월 더보기</span></button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
} export default MoreShoppingHistory;