import React, { Component } from 'react';

class HealthReportHeader extends Component {

    render() {

        const { historyCount, headerTab } = this.props; // props data
        const { onHealthReportHeaderTab } = this.props; // props event

        let healthReportHeaderTabArea = null;

        if ('History' === headerTab || 'Detail' === headerTab ) {
            healthReportHeaderTabArea = <a href='#!' className='bt_line ico_graph' onClick={onHealthReportHeaderTab} type={'Trend'}><span> 추이 그래프</span></a>; 
        }
        
        return (
            <header className='header'>
                <div className='title_set'>
                    {'History' !== headerTab ? <a href='/report' className='arrow_lft'><span className='blind'>페이지이동</span></a> : null}
                    {'History' === headerTab ? <h1>총 {historyCount}건의 건강검진 기록</h1> : null}
                    {'Detail' === headerTab ? <h1>검진 상세</h1> : null}
                    {'Trend' === headerTab ? <h1>추이 그래프</h1> : null}
                    <div className='right_btn'>
                        {healthReportHeaderTabArea}
                    </div>
                </div>
            </header>
        );
    }
}

export default HealthReportHeader;