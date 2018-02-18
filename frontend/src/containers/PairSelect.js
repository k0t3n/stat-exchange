import React, { Component } from 'react';
import '../styles/PairSelect.css';
import Select from "../components/Select";
import ColButton from "../components/ColButton";
import PropTypes from 'prop-types';
import { Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToChart } from "../actions/chart";
import ColHeader from "../components/ColHeader";
import FileInputModal from "./FileInputModal";

class PairSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCurrency: 'Выберите первую валюту',
            lastCurrency: 'Выберите вторую валюту',
            firstOptions: props.currencies,
            lastOptions: []
        };

        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
        this.filterOptions = this.filterOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateBtn() {
        const { firstCurrency, lastCurrency } = this.state;

        return (firstCurrency === 'Выберите первую валюту' || lastCurrency === 'Выберите вторую валюту');
    }

    filterOptions(cr) {
        const firstCurrency = cr;

        return this.props.pairs.filter(pair => pair.first_currency === firstCurrency).map(pair => pair.last_currency);
    }

    handleChangeFirst(e) {
        const options = this.filterOptions(e.target.value); // filter by first currency

        this.setState({
            firstCurrency: e.target.value,
            lastOptions: options
        });
    }

    handleChangeSecond(e) {
        this.setState({
            lastCurrency: e.target.value
        })
    }

    handleSubmit() {
        const { firstCurrency, lastCurrency } = this.state;
        const { token } = this.props;
        const pair = {
            first_currency: firstCurrency,
            last_currency: lastCurrency
        };

        this.props.addToChart(pair, token);

        this.setState({
            firstCurrency: 'Выберите первую валюту',
            lastCurrency: 'Выберите вторую валюту'
        });
    }

    renderError() {
        return (
            <Col
                lg={4}
                md={4}
                sm={4}
                lgOffset={4}
                mdOffset={4}
                smOffset={4}
            >
                <Alert bsStyle="danger">
                    Что-то пошло не так
                </Alert>
            </Col>
        )
    }

    render() {
        const { firstCurrency, lastCurrency, firstOptions, lastOptions } = this.state;

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
                <Select
                    options={['Выберите первую валюту', ...firstOptions]}
                    onChange={this.handleChangeFirst}
                    value={firstCurrency}
                />
                <Select
                    options={['Выберите вторую валюту', ...lastOptions]}
                    onChange={this.handleChangeSecond}
                    value={lastCurrency}
                />
                {this.props.error && this.renderError()}
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