import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { toJS } from 'immutable';
import * as utils from 'lib/utils';
import { dataSplit } from '../../lib/utils';

class WalkChart extends Component {
    render() {
        
        const {
            data,
            // eslint-disable-next-line no-unused-vars
            totalSteps,
            maxSteps,
            avgSteps,
            onToggleTooltip,
            searchType
        } = this.props;
        const avgTop = 100 - Math.floor((avgSteps / maxSteps) * 100);
        const thousandTop = 100 - Math.floor((10000 / maxSteps) * 100);
        let chartType = 'walk_chart';

        if (searchType !== 'day') chartType = chartType + ' ' + searchType;
        const maxCnt = () => {
            let cnt = 0;
            for (let i = 0; i < data.size; i++) {
                if (data.get(i).get('stepCount') > 10000) {
                    cnt++;
                }
            }
            return cnt;
        };

        return (
            <>
                <div className={chartType}>
                    {' '}
                    {/*class 타입추가 일일이 기본으로 세팅되어 있으며 월:month 주: week 분기처리 200220HJ---s*/}
                    <ul>
                        {data !== undefined && data.size > 0
                            ? data.map((item, index) => (
                                  <li
                                      key={index}
                                      className={ item.get('stepCount') > 10000 ? 'bar_wrap max' : 'bar_wrap' }
                                      style={{
                                          height: item.get('height') + '%',
                                          top: item.get('top') + '%',
                                          width: data.size === 5 ? '20%' : ''
                                      }}
                                      onClick={() => onToggleTooltip(index)}
                                  >
                                      <span className='bar'></span>
                                      {item.get('toggle') ? (
                                          <div className='thousand'>
                                              <span className='tooltip bt'>
                                                  <strong className='txt'>
                                                      {utils.comma( item.get('stepCount') )}
                                                  </strong>
                                              </span>
                                          </div>
                                      ) : (
                                          ''
                                      )}
                                  </li>
                              ))
                            : ''}
                    </ul>
                    <ol className='time_lst'>
                        {/*week클래스 삭제요청  200220HJ---s*/}
                        {data !== undefined && data.size > 0
                            ? data.map((item, index) => (
                                  <li  key={index}  style={{  width: data.size === 5 ? '20%' : '',  fontSize:  data.size === 5 ? '10px' : ''  }}  >  {dataSplit( item.get('fromDate'), item.get('toDate'), searchType )}
                                  </li>
                              ))
                            : ''}
                    </ol>
                    <div className='value_line average' style={{ top: avgTop + 'px' }} > 
                        <div className='spot'>
                            <span className='tooltip'>
                                <strong className='txt'>
                                    {utils.comma(Math.floor(avgSteps))}
                                </strong>
                            </span>
                        </div>
                    </div>
                    <div className='value_line thousand' style={{ top: thousandTop + 'px' }} >
                        <div className='spot'>
                            <span className='tooltip'>
                                <strong className='txt'>10,000</strong>
                            </span>
                        </div>
                    </div>
                </div>

                {chartType === 'walk_chart month' ||
                chartType === 'walk_chart week' ? (
                    <p className='msg_txt'>
                        평균 걸음은 <b>{utils.comma(Math.floor(avgSteps))}</b>
                        입니다
                    </p>
                ) : (
                    <p className='msg_txt'>
                        총 <b>{maxCnt()}번의 만보를 달성</b>하셨어요{' '}
                    </p>
                )}
            </>
        );
    }
}

export default WalkChart;
