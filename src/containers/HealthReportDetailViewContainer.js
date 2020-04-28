import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import HealthReportDetailView from 'components/HealthReportDetailView';

import * as healthReportContentsActions from 'modules/healthReportContents';

const message = [
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_HDL
        , topic: '<span class="sub">좋은 콜레스테롤</span><span class="main">HDL</span>'
        , desc: '<p><b>나쁜 콜레스테롤을 수거해서<br /></b> 동맥경화를 방지해줍니다.<span class="spacing">수치가 높을수록좋습니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_ALT
        , topic: '<span class="sub">중요한 간 효소</span><span class="main">ALT</span>'
        , desc: '<p><b>간세포 속 중요한 효소</b><br />간세포가 파괴되면<span class="spacing">수치가 높아 질 수 있습니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_AST
        , topic: '<span class="sub">간에 가장 많은 효소</span><span class="main">AST</span>'
        , desc: '<p><b>간에 가장 많이 있는 효소</b><br />간세포에 이상이 생기면<span class="spacing">수치가 높아 질 수 있습니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_YGTP
        , topic: '<span class="sub">간의 효소중 하나</span><span class="main small">감마지티피</span>'
        , desc: '<p><b>간에 문제가 생기게 되면<br /> 수치가 높아질 수 있습니다.</b><span class="spacing">특히 음주에 영향을 많이 받습니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_SERUM_CREATININE
        , topic: '<span class="sub">혈액 내 노폐물 농도</span><span class="main small">크레아티닌</span>'
        , desc: '<p><b>혈액 내의<br /> 화학적 노폐물 농도를 의미</b><span class="spacing">수치가 높을 수록 이상을 의심할 수 있습니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_SYSTOLIC
        , topic: '<span class="sub">혈압</span><span class="main">수축기</span>'
        , desc: '<p>심장이 수축하여 혈관의 압력이<span class="spacing"><b>제일 높을 때의 혈압입니다.</b></span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.PHR_ITM_DIV_CD_BLOOD_PRESSURE_DIASTOLIC
        , topic: '<span class="sub">혈압</span><span class="main">이완기</span>'
        , desc: '<p>심장이 이완하여 혈관의 압력이<span class="spacing"><b>제일 낮을 때의 혈압입니다.</b></span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_LDL
        , topic: '<span class="sub">나쁜 콜레스테롤</span><span class="main">LDL</span>'
        , desc: '<p><b>많으면 곤란한 콜레스테롤입니다.</b><span class="spacing">수치가 높으면 동맥경화나<br /> 뇌졸중 등의 주요 원인이 됩니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_PROTEIN
        , topic: '<span class="sub">신장기능 검사</span><span class="main">단백뇨</span>'
        , desc: '<p><b>소변으로 단백질이<br /> 기준치 이상 배출되는 현상</b><span class="spacing">신장 기능이 저하된 경우 "양성"표시 됩니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_TUBERCULOSIS
        , topic: '<span class="sub">흉부 X-ray</span><span class="main small">폐결핵 검사</span>'
        , desc: '<p><b>폐와 심장 계통 질환 여부를</b><span class="spacing">X-ray 영상촬영을 통해<br /> 판단하는 검사</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_GFR
        , topic: '<span class="sub">신장의 건강지표</span><span class="main">여과율</span>'
        , desc: '<p><b>신장에서 혈액을 걸러내는 능력</b><span class="spacing">수치가 높을 수록 건강한 신장입니다.</span></p>'
    },
    {
        mediExamItmDivCd: ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_HEMOGLOBIN
        , topic: '<span class="sub">빈혈의 지표</span><span class="main">혈색소</span>'
        , desc: '<p><b>혈액 속 헤모글로빈 수치</b><span class="spacing">수치가 낮을수록 <br />빈혈을 주의해야합니다.</span></p>'
    }
];

class HealthReportDetailViewContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
    }

    /**
     * 건강검진 레포트 추이 화면이동
     * @param e
     * @returns {void}
     */
    handleHealthReportMoveTrend = (e) => {

        const { HealthReportContentsActions } = this.props;

        // 헤더 Redux set
        HealthReportContentsActions.setHealthReportHeaderTab({
            headerTab: 'Trend'
        });
    }

    render() {

        const { layout, normalScope, detail, selectDate } = this.props; // props data
        const { onHealthReportContentsToggle } = this.props; // props event

        const dateLength = selectDate.length;
        const diffYear = utils.yearDiff(selectDate[dateLength - 1].mediExamDt, selectDate[0].mediExamDt, 'year') + 1;

        return (
            <ul className={'detail_set' + utils.getToggleFocusClass(layout.goalDissDivCd)}>
                <li className='tit'>
                    <h2>{layout.title}</h2>
                </li>
                {
                    layout.contents.map((item, index) => {

                        let normalScopeFilter = [];
                        let examinationFilter = [];
                        let messageFilter = [];
                        const length = item.mediExamItmDivCd.length;

                        if (1 === length) {

                            // layout contents 항목이 1개일때
                            normalScopeFilter = normalScope.filter(filterItem => {
                                return filterItem.mediExamItmDivCd === item.mediExamItmDivCd[0];
                            });
                            examinationFilter = detail.get('examination').filter(filterItem => {
                                return filterItem.mediExamItmDivCd === item.mediExamItmDivCd[0];
                            });
                            messageFilter = message.filter(filterItem => {
                                return filterItem.mediExamItmDivCd === item.mediExamItmDivCd[0];
                            });

                        } else if (2 === length) {

                            // layout contents 항목이 2개일때
                            examinationFilter = detail.get('examination').filter(innerItem => {
                                return innerItem.mediExamItmDivCd === item.mediExamItmDivCd[0] || innerItem.mediExamItmDivCd === item.mediExamItmDivCd[1];
                            });

                        }

                        return (
                            <HealthReportDetailView
                                key={index}
                                contents={item}
                                bodyAverage={detail.get('bodyAverage')}
                                normalScope={normalScopeFilter}
                                examination={examinationFilter}
                                message={messageFilter}
                                diffYear={diffYear}
                                onHealthReportContentsToggle={onHealthReportContentsToggle}
                                onHealthReportMoveTrend={this.handleHealthReportMoveTrend}
                            />
                        )
                    })
                }
            </ul>
        );
    }
}

export default connect(
    (state) => ({
        normalScope: state.reportCommon.get('normalScope'),
        detail: state.healthReportContents.get('detail'),
        selectDate: state.healthReportContents.get('detail').get('selectDate')
    }),
    (dispatch) => ({
        HealthReportContentsActions: bindActionCreators(healthReportContentsActions, dispatch)
    })
)(HealthReportDetailViewContainer);