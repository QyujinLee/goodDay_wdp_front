import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import * as api from 'lib/api';
import * as utils from 'lib/utils';

import Shopping from 'components/Shopping';
import ShoppingDetail from 'components/ShoppingDetail';
import ShoppingGroupBuy from 'components/shoppingGroupBuy';


import * as shoppingActions from 'modules/shopping';

class ShoppingContainer extends Component {

    componentDidMount() {

        utils.extApp('04');

        //미션 추천상품 조회 프로세스
        this.getShoppingProductRecommendProcess();

        //사용자 정보 조회 프로세스
        this.getUserInfoProcess();
    }

    /**
     * GET /svc/product/recommend
     * 미션 추천상품 조회
     * @param params {object}
     * @returns {response}
     */
    getShoppingProductRecommendProcess() {

        const param = queryString.parse(window.location.search);
        param.randomYn = 'N';

        const getProductRecommend = this.getProductRecommendAPI(param);

        getProductRecommend.then((response) => {
            const { ShoppingActions } = this.props;

            const responseData = response[0].data.data;

            ShoppingActions.setShoppingRecommend({
                recommend: responseData
            })
        })

    }
    getProductRecommendAPI = async (params) => {
        return await Promise.all([
            api.getProductRecommendAPI(params)
        ]);
    }

    /**
    * 사용자 정보 조회
    */
    getUserInfoProcess(props) {

        const { ShoppingActions } = this.props;

        ShoppingActions.setShoppingProfile({
            type: 'information',
            data: utils.getUserInfo()
        })

    }

    /**
   * 쇼핑 클릭 제어 
   * @param e
   * @returns {void}
   */
    handleClickGoPage = (value) => {

        const { ShoppingActions } = this.props;

        ShoppingActions.setShoppingDivision({
            division: value
        });

    }


    /**
   * 쇼핑 구매하기 버튼 제어 
   * @param e
   * @returns {void}
   */
    handleClickBuy = () => {

        const target = document.getElementsByClassName('buy_box')[0];

        if (target.classList.contains('lyr_up')) {
            target.classList.remove('lyr_up');
            target.classList.add('lyr_down');
        } else {
            target.classList.remove('lyr_down');
            target.classList.add('lyr_up');
        }

    }



    render() {

        const { myInfo, recommend, division } = this.props;

        let shoppingArea = null;

        if ('' === division) {
            shoppingArea = (
                <Shopping
                    myInfo={myInfo}
                    onClickGoPage={this.handleClickGoPage}
                    recommend={recommend} />
            )
        } else if ('detail' === division) {
            shoppingArea = (
                <ShoppingDetail
                    onClickGoPage={this.handleClickGoPage}
                    onClickBuy={this.handleClickBuy}
                />
            )
        }else if('shoppingGroupBuy' === division) {
            shoppingArea = (
                <ShoppingGroupBuy
                    onClickGoPage={this.handleClickGoPage}
                />
            )
        }
        return (
            <Fragment>
                {shoppingArea}
            </Fragment>

        );
    }
}
export default connect(
    (state) => ({
        myInfo: state.shopping.get('profile').get('information'),
        recommend: state.shopping.get('recommend'),
        division: state.shopping.get('division'),
    }),
    (dispatch) => ({
        ShoppingActions: bindActionCreators(shoppingActions, dispatch)
    })
)(ShoppingContainer);