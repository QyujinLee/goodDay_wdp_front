import React, { Component, Fragment } from 'react';

import * as ServiceConstants from 'constants/serviceConstants';

class ShoppingRecommend extends Component {
    getContsWidth(dataSize, ctgId) {

        if (ServiceConstants.SHOPPING_CTGID_HEALTH_FOOD === ctgId) {
            return 138 * dataSize + 23 * (dataSize - 1) +5;
        } else {
            return 258 * dataSize + 13 * (dataSize - 1) +5;
        }

    }
    render() {


        const { title, recommend } = this.props;
      
        return (
            <Fragment>
                {
                    undefined !== recommend && 0 < recommend.length ? (

                        <dl className='recomm_lst'>
                            <dt>{title}</dt>
                            <dd >

                                <ul className={ServiceConstants.SHOPPING_CTGID_HEALTH_FOOD === recommend[0].ctgId ? 'conts_lst product' : 'conts_lst'} style={{ width: this.getContsWidth(recommend.length, recommend[0].ctgId) + 'px' }} >
                                    {
                                        recommend.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <a href='#!'>
                                                        <div className='img_box'>
                                                            <img src={item.imgLocNm} alt='' />
                                                        </div>
                                                        <span className='tit'>{item.prodTitle}</span>
                                                        <span>{item.prodNm}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </dd>
                        </dl>
                    ) : null
                }
            </Fragment>
        )
    }
}
export default ShoppingRecommend;