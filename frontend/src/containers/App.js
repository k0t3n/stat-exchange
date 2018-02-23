import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { fetchData } from "../actions/data";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import PairSelect from "./PairSelect";
import Chart from "./Chart";
import ListOfLines from './ListOfLines';
import { Alert } from 'react-bootstrap';

class App extends Component {
    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { token, fetchData } = this.props;

        fetchData(token);
    }

    render() {
        const { error } = this.props;
        const { pairsOnChart } = this.props;

        const priceOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.price
            }
        });

        return (
            <div>
                <Chart options={priceOptions} title="TEST"/>
                {error && (
                    <Alert bsStyle="danger">Что-то пошло не так, перезагрузите страницу.</Alert>
                )}
                <PairSelect />
                <ListOfLines />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        pairsOnChart: state.chart.pairs,
        token: state.auth.token,
        error: state.data.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    }
};

App.propTypes = {
    pairsOnChart: PropTypes.array,
    token: PropTypes.string,
    fetchData: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);