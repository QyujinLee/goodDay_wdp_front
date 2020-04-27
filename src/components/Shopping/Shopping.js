import React, { Component } from 'react';

import * as utils from 'lib/utils';

import ShoppingHeaderContainer from 'containers/ShoppingHeaderContainer';

class Shopping extends Component {

    
    componentDidMount() {

        utils.extApp('04');
    }

    render() {

        const {  onClickGoPage } = this.props;

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
                    <ShoppingHeaderContainer />
                    <ul className='main_contents_lst'>
                        <li className='product_lst_wrap'>
                            <div className='sort_sel'>
                                <a href='#!'>랭킹순</a>
                            </div>
                            <ol className='product_lst'>
                                <li>
                                    <a href='#!' onClick={()=>onClickGoPage('detail')}>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_01.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>비타민하우스</span>
                                            <span className='name'>파이토 멀티비타민 포우먼</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>750P</b> 할인
                                            </span>
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
                                            <span className='origin'>비타민하우스</span>
                                            <span className='name'>베타카로틴 1세트 [30정x2병x/2개월분]</span>
                                            <p className='price_num'>48,500<span className='cut'><em>50,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,500P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 0 0 0)' }}></i><b className='reply'>(1,901)</b></div>
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
                                            <p className='price_num'>33,950<span className='cut'><em>35,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>750P</b> 할인
                                            </span>
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
                                            <span className='name'>온라인/오프라인 심리상담_Pakage</span>
                                            <p className='price_num'>58,200<span className='cut'><em>60,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,800P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 30% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_05.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>사운드짐</span>
                                            <span className='name'>러닝초보를 위한 23분 달리기</span>
                                            <p className='price_num'>15,000<span className='cut'><em>18,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>3,000P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 10% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_06.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>사운드짐</span>
                                            <span className='name'>필라테스 등, 척추 분절운동</span>
                                            <p className='price_num'>18,500<span className='cut'><em>20,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,500P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 20% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_07.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>비타민하우스</span>
                                            <span className='name'>코엔자임 Q10</span>
                                            <p className='price_num'>25,000<span className='cut'><em>26,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,000P</b> 할인
                                           </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 50% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_08.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>비타민하우스</span>
                                            <span className='name'>파이토 마그네슘 B6</span>
                                            <p className='price_num'>31,000<span className='cut'><em>35,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>4,000P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 40% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_09.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>Greating</span>
                                            <span className='name'>웰니스 식단</span>
                                            <p className='price_num'>48,500<span className='cut'><em>50,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,500P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 0 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                                <li>
                                    <a href='#!'>
                                        <div className='img_pro'>
                                            <img src='images/img_shop_list_10.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>마인드 카페</span>
                                            <span className='name'>온라인 비대면 심리 상담</span>
                                            <p className='price_num'>35,200<span className='cut'><em>37,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,800P</b> 할인
                                            </span>
                                            <div className='score_stars'><i className='stars' style={{ clipPath: 'inset(0 15% 0 0)' }}></i><b className='reply'>(1,901)</b></div>
                                        </div>

                                    </a>
                                </li>
                            </ol>
                            <div className='btn_more_wrap'>
                                <button className='bt_l_gray big'><span>더보기</span></button>
                            </div>
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
                                            <img src='images/img_shop_list_01.png' alt='' />
                                        </div>
                                        <div className='info_pro'>
                                            <span className='origin'>비타민하우스</span>
                                            <span className='name'>파이토 멀티비타민 포우먼</span>
                                            <p className='price_num'>23,000<span className='cut'><em>25,000</em>원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>750P</b> 할인
                                            </span>
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
                                            <span className='origin'>비타민하우스</span>
                                            <span className='name'>베타카로틴 1세트 [30정x2병x/2개월분]</span>
                                            <p className='price_num'>48,500<span className='cut'><em>50,000</em> 원</span></p>
                                            <span className='point_discount'>
                                                포인트 <b>1,500P</b> 할인
                                            </span>
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
                            <h2>iCatchUp+ 패키지</h2>
                            <ol className='package_ban_lst'>
                                <li>
                                    <img src='images/shop_package_01.png' alt='가정용 혈압계와 함께 iCatchUp+ 혈압패키지' />
                                </li>
                                <li>
                                    <img src='images/shop_package_02.png' alt='최대 120% 돌려받는 iCatchUp+ 건강통장' />
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