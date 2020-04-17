import React, { Component } from 'react';

import * as utils from 'lib/utils';

import LineChart from 'components/Chart/LineChart';

class GradientLineChart extends Component {

    render() {

        const { lineData, options } = this.props;
        
        const data = (canvas) => {

            const ctx = canvas.getContext("2d");
            const width = utils.getLineChartWidth(lineData.labels.length);
            const gradientStroke = ctx.createLinearGradient(0, 0, width, 0);

            const lineColor = lineData.datasets[0].pointBorderColor;
            const lineColorLength = lineColor.length;

            // gradient set
            lineColor.forEach((element, index) => {

                if (lineColorLength === index + 1) {
                    return;
                } else {

                    const interval = 1 / (lineColorLength - 1);
                    let offSet = interval * index + 0.05;
                    let nextOffSet = interval * (index + 1);

                    if (1 < offSet) {
                        offSet = 1;
                    }

                    if (1 < nextOffSet) {
                        nextOffSet = 1;
                    }

                    gradientStroke.addColorStop(offSet, lineColor[index + 1]);
                    gradientStroke.addColorStop(nextOffSet, lineColor[index + 1]);
                }
            });

            lineData.datasets[0].borderColor = gradientStroke;

            return lineData;
        };
        
        return (
            <LineChart data={data} options={options} />
        );
    }
}

export default GradientLineChart;