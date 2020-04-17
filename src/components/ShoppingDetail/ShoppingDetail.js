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
                    <div className='title_set' >
                        <button className='arrow_lft' onClick={() => onClickGoPage('')}> <span className='blind'>페이지이동</span></button>
                        <h1>종합비타민 포우먼</h1>
                    </div>
                    <div className='shop_top_bar' style={{ width: '20%' }}>
                        <button className='search_btn'> </button>
                        <button className='cart_link'><span className='lst_num'>3</span></button>
                    </div>

                </header>

                <div className='contents'>

                    <div className='mall_wrap'>
                        <ul>
                            <li className='img_box'><img src='images/img_detail_01.png' alt='' /></li>
                            <li className='img_box'><img src='images/img_detail_02.png' alt='' /></li>
                            <li className='img_box'><img src='images/img_detail_03.png' alt='' /></li>
                            <li className='img_box'><img src='images/img_footer.png' alt='' /></li>
                            <li className='img_box buy_box'  onClick={()=>onClickBuy()} ><img src='images/img_detail_select.png' alt='' /></li>
                            <li className='btn_wrap'>
                                <button className='bt_red big' id='btn_buy' onClick={()=>onClickBuy()}><span>구매하기</span></button>
                            </li>
                        </ul>
                    </div>

                </div>

            </Fragment>
        );
    }

}
export default ShoppingDetail;