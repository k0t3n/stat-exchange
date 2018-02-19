import React, { Component } from 'react';
import { deleteFromChart } from "../actions/chart";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import ColHeader from "../components/ColHeader";

class ListOfLines extends Component {
    render() {
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
                        this.props.pairs.map(pair => (
                            <ListGroupItem
                                className="pair"
                                key={pair.id}
                                onClick={() => this.props.deleteFromChart(pair.id)}
                            >
                                {`${pair.firstCurrencyName}/${pair.lastCurrencyName}`}
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
        pairs: state.chart.pairs
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromChart: bindActionCreators(deleteFromChart, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfLines);