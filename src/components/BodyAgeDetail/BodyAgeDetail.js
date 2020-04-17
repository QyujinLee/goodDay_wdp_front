import React, { Component, Fragment } from 'react';

import BodyAgeDetailViewContainer from 'containers/BodyAgeDetailViewContainer';
import BodyAgeSearchContainer from 'containers/BodyAgeSearchContainer';

import BodyAgeGraph from 'components/BodyAgeGraph';
import BodyAgeDetailCompare from 'components/BodyAgeDetailCompare';

import * as ServiceConstants from 'constants/serviceConstants';

class BodyAgeDetail extends Component {

    render() {

        const { livingAgeData, examinationData } = this.props;
        const { onBodyAgeToggle } = this.props;

        //bodyAgeDetailLayout 정의 
        const bodyAgeDetailLayout = [
            {
                'title': '비만 검사',
                'contents': [
                    {
                        'subTitle': '키/몸무게',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_HEIGHT , ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WEIGHT]
                    },
                    {
                        'subTitle': '체질량지수',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_BMI]
                    },
                    {
                        'subTitle': '허리둘레',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WAIST]
                    },
                    {
                        'subTitle': '엉덩이둘레',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_HIP]
                    },
                    {
                        'subTitle': '허리엉덩이둘레비',
                        'mediExamItmDivCd': ['CUSTOM_WHR']
                    },
                ]
            },
        ];
        return (
            <Fragment>
                <div className='contents'>
                    <div className='cont_wrap'>
                        <div className='health_chk_bx'>
                            <BodyAgeSearchContainer
                                examinationData={examinationData}
                                onBodyAgeToggle={onBodyAgeToggle}
                            />
                            <BodyAgeGraph
                                livingAgeData={livingAgeData}
                            />
                        </div>
                    </div>
                    <BodyAgeDetailCompare
                        livingAgeData={livingAgeData}
                        examinationData={examinationData}
                        onBodyAgeToggle={onBodyAgeToggle}
                    />
                    <div className='detail_wrap'>
                        <BodyAgeDetailViewContainer
                            layout={bodyAgeDetailLayout}
                            examinationData={examinationData}
                            onBodyAgeToggle={onBodyAgeToggle}
                        />
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default BodyAgeDetail;