import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { addToChart } from "../actions/chart";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/PairSelect.css';

import Select from "../components/Select";
import ColButton from "../components/ColButton";
import ColHeader from "../components/ColHeader";
import FileInputModal from "./FileInputModal";
import { Alert, Col } from 'react-bootstrap';

class PairSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCurrency: 'Выберите первую валюту',
            lastCurrency: 'Выберите вторую валюту',
            firstOptions: props.currencies,
            lastOptions: [],
            exchange: 'bittrex'
        };

        this.exchanges = ['bittrex', 'binance', 'poloniex'];
    }

    validateBtn() {
        const { firstCurrency, lastCurrency } = this.state;

        return (firstCurrency === 'Выберите первую валюту' || lastCurrency === 'Выберите вторую валюту');
    }

    filterOptions = (cr) => {
        const { pairs } = this.props;
        const firstCurrency = cr;

        return pairs.filter(pair => pair.first_currency === firstCurrency).map(pair => pair.last_currency);
    }

    handleChangeFirst = (e) => {
        const options = this.filterOptions(e.target.value); // filter by first currency

        this.setState({
            firstCurrency: e.target.value,
            lastOptions: options
        });
    }

    handleChangeSecond = (e) => {
        this.setState({
            lastCurrency: e.target.value
        })
    }
    //
    // handleChangeExchange = (e) => {
    //     this.setState({
    //         exchange: e.target.value
    //     })
    // }

    handleSubmit = () => {
        const { firstCurrency, lastCurrency } = this.state;
        const { token, addToChart } = this.props;

        const pair = {
            first_currency: firstCurrency,
            last_currency: lastCurrency
        };

        addToChart(pair, token);

        this.setState({
            firstCurrency: 'Выберите первую валюту',
            lastCurrency: 'Выберите вторую валюту'
        });
    }

    render() {
        const { firstCurrency, lastCurrency, firstOptions, lastOptions } = this.state;
        const { error } = this.props;

        return (
            <Col
                className="PairSelect"
                lg={6}
                md={6}
                sm={6}
            >
                <ColHeader
                    size={12}
                    h={4}
                >Добавление пары на графики</ColHeader>
                <div>
                    <Select
                        options={['Выберите первую валюту', ...firstOptions]}
                        onChange={this.handleChangeFirst}
                        value={firstCurrency}
                        size={6}
                    />
                    <Select
                        options={['Выберите вторую валюту', ...lastOptions]}
                        onChange={this.handleChangeSecond}
                        value={lastCurrency}
                        size={6}
                    />
                    {/*<Select*/}
                        {/*options={this.exchanges}*/}
                        {/*onChange={this.handleChangeExchange}*/}
                        {/*value={exchange}*/}
                        {/*size={2}*/}
                    {/*/>*/}
                </div>
                {error && (
                    <Col
                        lg={12}
                        md={12}
                        sm={12}
                    >
                        <Alert bsStyle="danger">
                            Что-то пошло не так
                        </Alert>
                    </Col>
                )}
                <FileInputModal />
                <ColButton
                    className="add-button"
                    bsStyle="success"
                    size={6}
                    disabled={this.validateBtn()}
                    onClick={this.handleSubmit}
                >
                    Добавить на график
                </ColButton>
            </Col>
        )
    }
}

PairSelect.propTypes = {
    pairs: PropTypes.array,
    currencies: PropTypes.array,
    addToChart: PropTypes.func,
    error: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        error: state.chart.error,
        token: state.auth.token,
        pairs: state.data.pairs,
        currencies: state.data.currencies
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToChart: bindActionCreators(addToChart, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PairSelect);