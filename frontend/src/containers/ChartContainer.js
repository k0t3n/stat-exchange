import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from "../actions/data";
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap';
import Chart from '../components/Chart';

class ChartContainer extends Component {
    componentDidMount() {
        const { token } = this.props;

        fetchData(token);
    }

    render() {
        const { pairsOnChart, title } = this.props;

        return (
            <Col
                lg={12}
                md={12}
                sm={12}
            >
                <Chart options={pairsOnChart} title={title} />
            </Col>
        )
    }

}

// todo: Calculate timezone offset

Chart.propTypes = {
    options: PropTypes.array,
    title: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        pairsOnChart: state.chart.pairsOnChart
    }
};

export default connect(mapStateToProps)(ChartContainer);