import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import * as utils from 'lib/utils';

import * as ServiceConstants from 'constants/serviceConstants';

import GradientLineChart from 'components/Chart/GradientLineChart';

class BodyAgeTrendViewContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
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
            values.push(utils.numberFixed(element.calLbdyAge, true));
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
            
            if (undefined === element.calLbdyAge || '' === element.calLbdyAge) {
                values.push(utils.numberFixed(0, true));
            } else {
                values.push(utils.numberFixed(undefined !== element.calLbdyAge ? element.calLbdyAge : element.bmi, true));
            }

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
        const itemValue = examination.data;

        return (

            <>
                {
                    undefined !== itemValue ? (
                        <div className={'toggle_conts open'}>
                            <div className='title_set'>
                                <h3>{examination.goalDissDivCdNm}</h3>
                            </div>

                            <div className='tg_conts open'>
                                {
                                    itemValue.map((innerItem, index) => {

                                        let normalScopeFilter = [];
                                        normalScopeFilter = normalScope.filter(filterItem => {
                                            return filterItem.mediExamItmDivCd === innerItem.mediExamItmDivCd;
                                        });

                                        const length = innerItem.data.length;

                                        let gapSize = 0;
                                        let year = '';


                                        if (1 < length) {
                                            if (ServiceConstants.MEDI_EXAM_ITM_DIV_CD_URINE_BMI === innerItem.mediExamItmDivCd) { //체질량 지수
                                                gapSize = utils.numberFixed(innerItem.data[length - 1].bmi - innerItem.data[0].bmi, true);
                                            } else {
                                                gapSize = utils.numberFixed(innerItem.data[length - 1].calLbdyAge - innerItem.data[0].calLbdyAge, true);
                                            }

                                            year = utils.momentDateFormat(innerItem.data[0].mediExamDt.substring(0, 7)) + ' 기준  ' + utils.momentDateFormat(innerItem.data[length - 1].mediExamDt.substring(0, 7)) + ' 결과';
                                        }
                                      
                                        return (
                                            <div key={index}>
                                                {
                                                    'CUSTOM_RANK' !== innerItem.mediExamItmDivCd &&
                                                        'CUSTOM_WHR' !== innerItem.mediExamItmDivCd &&
                                                        ServiceConstants.MEDI_EXAM_ITM_DIV_CD_HIP  !== innerItem.mediExamItmDivCd ? (


                                                            <div key={index} className='graph_bx'>
                                                                <div className='standard'>
                                                                    <span className='txt'>{innerItem.mediExamItmDivCdNm} {undefined !== innerItem.unitDivCd ? '(' + innerItem.unitDivCdNm + ')' : null}</span>
                                                                </div>
                                                                <div className='result_set'>

                                                                    <Fragment>
                                                                        {
                                                                            1 < length ? (
                                                                                <strong className='num'>
                                                                                    <span>{'NaN'!== gapSize?gapSize:''} {'NaN'!== gapSize?innerItem.unitDivCdNm:''}</span>
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

                                                                </div>
                                                            </div>
                                                        ) : null
                                                }
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    ) : null
                }
            </>
        );
    }
}

export default connect(
    (state) => ({
        normalScope: state.reportCommon.get('normalScope')
    }),
    (dispatch) => ({

    })
)(BodyAgeTrendViewContainer);