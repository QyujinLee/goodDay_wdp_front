import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';
import * as ServiceConstants from 'constants/serviceConstants';

import ShoppingRecommend from 'components/ShoppingRecommend';

import ShoppingHeaderContainer from 'containers/ShoppingHeaderContainer';

import * as shoppingActions from 'modules/shopping';

class ShoppingRecommendContainer extends Component {

  componentDidMount() {

    utils.extApp('04');
  }

  render() {

    const { myInfo, recommend } = this.props;

    const ShoppingCommendLayout = [
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
      {
        'title': 'iCatchUp+',
        'ctgId': ServiceConstants.SHOPPING_CTGID_BANK_BOOK
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
          <ShoppingHeaderContainer />
          <ul className='main_contents_lst'>

            <li className='recommend_wrap'>
              <h3>{undefined !== myInfo.nickNm ? myInfo.nickNm : ''}님을 위한 맞춤 추천</h3>
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
              {

                ShoppingCommendLayout.map((item, index) => {

                  let recommendFilter = [];

                  recommendFilter = recommend.filter(filterItem => {
                    return filterItem.ctgId === item.ctgId;
                  });

                  return (
                    <ShoppingRecommend
                      key={index}
                      title={item.title}
                      recommend={recommendFilter}
                      onClickGoPage={this.handleClickGoPage} />
                  )
                })
              }
            </li>
            <li className='img_box'><img src='images/img_footer.png' alt='' /></li>
          </ul>
        </div>

      </div>

    )
  }
}


export default connect(
  (state) => ({
    myInfo: state.shopping.get('profile').get('information'),
    recommend: state.shopping.get('recommend')
  }),
  (dispatch) => ({
    ShoppingActions: bindActionCreators(shoppingActions, dispatch)
  })
)(ShoppingRecommendContainer);