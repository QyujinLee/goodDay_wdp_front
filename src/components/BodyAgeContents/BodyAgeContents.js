import React, { Component } from 'react';
import queryString from 'query-string';

import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import BodyAgeDetailContainer from 'containers/BodyAgeDetailContainer';
import BodyAgeTrendContainer from 'containers/BodyAgeTrendContainer';

class BodyAgeContents extends Component {

    componentDidMount() {

        const query = queryString.parse(window.location.search);

        if ('true' === query.pointPayment) {
            // 비만생체나이 등록 처리후 이동된 경우
            // 포인트 지급 처리
            utils.pointPayment('2', ServiceConstants.RWD_MGMT_ID_BODY_AGE);
        }
    }

    render() {

        const { headerTab } = this.props;
        const { onBodyAgeToggle } = this.props;

        let bodyAgeContentsArea = null;

        if ('Detail' === headerTab) {

            bodyAgeContentsArea = (
                <BodyAgeDetailContainer
                    onBodyAgeToggle={onBodyAgeToggle} />
            );

        } else if ('Trend' === headerTab) {

            bodyAgeContentsArea = (
                <BodyAgeTrendContainer
                    onBodyAgeToggle={onBodyAgeToggle} />
            );

        }

        return (
            <div className='contents'>
                {bodyAgeContentsArea}
            </div>
        );
    }
}

export default BodyAgeContents;