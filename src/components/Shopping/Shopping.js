import React, { Component } from 'react';

import * as ServiceConstants from 'constants/serviceConstants';

import ShoppingRecommendContainer from 'containers/ShoppingRecommendContainer';

class Shopping extends Component {

    render() {

        const { myInfo, onClickGoPage } = this.props;
      
        const ShoppingCommendLayout = [
            {
                'title': 'iCatchUp+',
                'ctgId': ServiceConstants.SHOPPING_CTGID_BANK_BOOK
            },
            {
                'title': '운동',
                'ctgId': ServiceConstants.SHOPPING_CTGID_EXERCISE
            },
            {
                'title': '건강식품',
                'ctgId': ServiceConstants.SHOPPING_CTGID_HEALTH_FOOD
            },
            {
                'title': '마음건강',
                'ctgId': ServiceConstants.SHOPPING_CTGID_MEDITATION
            },
            {
                'title': '식단',
                'ctgId': ServiceConstants.SHOPPING_CTGID_DIET
            },
        ]

        return (
            <div className='contents'>
                <header className='header normal'>
                    <div className='title_set'>
                        <h1>iCatchUp 쇼핑</h1>
                    </div>
                    <div className='shop_top_bar'>
                        <form className='serch_input_form'>
                            <input type='text' placeholder='상품검색' />
                            <button className='summit_serch'></button>
                        </form>
                        <a href='#!' className='cart_link'><span className='lst_num'>3</span></a>
                    </div>
                </header>

                <div className='mall_wrap'>
                    <div className='main_banner' onClick={() => onClickGoPage('shoppingGroupBuy')}>
                    <img src='images/ico_shop_mainbanner.png' alt='쇼핑메인배너' />
                    </div>
                    <div className='shop_gnb_wrap'>
                        <ul className='shop_gnb'>
                            <li className='all on'><a href='#!'><span>전체</span></a></li>
                            <li className='medi'><a href='#!'><span>건강식품</span></a></li>
                            <li className='food'><a href='#!'><span>식단</span></a></li>
                            <li className='sports'><a href='#!'><span>운동</span></a></li>
                            <li className='mind'><a href='#!'><span>마음건강</span></a></li>
                        </ul>
                    </div>
                    <ul className='main_contents_lst'>
                        <li className='product_lst_wrap'>
                            <div className='sort_sel'>
                                <a href='#!'>랭킹순</a>
                            </div>
                            <ol className='product_lst'>
                                <li>
                                    <a href='#!' onClick={() => onClickGoPage('detail')}>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_medi_01.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>포우먼</span>
                                            <span className='name'>종합비타민 포우먼 베티 글루간 1세트 [2개월분]</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars'  style={{ clipPath: 'inset(0 20% 0 0)' }}></i><b className='reply'>(3,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_04.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>포프리</span>
                                            <span className='name'>베타카로틴 1세트 [30정/2병/2개월분]</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 20% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_03.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>마망스</span>
                                            <span className='name'>마망스 엽산600</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars'></i><b className='reply'>(3,901)</b></div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_02.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>마인드 카페</span>
                                            <span className='name'>온라인/오프라인 심리상담_Packcage</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 0 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                            </ol>
                            <div className='btn_more_wrap'>
                                <button className='bt_l_gray big'><span>더보기</span></button>
                            </div>
                        </li>
                        <li className='recommend_wrap'>
                            <h3>{undefined !== myInfo.nickNm ? myInfo.nickNm : ''}님을 위한 맞춤 추천</h3>
                            <ol className='hash_tag_lst'>
                                <li><span className='hash_tag'>#체질량지수낮추기</span></li>
                                <li><span className='hash_tag'>#췌장나이낮추기</span></li>
                                <li><span className='hash_tag'>#고혈압관리</span></li>
                                <li><span className='hash_tag'>#마음건강강화</span></li>
                            </ol>
                            <ShoppingRecommendContainer
                                layout={ShoppingCommendLayout} />
                        </li>
                        <li className='product_lst_wrap'>
                            <h2>금주 에디터 초이스</h2>
                            <div className='choice_banner'>
                                <img src='images/banner_shop_editor.png' alt='' />
                            </div>
                            <ol className='product_lst'>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_03.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>마망스</span>
                                            <span className='name'>마망스 엽산600</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars'></i><b className='reply'>(3,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_04.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>포프리</span>
                                            <span className='name'>베타카로틴 1세트 [30정/2병/2개월분]</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 0 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>


                                    </a>
                                </li>
                            </ol>
                            <div className='btn_more_wrap'>
                                <button className='bt_l_gray big'><span>더보기</span></button>
                            </div>
                        </li>
                        <li className='product_lst_wrap'>
                            <h2>iCatchUp 제품</h2>
                            <ol className='product_lst'>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_03.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>마망스</span>
                                            <span className='name'>마망스 엽산600</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars'></i><b className='reply'>(3,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_04.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>포프리</span>
                                            <span className='name'>베타카로틴 1세트 [30정/2병/2개월분]</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>
                                            원</span></p>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 0 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>


                                    </a>
                                </li>
                            </ol>
                            <div className='btn_more_wrap'>
                                <button className='bt_l_gray big'><span>더보기</span></button>
                            </div>
                        </li>
                        <li className='img_box'><img src='images/img_footer.png' alt='' /></li>

                    </ul>
                </div>
            </div>

        )
    }
}
export default Shopping;