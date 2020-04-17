import React, { Component, Fragment } from 'react';

import BodyAgeSearchContainer from 'containers/BodyAgeSearchContainer';
import BodyAgeTrendAgeContainer from 'containers/BodyAgeTrendAgeContainer';
import BodyAgeTrendViewContainer from 'containers/BodyAgeTrendViewContainer';

class BodyAgeTrend extends Component {

    render() {

        const { livingAge, examination } = this.props; // props data
        const { onHealthReportContentsToggle } = this.props; // props event

        return (
            <Fragment>
                <div className='cont_wrap'>
                    <div className='health_chk_bx'>
                        <BodyAgeSearchContainer />
                        <BodyAgeTrendAgeContainer livingAge={livingAge} />
                    </div>
                </div>
                <BodyAgeTrendViewContainer
                    examination={examination}
                    onHealthReportContentsToggle={onHealthReportContentsToggle}
                />
            </Fragment>
        );
    }
}

export default BodyAgeTrend;