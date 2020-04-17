import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';

import ShoppingRecommend from 'components/ShoppingRecommend';

import * as shoppingActions from 'modules/shopping';

class ShoppingRecommendContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
    }

    render() {

        const { layout, recommend } = this.props;
       
        return (
            <Fragment>
                {
                    layout.map((item, index) => {
                        
                        let recommendFilter= [];

                        recommendFilter = recommend.filter(filterItem =>{
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

            </Fragment>
        )
    }
}


export default connect(
    (state) => ({
        recommend: state.shopping.get('recommend')
    }),
    (dispatch) => ({
        ShoppingActions: bindActionCreators(shoppingActions, dispatch)
    })
)(ShoppingRecommendContainer);