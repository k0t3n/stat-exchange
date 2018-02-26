import React from 'react';
import { createChartConfig } from "../utils";
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap';
import HighChart from 'react-highcharts/ReactHighstock.src';

const Chart = ({ options, title }) => {
    const newOptions = options.map(pair => pair.stats);
    const config = createChartConfig(newOptions, title);
    // console.log(options);

    return (
        <Col
            lg={12}
            md={12}
            sm={12}
        >
            <HighChart config={config} />
        </Col>
    )
};

Chart.propTypes = {
    options: PropTypes.array,
    title: PropTypes.string
};

export default Chart;