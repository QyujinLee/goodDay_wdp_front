import React, { Component, Fragment } from 'react';

import HealthReportSearchContainer from 'containers/HealthReportSearchContainer';
import HealthReportDetailViewContainer from 'containers/HealthReportDetailViewContainer';

import HealthReportAgeGraph from 'components/HealthReportAgeGraph';

import * as ServiceConstants from 'constants/serviceConstants';

class HealthReportDetail extends Component {

    render() {

        const { livingAge } = this.props; // props data
        const { onHealthReportContentsToggle, onHealthReportAgeGraphView, onHealthReportReduceBodyAge } = this.props; // props event

        // reportDetailLayout 정의
        const reportDetailLayout = [
            {
                'title': '비만 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_OBESITY,
                'contents': [
                    {
                        'subTitle': '키/몸무게',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_HEIGHT, ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WEIGHT]
                    },
                    {
                        'subTitle': '허리둘레',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_WAIST]
                    },
                    {
                        'subTitle': '체질량지수',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_BMI]
                    }
                ]
            },
            {
                'title': '시각 · 청각 검사',
                'contents': [
                    {
                        'subTitle': '시력',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_LEFT_EYE, ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_RIGHT_EYE]
                    },
                    {
                        'subTitle': '청력',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_LEFT_HEARING, ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_RIGHT_HEARING]
                    }
                ]
            },
            {
                'title': '혈압 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_PRESSURE,
                'contents': [
                    {
                        'subTitle': '수축기',
                        'mediExamItmDivCd': [ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC]
                    },
                    {
                        'subTitle': '이완기',
                        'mediExamItmDivCd': [ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC]
                    }
                ]
            },
            {
                'title': '요검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_URINE,
                'contents': [
                    {
                        'subTitle': '요단백',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_PROTEIN]
                    }
                ]
            },
            {
                'title': '빈혈 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_ANEMIA,
                'contents': [
                    {
                        'subTitle': '혈색소',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_HEMOGLOBIN]
                    }
                ]
            },
            {
                'title': '당뇨병 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_DIABETES,
                'contents': [
                    {
                        'subTitle': '공복혈당',
                        'mediExamItmDivCd': [ServiceConstants.PHR_ITM_DIV_CD_BLOOD_SUGAR_BEFORE_MEAL]
                    }
                ]
            },
            {
                'title': '이상지질혈증 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_DYSLIPIDEMIA,
                'contents': [
                    {
                        'subTitle': '총콜레스테롤',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_CHOLESTEROL]
                    },
                    {
                        'subTitle': 'HDL 콜레스테롤',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_HDL]
                    },
                    {
                        'subTitle': '중성지방',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_TRIGLYCERIDE]
                    },
                    {
                        'subTitle': 'LDL 콜레스테롤',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_LDL]
                    }
                ]
            },
            {
                'title': '만성질환 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_CHRONIC_DISEASES,
                'contents': [
                    {
                        'subTitle': '혈청크레아티닌',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_SERUM_CREATININE]
                    },
                    {
                        'subTitle': '신사구체여과율(GFR)',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_GFR]
                    }
                ]
            },
            {
                'title': '간장질환 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_LIVER_DISEASE,
                'contents': [
                    {
                        'subTitle': 'AST(SGOT)',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_AST]
                    },
                    {
                        'subTitle': 'ALT(SGOT)',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_ALT]
                    },
                    {
                        'subTitle': '감마지티피(y-GTP)',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_YGTP]
                    }
                ]
            },
            {
                'title': '영상 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_TUBERCULOSIS,
                'contents': [
                    {
                        'subTitle': '폐결핵 흉부질환',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_TUBERCULOSIS]
                    }
                ]
            },
            {
                'title': '골다공증 검사',
                'goalDissDivCd': ServiceConstants.GOAL_DISS_DIV_CD_BLOOD_OSTEOPOROSIS,
                'contents': [
                    {
                        'subTitle': '골다공증',
                        'mediExamItmDivCd': [ServiceConstants.MEDI_EXAM_ITM_DIV_CD_OSTEOPOROSIS]
                    }
                ]
            }
        ];

        return (
            <Fragment>
                <div className='cont_wrap'>
                    <div className='health_chk_bx'>
                        <HealthReportSearchContainer />
                        <HealthReportAgeGraph
                            livingAge={livingAge}
                            onHealthReportAgeGraphView={onHealthReportAgeGraphView}
                            onHealthReportReduceBodyAge={onHealthReportReduceBodyAge}
                        />
                    </div>
                </div>
                <div className='detail_wrap'>
                    {
                        reportDetailLayout.map((item, index) => {
                            return (
                                <HealthReportDetailViewContainer
                                    key={index}
                                    layout={item}
                                    onHealthReportContentsToggle={onHealthReportContentsToggle}
                                />
                            )
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default HealthReportDetail;