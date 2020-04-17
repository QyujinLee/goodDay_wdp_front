import React, { Component, Fragment } from 'react';

import HealthReportSearchContainer from 'containers/HealthReportSearchContainer';
import HealthReportTrendAgeContainer from 'containers/HealthReportTrendAgeContainer';
import HealthReportTrendViewContainer from 'containers/HealthReportTrendViewContainer';

class HealthReportTrend extends Component {

    render() {

        const { livingAge, examination } = this.props; // props data
        const { onHealthReportContentsToggle } = this.props; // props event

        return (
            <Fragment>
                <div className='cont_wrap'>
                    <div className='health_chk_bx'>
                        <HealthReportSearchContainer />
                        <HealthReportTrendAgeContainer livingAge={livingAge} />
                    </div>
                </div>
                <HealthReportTrendViewContainer
                    examination={examination}
                    onHealthReportContentsToggle={onHealthReportContentsToggle}
                />
            </Fragment>
        );
    }
}

export default HealthReportTrend;