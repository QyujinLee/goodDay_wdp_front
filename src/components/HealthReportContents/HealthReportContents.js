import React, { Component } from 'react';

import HealthReportHistoryContainer from 'containers/HealthReportHistoryContainer';
import HealthReportDetailContainer from 'containers/HealthReportDetailContainer';
import HealthReportTrendContainer from 'containers/HealthReportTrendContainer';

class HealthReportContents extends Component {

    render() {

        const { headerTab } = this.props; // props data
        const { onHealthReportContentsToggle } = this.props; // props event

        let healthReportContentsArea = null;

        if ('History' === headerTab) {

            healthReportContentsArea = <HealthReportHistoryContainer />;

        } else if ('Detail' === headerTab) {

            healthReportContentsArea = (
                <HealthReportDetailContainer
                    onHealthReportContentsToggle={onHealthReportContentsToggle}
                />
            );

        } else if ('Trend' === headerTab) {

            healthReportContentsArea = (
                <HealthReportTrendContainer
                    onHealthReportContentsToggle={onHealthReportContentsToggle}
                />
            );
        }

        return (
            <div className='contents'>
                {healthReportContentsArea}
            </div>
        );
    }
}

export default HealthReportContents;