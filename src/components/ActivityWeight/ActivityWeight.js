import React, { Component, Fragment } from 'react';

class ActivityWeight extends Component {

    render() {

        const { weight, latestDateWeight } = this.props;

        let activityWeightArea = null;

        if('' === weight) {

            activityWeightArea = (
                <li>
                    <dl className='codition_info'>
                        <dt className='title'>
                            <span className='tit'>몸무게</span>
                            <span className='date'></span>
                        </dt>
                        <dd className='no_data'>
                            <p>체중계 눈금은 거짓말을 안 해요</p>
                        </dd>
                    </dl>
                </li>
            );

        } else {

            activityWeightArea = (
                <li>
                    <dl className='codition_info'>
                        <dt className='title'>
                            <span className='tit'>몸무게</span>
                            <span className='date'>{latestDateWeight}</span>
                        </dt>
                        { /* 체중: 정상기본, 비만: obesity, 저체중: less */}
                        <dd className={ weight >= 90 ? 'my_info weight obesity'
                                    : weight <= 50 ? 'my_info weight less'
                                        : 'my_info weight' }>
                            <span className='img_info'></span>
                            <span className='num'>{weight}<em> kg</em></span>
                        </dd>
                    </dl>
                </li>
            );

        }

        return (
            <Fragment>
                {activityWeightArea}
            </Fragment>
        );
    }
}

export default ActivityWeight;