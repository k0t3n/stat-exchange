import React, { Component } from 'react';
import Select from "../components/Select";
import ColButton from "../components/ColButton";
import PropTypes from 'prop-types';
import { Row, Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToChart } from "../actions/chart";

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

        const pair = {
            first_currency: firstCurrency,
            last_currency: lastCurrency
        };

        this.props.addToChart(pair);

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
            <div className="PairsSelect">
                <Row>
                    <Select
                        options={['Выберите первую валюту', ...firstOptions]}
                        onChange={this.handleChangeFirst}
                        value={firstCurrency}
                        offset={4}
                    />
                    <Select
                        options={['Выберите вторую валюту', ...lastOptions]}
                        onChange={this.handleChangeSecond}
                        value={lastCurrency}
                    />
                </Row>
                {this.props.error && this.renderError()}
                <ColButton
                    bsStyle="success"
                    size={2}
                    offset={5}
                    disabled={this.validateBtn()}
                    onClick={this.handleSubmit}
                >
                    Добавить на график
                </ColButton>
            </div>
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
        error: state.chart.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToChart: bindActionCreators(addToChart, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PairSelect);