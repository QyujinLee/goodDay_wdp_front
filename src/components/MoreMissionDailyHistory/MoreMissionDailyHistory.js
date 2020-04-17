import React, { Component } from 'react';

import * as utils from 'lib/utils';

class MoreMissionDailyHistory extends Component {

    getChangeName(TitleData, nickNm){
       const length = TitleData.length;
      
       if('영미' === TitleData.substring(0,2)){
      
        return nickNm+TitleData.substring(2,length);
       }
       return  TitleData;
    }

    render() {

        const { daily ,myInfo} = this.props;

        return (
            <div className='m_detail_lst_wrap'>
                <ol className='m_detail_lst'>
                    {
                        undefined !== daily ? (
                            daily.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <dl className='daily_conts'>
                                            <dt>{this.getChangeName(item.misnTitle, myInfo.nickNm)}</dt>
                                            <dd>
                                                <span className='date'>{utils.momentDateFormat(item.ffmDt)}</span>
                                                <span className='n_pt'><b>{utils.comma(item.totPnt)}</b>P</span>
                                            </dd>
                                        </dl>
                                    </li>
                                )
                            })
                        ) : null
                    }


                </ol>
            </div>


        );
    }
}
export default MoreMissionDailyHistory;