import React, { Component } from 'react';
import { deleteFromChart } from "../actions/chart";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ListOfLines extends Component {
    render() {
        return (
            <ul className="ListOfPairs">
                {
                    this.props.pairs.map(pair => (
                        <li
                            className="pair"
                            key={pair.id}
                            onClick={() => this.props.deleteFromChart(pair.id)}
                        >{pair.name}</li>
                    ))
                }
            </ul>
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