import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { deleteFromChart } from "../actions/chart";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import ColHeader from "../components/ColHeader";

class ListOfLines extends Component {
    render() {
        const { pairsOnChart, deleteFromChart } = this.props;

        return (
            <Col
                className="ListOfPairs"
                lg={6}
                md={6}
                sm={6}
            >
                <ColHeader
                    size={12}
                    h={4}>
                    Список пар на графике
                </ColHeader>
                <ListGroup>
                    {
                        pairsOnChart.map(pair => (
                            <ListGroupItem
                                className="pair"
                                key={pair.id}
                                onClick={() => deleteFromChart(pair.id)}
                            >
                                {pair.stats.name}
                                </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pairsOnChart: state.chart.pairsOnChart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromChart: bindActionCreators(deleteFromChart, dispatch)
    }
};

ListOfLines.propTypes = {
    pairs: PropTypes.array,
    deleteFromChart: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfLines);