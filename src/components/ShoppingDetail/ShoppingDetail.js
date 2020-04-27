import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class ShoppingDetail extends Component {


    componentDidMount() {

        utils.extApp('04');
    }

    render() {
        const { onClickGoPage, onClickBuy } = this.props;
    
        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        <a className='arrow_lft' onClick={()=>onClickGoPage('')} href='#!'><span className='blind'>페이지이동</span></a>
                        <h1>종합비타민포우먼</h1>
                    </div>
                    <div className='shop_top_bar' style={{width:'20%'}}>
                        <a href='#!' className='search_btn'> </a>
                        <a href='#!' className='cart_link'><span className='lst_num'>3</span></a>
                    </div>
                </header>
                <div className='contents'>
                    <div className='mall_wrap detail_shop'>
                        <div className='prd_img_wrap'>
                            <div className='img_box'>
                                <span className='lb'>BEST</span>
                                <img src='images/img_detail_pro_01.png' alt='' />
                            </div>
                            <span className='img_num'><b>1</b>/4</span>
                        </div>
                        <div className='info_pro'>
                            <span className='origin'>비타민하우스</span>
                            <span className='name'>파이토 멀티비타민 포우먼</span>
                            <div className='score_stars'><i className='stars'></i><span className='reply'>리뷰 <em className='num'>3,901</em>건</span></div>
                            <p className='price_num'><b className='price'>23,000</b><span>원</span><span className='cut'><em>25000</em>
                    원</span></p>
                            <dl className='lv_benefit_bx'>
                                <dt>등급혜택 <span className='lv_num'>Level1</span></dt>
                                <dd>
                                    <ol className='conts'>
                                        <li>
                                            <span className='tit'>포인트 할인</span>
                                            <span className='pt'><em>750P</em> ( 3% )</span>
                                            <span className='desc'>보유 포인트 2,000P</span>
                                        </li>
                                        <li>
                                            <span className='tit'>적립금</span>
                                            <span className='pt'><em>24P</em> ( 0.1% )</span>
                                        </li>
                                    </ol>
                                </dd>
                            </dl>
                            <ol className='conts'>
                                <li>
                                    <span className='tit'>배송비</span>
                                    <span ><em className='txt_num'>0원</em>  ( 20,000원 이상 구매 시 무료 )</span>
                                </li>
                                <li>
                                    <span className='tit'>유통기한</span>
                                    <span className='txt_num'>2020.12.25</span>
                                </li>
                            </ol>
                        </div>
                        <div className='detail_shop_conts'>
                            <ul className='detail_tabs'>
                                <li className='on'><a href='#!'>상세정보</a></li>
                                <li><a href='#!'>구매안내</a></li>
                                <li><a href='#!'>상품후기</a></li>
                                <li><a href='#!'>상품문의</a></li>
                            </ul>
                            <div className='img_box'>
                                <img src='images/img_detail_02.png' alt='' />
                            </div>
                            <div className='detail_bts_wrap'>
                                <button className='bt_view'><span>상세정보 펼치기</span></button>
                            </div>
                            <div className='recommend_wrap'>
                                <h3>영미님을 위한 맞춤 추천</h3>
                                <ol className='hash_tag_lst'>
                                    <li><a href='#!' className='hash_tag'>#체질량</a></li>
                                    <li className='on'><a href='#!' className='hash_tag'>#BMI</a></li>
                                    <li><a href='#!' className='hash_tag'>#허리둘레</a></li>
                                    <li className='on'><a href='#!' className='hash_tag'>#생체나이</a></li>
                                    <li className='on'><a href='#!' className='hash_tag'>#비만체형나이</a></li>
                                    <li><a href='#!' className='hash_tag'>#마음건강</a></li>
                                    <li className='on'><a href='#!' className='hash_tag'>#공복혈당</a></li>
                                    <li><a href='#!' className='hash_tag'>#혈색소</a></li>
                                    <li className='on'><a href='#!' className='hash_tag'>#콜레스테롤</a></li>
                                    <li><a href='#!' className='hash_tag'>#중성지방</a></li>
                                    <li><a href='#!' className='hash_tag'>#골다공증</a></li>
                                    <li className='on'><a href='#!' className='hash_tag'>#혈압</a></li>
                                </ol>
                                <dl className='recomm_lst'>
                                    <dt>건강식품</dt>
                                    <dd >
                                        <ul className='conts_lst product' style={{width:'460px'}}>
                                            <li>
                                                <a href='#!'>
                                                    <div className='img_box'>
                                                        <img src='images/img_shop_list_01.png' alt='' />
                                                    </div>
                                                    <span>
                                                        파이토 멀티비타민 포우먼
                              </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#!'>
                                                    <div className='img_box'>
                                                        <img src='images/img_shopping_02.png' alt='' />
                                                    </div>
                                                    <span>
                                                        피쉬콜라겐
                              </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#!'>
                                                    <div className='img_box'>
                                                        <img src='images/img_shopping_02.png' alt='' />
                                                    </div>
                                                    <span>
                                                        멀티프로 멀티비타민 우먼플러스
                              </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className='btn_wrap'>
                            <button className='bt_red big' id='btn_buy'  onClick={()=>onClickBuy()}><span>구매하기</span></button>
                        </div>
                        <div className='buy_box' onClick={()=>onClickBuy()}>
                            <dl className='buy_price_info'>
                                <dt>파이토 멀티비타민 포우먼</dt>
                                <dd>
                                    <span className='price_charge'>무료배송</span>
                                    <div className='set_nums'>
                                        <a href='#!' className='btn_minus'><span className='blind'>minus</span></a>
                                        <span className='n_qty'>1</span>
                                        <a href='#!' className='btn_plus'><span className='blind'>plus</span></a>
                                    </div>
                                </dd>
                                <dd>
                                    <span className='discount_pt'>포인트 할인 <em className='point'>750P</em></span>
                                    <span className='txt_total'>총 금액</span>
                                    <div className='price_num'>
                                        <span className='origin_price'>25,000</span>
                                        <span className='cur_price'>24,250<em className='txt'>원</em></span>
                                    </div>
                                </dd>
                            </dl>
                            <ul className='btn_set_wrap'>
                                <li>
                                    <button className='bt_line_big sel'><span>장바구니 담기</span></button>
                                </li>
                                <li className='gap'></li>
                                <li>
                                    <button className='bt_red big'><span>바로 구매하기</span></button>
                                </li>

                            </ul> </div>
                        <div className='img_box footer'><img src='images/img_footer.png' alt='' /></div>
                    </div>

                </div>
            </Fragment>
        );
    }

}
export default ShoppingDetail;