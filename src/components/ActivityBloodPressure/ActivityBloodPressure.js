import React, { Component, Fragment } from 'react';

class ActivityBloodPressure extends Component {

    render() {

        const { bloodPressureSystolic, bloodPressureDiastolic, latestDateBloodPressure, statusClassName } = this.props;

        let activityBloodPressureArea = null;

        if('' === bloodPressureSystolic || '' === bloodPressureDiastolic) {

            activityBloodPressureArea = (
                <li>
                    <dl className='codition_info'>
                        <dt className='title'>
                            <span className='tit'>혈압</span>
                            <span className='date'></span>
                        </dt>
                        <dd className='no_data'>
                            <p>가정혈압 측정이 얼마나 중요하게요</p>
                        </dd>
                    </dl>
                </li>
            );

        } else {

            activityBloodPressureArea = (
                <li>
                    <dl className='codition_info'>
                    <dt className='title'>
                        <span className='tit'>혈압</span>
                        <span className='date'>{latestDateBloodPressure}</span>
                    </dt>
                    {/* 기본 : 정상상태,경미: caution, 심각:danger */}
                    <dd className={statusClassName}>
                        <span className='img_info'></span>
                        <span className='num'>{bloodPressureSystolic}/{bloodPressureDiastolic}<b>mmHg</b></span>
                    </dd>
                    </dl>
                </li>
            );

        }

        return (
            <Fragment>
                {activityBloodPressureArea}
            </Fragment>
        );
    }
}

export default ActivityBloodPressure;