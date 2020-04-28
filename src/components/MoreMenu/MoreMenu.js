import React, { Component } from 'react';
import * as utils from 'lib/utils';
class MoreMenu extends Component {

    componentDidMount(){
        utils.extApp('04');
    }
    render() {

        const { onClickGoPage } = this.props;

        return (
            <div className='more_menu_wrap'>
                <ul className='more_menu_lst'>
                    <li className='m_mission'><a href='#!' onClick={() => onClickGoPage('mission')}><span>미션</span></a></li>
                    <li className='m_point'><a href='#!'><span>포인트</span></a></li>
                    <li className='m_money'><a href='#!'><span>적립금</span></a></li>
                    <li className='m_shopping'><a href='#!' onClick={() => onClickGoPage('shoppingHistory')}><span>쇼핑내역</span></a></li>
                    <li className='m_gift'><a href='#!'><span>선물하기</span></a></li>
                    <li className='m_invite'><a href='#!'><span>초대하기</span></a></li>
                    <li className='m_product'><a href='#!' onClick={() => onClickGoPage('product')}><span>Plus상품</span></a></li>
                    <li className='m_mydata'><a href='#!'  onClick={() => onClickGoPage('myDataHistory')}><span>My Data</span></a></li>
                    <li className='m_poc'><a href='#!'  onClick={() => onClickGoPage('ourMission')}><span>우리의 미션</span></a></li>
                </ul>
            </div>
        )
    }
}

export default MoreMenu;