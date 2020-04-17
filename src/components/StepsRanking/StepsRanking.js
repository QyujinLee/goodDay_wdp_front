import React, { Component, Fragment } from 'react';

import * as utils from 'lib/utils';

class StepsRanking extends Component {

  render() {
    const { ranking } = this.props;

    const myRanking = undefined !== ranking[0] ? ranking[0] : '';

    return (
      <Fragment>
        <dl>
          <dt>친구 랭킹</dt>
          <dd>
            <ul className='lank_lst'>
              {
                'MY' === myRanking.rnkDiv ? (
                  <li className='my'>
                    <div className='lank_info'>
                      <span className='num_lank'>{myRanking.rnk}</span>
                      <span className='photo'><img src={myRanking.picLocNm} alt='' /></span>
                      <span className='name'>{myRanking.nickNm} (나)</span>
                    </div>
                    <div className='lank_walk'>
                      <span className='num_walk'>{utils.comma(myRanking.stpCnt)}걸음</span>
                    </div>
                  </li>
                ) : null
              }

              {
                0 < ranking.length ? (
                  ranking.map((item, index) => {
                    return (
                      'MY' !== item.rnkDiv ? (
                        <li key={index}>
                          <div className='lank_info'>
                            <span className='num_lank'>{item.rnk}</span>
                            <span className='photo'><img src={item.picLocNm} alt='' /></span>
                            <span className='name'>{item.nickNm}</span>
                          </div>
                          <div className='lank_walk'>
                            <span className='num_walk'>{utils.comma(item.stpCnt)} 걸음</span>
                          </div>
                        </li>) : null
                    )
                  })

                ) : null
              }

            </ul>
          </dd>
        </dl>
      </Fragment >
    );
  }

}
export default StepsRanking;
