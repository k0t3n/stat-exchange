import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap';
import HighChart from 'react-highcharts/ReactHighstock.src';
import {createChartConfig} from "../utils";
import ChartPagination from "../components/ChartPagination";

class Chart extends Component {
    state = {
        active: 'bittrex'
    }

    shouldComponentUpdate(prevProps, prevState) {
        const { options, title } = this.props;
        const { active } = this.state;
        return ((prevProps.options !== options) ||
                (prevProps.title !== title) ||
                (prevState.active !== active))
    }

    renderPagination() {
        const { active } = this.state;
        const exchanges = ['bittrex', 'binance', 'poloniex'];

        return (
            <ChartPagination
                className="Pagination"
                active={active}
                options={exchanges}
                onClick={this.handleClick}
            />
        )
    }

    componentDidMount() {
        console.log('asdfg');
    }

    handleClick = (name) => {
        this.setState({
            active: name
        })
    }

    render() {
        console.log('rereer');
        const { options, title } = this.props;
        const config = createChartConfig(options, title);

        return (
            <Col
                lg={12}
                md={12}
                sm={12}
            >
                <HighChart config={config} />
                {this.renderPagination()}
            </Col>
        )
    }

}

// todo: Calculate timezone offset

Chart.propTypes = {
    options: PropTypes.array,
    title: PropTypes.string
};

export default Chart;