import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class shoppingGroupBuy extends Component {


    componentDidMount() {

        utils.extApp('04');
    }

    render() {
        const { onClickGoPage } = this.props;

        return (
            <Fragment>
                <header className='header normal'>
                    <div className='title_set'>
                        <a className='arrow_lft' href='#!' onClick={()=>onClickGoPage('')}><span className='blind'>페이지이동</span></a>
                        <h1>공동구매</h1>
                    </div>
                    <div className='shop_top_bar' style={{ width: '20%' }}>
                        <a href='#!' className='search_btn'> </a>
                        <a href='#!' className='cart_link'><span className='lst_num'>3</span></a>
                    </div>
                </header>

                <div className='contents'>

                    <div className='mall_wrap'>
                        <ul>
                            <li className='img_box'><img src='images/img_together_1.png' alt='' /></li>
                            <li className='img_box'><img src='images/img_together_2.png' alt='' /></li>
                            <li className='img_box'><img src='images/img_together_3.png' alt='' /></li>
                            <li className='btn_wrap'>
                                <button className='bt_red big' id='btn_buy'><span>참여하기</span></button>
                            </li>
                        </ul>
                    </div>

                </div>
            </Fragment>
        )
    }
}
export default shoppingGroupBuy;