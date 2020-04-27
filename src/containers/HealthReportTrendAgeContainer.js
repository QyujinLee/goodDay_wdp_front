import React, { Component } from 'react';
import { Chart } from 'react-chartjs-2';

import * as utils from 'lib/utils';

import GradientLineChart from 'components/Chart/GradientLineChart';

class HealthReportTrendAgeContainer extends Component {

    componentDidMount() {

        utils.extApp('04');
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
            borderColor: [],
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
            const chartInfo = utils.getLineChartInfo(Number(element.lbdyAge) <= 0 ? '정상': '주의');
            lineData.borderColor.push(chartInfo.lineColor);
            lineData.pointBorderColor.push(chartInfo.lineColor);
            lineData.pointBackgroundColor.push(chartInfo.color);
            lineData.pointHoverBackgroundColor.push(chartInfo.color);
            lineData.pointHoverBorderColor.push(chartInfo.color);

            // data labels set
            values.push(utils.numberFixed(element.lbdyAge, true));
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
    setLineChartOption(data) {

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

        // 차트 Y축 min, max 범위 계산
        const values = data.map(o => Number(o.lbdyAge));
        const negativeMinValueOrZero = Math.min(...values, 0);
        const positiveMaxValueOrZero = Math.max(...values, 0);
        const adjustment = (positiveMaxValueOrZero - negativeMinValueOrZero) / 2;
        
        // 차트 Y축 min, max 범위 설정
        options.scales.yAxes[0].ticks.min = negativeMinValueOrZero - adjustment;
        options.scales.yAxes[0].ticks.max = positiveMaxValueOrZero + adjustment;

        // 차트 횡방향 기준선
        options.annotation.annotations = [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 0,
                borderColor: 'rgb(192, 192, 192)',
                borderWidth: 1,
                borderDash: [6, 6],
                label: {
                    yAdjust: -10,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    fontColor: 'rgba(192, 192, 192)',
                    content: '실제나이',
                    position: 'left',
                    enabled: true
                }
        }];

        return options;
    }

    render() {

        const { livingAge } = this.props;

        return (
            <div className='health_age_graph'>
                <div className='toggle_conts'>
                    <div className='title_set'>
                        <h3>생체 나이</h3>
                    </div>
                    <div>
                        {
                            0 < livingAge.length ? livingAge.map((item, index) => {

                                return (
                                    <div key={index} className='graph_bx'>
                                        <div className='standard'><span className='txt'>{item.lbdyAgeDivCdNm}</span></div>
                                        <div className='result_set'>
                                            <div className='line_chart'>
                                                <div className='chart' style={{ width: utils.getLineChartWidth(item.data.length) + 'px' }}>
                                                    <GradientLineChart
                                                        lineData={this.setLineChartData(item.data)}
                                                        options={this.setLineChartOption(item.data)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default HealthReportTrendAgeContainer;