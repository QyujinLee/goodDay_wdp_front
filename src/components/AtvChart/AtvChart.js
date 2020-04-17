import React, { Component } from 'react';

class AtvChart extends Component {
    render() {
        //{time : 7, step:100}

        const { atvData } = this.props;
        
        function tempstyle(time) {
            return Math.floor((time / 24) * 100);
        }

        function cirstyle(step) {
            const stepNum = Number(step);
            if( stepNum <= 100){
                return '';
            } else if(stepNum <= 500){
                return 'cir_atv step01';
            } else if (stepNum <= 1000){
                return 'cir_atv step02';
            } else {
                return 'cir_atv step03';
            }
        }

        return (
            <>
                <ul className='atv_chart'>
                    {' '}
                    {/*week클래스를 추가해주시면 주 그래프로 표현됩니다. (opacity값 조정)*/}
                    {atvData !== undefined && atvData.length > 0
                        ? atvData.map((item, index) => (
                              <li
                                  key={index}
                                  className={cirstyle(item.stpCnt)}
                                  style={{ left: +tempstyle(item.fromDate) + '%' }}
                              ></li>
                          ))
                        : ''}
                    {/* bar_wrap 클래스를 가진 li를 삭제해주세요 200219HJ---*/}
                </ul>
                <ol className='time_lst'>
                    <li>3시</li>
                    <li>6시</li>
                    <li>9시</li>
                    <li>12시</li>
                    <li>15시</li>
                    <li>18시</li>
                    <li>21시</li>
                </ol>
                <p className='msg_txt'>
                    원이 크면 많이, 원이 진하면
                    <br /> 자주 걸었다는 의미입니다.
                </p>
            </>
        );
    }
}

export default AtvChart;
