import React, { Component, Fragment } from 'react';

class ActivityBloodSugar extends Component {
    render() {

        const { bloodSugarBeforeMeal, bloodSugarAfterMeal, latestDateBloodSugarBeforeMeal, latestDateBloodSugarAfterMeal, statusClassName } = this.props;

        let activityBloodSugarArea = null;

        if('' === bloodSugarBeforeMeal && '' === bloodSugarAfterMeal) {

            activityBloodSugarArea = (
                <li>
                    <dl className='codition_info'>
                        <dt className='title'>
                            <span className='tit'>혈당</span>
                            <span className='date'></span>
                        </dt>
                        <dd className='no_data'>
                            <p>자가혈당 측정이 얼마나 중요하게요</p>
                        </dd>
                    </dl>
                </li>
            );

        } else {

            activityBloodSugarArea = (
                <li>
                    <dl className='codition_info'>
                    <dt className='title'>
                        <span className='tit'>혈당</span>
                        <span className='date'>
                            {latestDateBloodSugarBeforeMeal >= latestDateBloodSugarAfterMeal ? latestDateBloodSugarBeforeMeal : latestDateBloodSugarAfterMeal}
                        </span>
                    </dt>
                    {/* 기본 : 정상상태,경미: caution, 심각:danger */}
                    <dd className={statusClassName}>
                        <span className='img_info'></span>
                        {
                            latestDateBloodSugarBeforeMeal >= latestDateBloodSugarAfterMeal ?
                            (
                                <span className='num'>{bloodSugarBeforeMeal}<em>mmHg</em>
                                    <b className='cmmt'>공복</b>
                                </span>
                            ):(
                                <span className='num'>{bloodSugarAfterMeal}<em>mmHg</em>
                                    <b className='cmmt'>식후</b>
                                </span>
                            )
                        }
                    </dd>
                    </dl>
                </li>
            );

        }

        return (
            <Fragment>
                {activityBloodSugarArea}
            </Fragment>
        );
    }
}

export default ActivityBloodSugar;