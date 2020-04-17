import React, { Component, Fragment } from 'react';
import { Chart } from 'react-chartjs-2';

import * as utils from 'lib/utils';

import LineChart from 'components/Chart/LineChart';

class BodyAgeTrendAgeContainer extends Component {

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
            const chartInfo = utils.getLineChartInfo(element.jugNm);
            lineData.borderColor.push(chartInfo.lineColor);
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
            }
        };

        const values = [];
        // 수치 데이터
        data.forEach(element => {
            values.push(utils.numberFixed(element.calLbdyAge, true));
        });

        const minValue = Math.min.apply(null, values);
        const maxValue = Math.max.apply(null, values);
        const gapValue = (maxValue - minValue) / 2;
        //const stepValue = Math.floor((maxValue - minValue) / data.length);

        //ticks min, max, stepSize set
        options.scales.yAxes[0].ticks.min = minValue - gapValue;
        options.scales.yAxes[0].ticks.max = maxValue + gapValue;
        //options.scales.yAxes[0].ticks.stepSize = stepValue;

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

                                const length = item.data.length;
                                let gapAge = 0;
                                let gapBodyAge = 0;

                                if (1 < length) {
                                    gapAge = utils.numberFixed(item.data[length - 1].calLbdyAge - item.data[0].calLbdyAge, true);
                                    gapBodyAge = utils.numberFixed(utils.TrendgapDate(item.data[0].calLbdyAge, item.data[0].lbdyAge, item.data[length - 1].calLbdyAge, item.data[length - 1].lbdyAge), true);
                                }

                                return (
                                    <div key={index} className='graph_bx'>
                                        <div className='standard'><span className='txt'>{item.mediExamItmDivCdNm}</span></div>
                                        <div className='result_set'>
                                            {
                                                1 < length ? (
                                                    <Fragment>
                                                        <strong className="age_txt">
                                                            <span className="txt">실제 나이</span>
                                                            <span className={utils.getTrendValueClass(gapBodyAge).age}> {utils.numberFixed(gapBodyAge, true)}세</span>
                                                            <em className={utils.getTrendValueClass(gapBodyAge).calculation}>{utils.getTrendValueClass(gapBodyAge).direction}</em>
                                                        </strong>
                                                        <strong className="age_txt">
                                                            <span className="txt">{item.mediExamItmDivCdNm}</span>
                                                            <span className={utils.getTrendValueClass(gapAge).age}> {gapAge}세</span>
                                                            <em className={utils.getTrendValueClass(gapAge).calculation}>{utils.getTrendValueClass(gapAge).direction}</em>
                                                        </strong>
                                                    </Fragment>
                                                ) : null
                                            }
                                            <div className='line_chart'>
                                                <div className='chart' style={{ width: utils.getLineChartWidth(item.data.length) + 'px' }}>
                                                    <LineChart
                                                        data={this.setLineChartData(item.data)}
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

export default BodyAgeTrendAgeContainer;