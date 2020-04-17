import React, { Component } from 'react';

import * as utils from 'lib/utils';

class MoreProduct extends Component {

    componentDidMount() {
        utils.extApp('04');
    }

    render() {

        const { onClickGoPage } = this.props;

        return (
            <div className='wrap_app'>
                <header className='header'>
                    <div className='title_set'>
                        <a className='arrow_lft' onClick={() => onClickGoPage('')} href='#!' > <span className='blind'>페이지이동</span></a>
                        <h1>iCatchUp Plus 프리미엄 상품</h1>
                    </div>
                </header>

                <div className='contents'>
                    <div className='level_benefit_wrap'>
                        <div className='banner_bx'>
                            <p className='txt_conts'>
                                <span className='msg'>
                                    iCatchUp Plus 상품으로 업그레이드 하고<br />
                                        더 많은 혜택을 누려보세요
                                </span>
                            </p>
                        </div>

                        <div className='plus_ban_wrap'>
                            <ul className='plus_ban_lst'>
                                <li><a href='#!'> <img src="images/recomm_package_01.png" alt='' /> </a> </li>
                                <li><a href='#!'  onClick={() => onClickGoPage('missionBank')}> <img src="images/recomm_package_02.png" alt='' /> </a></li>
                                <li><a href='#!'> <img src="images/recomm_package_03.png" alt='' /> </a></li>
                                <li><a href='#!'> <img src="images/recomm_package_04.png" alt='' /> </a></li>
                                <li><a href='#!'> <img src="images/recomm_package_05.png" alt='' /> </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}
export default MoreProduct;
