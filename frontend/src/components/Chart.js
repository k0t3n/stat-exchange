import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import HighChart from 'react-highcharts/ReactHighstock.src';

let options = [{
    name: 'BTC/RUB',
    data: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98]]
}, {
    name: 'SHIT/FUCK',
    data: [[1220832000000, 12.56], [1220918400000, 24.67], [1221004800000, 15.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98]]
}, {
    name: 'SUCK/BLOOD',
    data: [[1220832000000, 10.56], [1220918400000, 3.67], [1221004800000, 5.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98]]
}];

class Chart extends Component {
    render() {
        const config = {
            rangeSelector: {
                selected: 4
            },
            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            plotOptions: {
                series: {
                    compare: 'percent',
                    showInNavigator: true
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2,
                split: true
            },
            title: {
                text: 'AAPL Stock Price'
            },
            series: options // from redux
        };

        return (
            <Col
                lg={9}
                md={9}
                sm={9}
            >
                <HighChart config={config} />
            </Col>
        )

    }
}

export default Chart;