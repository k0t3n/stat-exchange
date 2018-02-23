import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Chart.css';

import { Col, Pagination } from 'react-bootstrap';
import HighChart from 'react-highcharts/ReactHighstock.src';
import {createChartConfig} from "../utils";

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
            <div className="Pagination">
                <Pagination>
                    {exchanges.map(exchange => (
                        <Pagination.Item
                            key={exchange}
                            active={exchange === active}
                            onClick={() => this.handleClick(exchange)}
                        >{exchange}</Pagination.Item>
                    ))}
                </Pagination>
            </div>
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