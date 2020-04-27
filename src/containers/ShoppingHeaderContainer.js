import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shoppingActions from 'modules/shopping';

class ShoppingHeaderContainer extends Component {

    /**
   * 쇼핑 클릭 제어 
   * @param e
   * @returns {void}
   */
    handleClickGoPage = (value) => {

        const { ShoppingActions } = this.props;

        ShoppingActions.setShoppingDivision({
            type: 'nextDivision',
            data: value
        });

        if ('' === value || 'shoppingRecommend' === value) {
            ShoppingActions.setShoppingDivision({
                type: 'headerDivision',
                data: value
            });
        }

    }
    render() {

        const { headerDivision } = this.props;

        return (
            <Fragment>
                <div className='main_banner' onClick={() => this.handleClickGoPage('shoppingGroupBuy')}>
                    <img src='images/ico_shop_mainbanner.png' alt='쇼핑메인배너' />
                </div>
                <div className='shop_gnb_wrap'>
                    <ul className='shop_gnb'>
                        <li className={'' === headerDivision ? 'all on' : 'all'}><a href='#!' onClick={() => this.handleClickGoPage('')}><span>전체</span></a></li>
                        <li className={'shoppingRecommend' === headerDivision ? 'custom on' : 'custom'}><a href='#!' onClick={() => this.handleClickGoPage('shoppingRecommend')}><span>맞춤추천</span></a></li>
                        <li className='medi'><a href='#!'><span>건강식품</span></a></li>
                        <li className='food'><a href='#!'><span>식단</span></a></li>
                        <li className='sports'><a href='#!'><span>운동</span></a></li>
                        <li className='mind'><a href='#!'><span>마음건강</span></a></li>
                    </ul>
                </div>
            </Fragment>
        )
    }

}
export default connect(
    (state) => ({
        headerDivision: state.shopping.get('division').get('headerDivision')
    }),
    (dispatch) => ({
        ShoppingActions: bindActionCreators(shoppingActions, dispatch)
    })
)(ShoppingHeaderContainer);