import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import * as utils from 'lib/utils';


import * as ServiceConstants from 'constants/serviceConstants';

import GradientLineChart from 'components/Chart/GradientLineChart';

class HealthReportTrendViewContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
    }

    /**
     * 이상소견
     * @param data {object}
     * @returns {string}
     */
    getDetailText(data) {

        const detailHtml = data.map((item, index) => {

            if ('' !== item.jugNm &&
                ((ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_PROTEIN === item.mediExamItmDivCd && '음성' !== item.jugNm) ||
                    (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_TUBERCULOSIS === item.mediExamItmDivCd && '정상' !== item.jugNm) ||
                    (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_OSTEOPOROSIS === item.mediExamItmDivCd && '정상' !== item.jugNm))) {
                //요단백, 폐 결핵 흉부질환, 골다공증

                return (
                    <span key={index} className='detail_txt'> {utils.momentDateFormat(item.mediExamDt) + ' ' + item.mediExamItmVal} </span>
                )
            } else {
                return null;
            }
        });

        return detailHtml;
    }

    /**
     * Cycle Chart
     * @param data {object}
     * @returns {string}
     */
    getCycleChart(data) {

        const liHtml = data.map((item, index) => {

            return (
                <li key={index} className={'정상' === item.jugNm || '음성' === item.jugNm || '' === item.jugNm ? '' : 'trouble'}><span>{item.jugNm}</span></li>
            )
        });

        return liHtml;
    }

    /**
     * 검진 날짜
     * @param data {object}
     * @returns {string}
     */
    getDateList(data) {

        const liHtml = data.map((item, index) => {

            return (
                <li key={index}>{utils.momentDateFormat(item.mediExamDt)}</li>
            )
        });

        return liHtml;
    }

    /**
     * Line Chart Data
     * @param data {object}
     * @returns {object}
     */
    setLineChartData(data) {

        const customData = {
            labels: [],
            datasets: []
        };

        const lineData = {
            label: '',
            pointBorderColor: [],
            pointBackgroundColor: [],
            pointHoverBackgroundColor: [],
            pointHoverBorderColor: [],
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointRadius: 7,
            fill: false,
            borderWidth: 16,
            lineTension: 0,
            data: []
        };

        // lineData Set
        const values = [];
        data.forEach(element => {

            // color set
            const chartInfo = utils.getLineChartInfo(element.jugNm);
            lineData.pointBorderColor.push(chartInfo.lineColor);
            lineData.pointBackgroundColor.push(chartInfo.color);
            lineData.pointHoverBackgroundColor.push(chartInfo.color);
            lineData.pointHoverBorderColor.push(chartInfo.color);

            // data labels set
            values.push(utils.numberFixed(element.mediExamItmVal, true));
            customData.labels.push(utils.momentDateFormat(element.mediExamDt));
        });

        lineData.data = values;
        customData.datasets.push(lineData);

        return customData;
    }

    /**
     * Line Chart Option
     * @param data {object}
     * @returns {object}
     */
    setLineChartOption(data, normalScopeFilter) {

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        offset: true,
                        ticks: {
                            fontColor: 'rgba(102, 102, 102, 1)',
                            fontSize: 12,
                            fontFamily: 'NanumSquare'
                        },
                        gridLines: {
                            color: 'rgba(87, 152, 23, 0)',
                            lineWidth: 0,
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false,
                            drawBorder: false
                        }
                    }
                ]
            },
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 0
            },
            animation: {
                duration: 1,
                onComplete: function () {

                    const chartInstance = this.chart;
                    const ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(14, Chart.defaults.global.defaultFontStyle, 'NanumSquare');
                    ctx.fillStyle = 'rgba(74, 74, 74, 1)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';

                    this.data.datasets.forEach(function (dataset, i) {

                        const meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {

                            const data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 30);
                        });
                    });
                }
            },
            annotation: {
                annotations: []
            }
        };

        const values = [];

        // 수치 데이터
        data.forEach(element => {
            values.push(utils.numberFixed(element.mediExamItmVal, true));
        });
        // 범위 데이터
        normalScopeFilter.forEach(element => {
            if (ServiceConstants.REF_NCL_DIV_CD_NORMAL !== element.refNclDivCd) {
                values.push(utils.numberFixed(element.strVal, true));
            }
        });

        const minValue = Math.min.apply(null, values);
        const maxValue = Math.max.apply(null, values);
        const gapValue = (maxValue - minValue) / 2;
        //const stepValue = Math.floor((maxValue - minValue) / data.length);

        //ticks min, max, stepSize set
        options.scales.yAxes[0].ticks.min = minValue - gapValue;
        options.scales.yAxes[0].ticks.max = maxValue + gapValue;
        //options.scales.yAxes[0].ticks.stepSize = stepValue;

        const horizontal = normalScopeFilter.map(item => {

            if (ServiceConstants.REF_NCL_DIV_CD_NORMAL !== item.refNclDivCd) {

                return {
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: Number(item.strVal),
                    borderColor: utils.getLineChartInfo(item.jugNm).color,
                    borderWidth: 1,
                    borderDash: [6, 6],
                    label: {
                        yAdjust: -10,
                        backgroundColor: 'rgba(0,0,0,0)',
                        fontColor: utils.getLineChartInfo(item.jugNm).color,
                        content: item.jugNm,
                        position: 'left',
                        enabled: true
                    }
                }
            } else {
                return {};
            }
        })

        options.annotation.annotations = horizontal;

        return options;
    }

    render() {

        const { examination, normalScope } = this.props; // props data
        const { onHealthReportContentsToggle } = this.props; // prps event

        return (
            0 < examination.length ? examination.map((item, index) => {

                const itemValue = 0 !== item.data.length ? item.data[0].data[0] : '';

                return (

                    <div key={index} className={'toggle_conts open' + utils.getToggleFocusClass(item.goalDissDivCd)} onClick={onHealthReportContentsToggle}>
                        <div className='title_set'>
                            <h3>{item.goalDissDivCdNm}</h3>
                            {
                                0 !== item.data.length && '' !== itemValue.jugNm ? (
                                    <a href='#!' className='btn_tg'>
                                        <span className='blind'>토글버튼</span>
                                    </a>
                                ) : null
                            }

                        </div>
                        <div className='tg_conts'>
                            {
                                item.data.map((innerItem, index) => {

                                    let normalScopeFilter = [];
                                    normalScopeFilter = normalScope.filter(filterItem => {
                                        return filterItem.mediExamItmDivCd === innerItem.mediExamItmDivCd;
                                    });

                                    const length = innerItem.data.length;
                                    let gapSize = 0;
                                    let year = '';

                                    if (1 < length) {

                                        gapSize = utils.numberFixed(innerItem.data[length - 1].mediExamItmVal - innerItem.data[0].mediExamItmVal, true);
                                        year = utils.momentDateFormat(innerItem.data[0].mediExamDt.substring(0, 6)) + ' 기준  ' + utils.momentDateFormat(innerItem.data[length - 1].mediExamDt.substring(0, 6)) + ' 결과';
                                    }

                                    return (
                                        '' !== innerItem.data[0].jugNm ? (
                                            <div key={index} className='graph_bx'>
                                                <div className='standard'>
                                                    <span className='txt'>{innerItem.mediExamItmDivCdNm} {undefined !== innerItem.unitDivCd ? '(' + innerItem.unitDivCdNm + ')' : null}</span>
                                                </div>
                                                <div className='result_set'>

                                                    {
                                                        ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_LEFT_HEARING === innerItem.mediExamItmDivCd ||
                                                            ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_RIGHT_HEARING === innerItem.mediExamItmDivCd ||
                                                            ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_PROTEIN === innerItem.mediExamItmDivCd ||
                                                            ServiceConstants.MEDI_EXAM_ITM_DIV_CD_TUBERCULOSIS === innerItem.mediExamItmDivCd  ? (
                                                                <Fragment>
                                                                    {this.getDetailText(innerItem.data)}
                                                                    <ul className={'cir_chart type' + length}>
                                                                        {this.getCycleChart(innerItem.data)}
                                                                    </ul>
                                                                    <ol className={'year_lst type' + length}>
                                                                        {this.getDateList(innerItem.data)}
                                                                    </ol>
                                                                </Fragment>

                                                            ) : (

                                                                <Fragment>
                                                                    {
                                                                        1 < length ? (
                                                                            <strong className='num'>
                                                                                <span>{gapSize} {innerItem.unitDivCdNm}</span>
                                                                                <em className={utils.getTrendValueClass(gapSize).calculation}>{utils.getTrendValueClass(gapSize).direction}</em>
                                                                            </strong>
                                                                        ) : null
                                                                    }
                                                                    <span className='detail_txt'>
                                                                        {1 < length ? year : ''}
                                                                    </span>
                                                                    <div className='line_chart'>
                                                                        <div className='chart' style={{ width: utils.getLineChartWidth(innerItem.data.length) + 'px' }}>
                                                                            <GradientLineChart
                                                                                lineData={this.setLineChartData(innerItem.data)}
                                                                                options={this.setLineChartOption(innerItem.data, normalScopeFilter)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </Fragment>

                                                            )
                                                    }
                                                </div>
                                            </div>
                                        ) : null
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }) : null
        );
    }
}

export default connect(
    (state) => ({
        normalScope: state.reportCommon.get('normalScope')
    }),
    (dispatch) => ({

    })
)(HealthReportTrendViewContainer);