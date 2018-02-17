import React, { Component } from 'react';
import Select from "../components/Select";
import ColButton from "../components/ColButton";
import { Row } from 'react-bootstrap';

class PairSelect extends Component {
    constructor() {
        super();
        this.state = {
            firstCurrency: 'Выберите первую валюту',
            secondCurrency: 'Выберите вторую валюту',
            firstOptions: ['BTC', 'RUB', 'ETH', 'JOT', 'DOL'], // init from props
            secondOptions: []
        };

        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
        this.filterOptions = this.filterOptions.bind(this);
    }

    validateBtn() {
        const { firstCurrency, secondCurrency } = this.state;

        return (firstCurrency === 'Выберите первую валюту' || secondCurrency === 'Выберите вторую валюту');
    }

    filterOptions(cr) {
        const firstCurrency = cr;
        const pairs = [ // props
            {first_currency: 'BTC', second_currency: 'RUB'},
            {first_currency: 'BTC', second_currency: 'ETH'},
            {first_currency: 'RUB', second_currency: 'ETH'},
            {first_currency: 'ETH', second_currency: 'RUB'},
            {first_currency: 'JOT', second_currency: 'BTC'},
            {first_currency: 'RUB', second_currency: 'BTC'},
            {first_currency: 'ETH', second_currency: 'DOL'}
        ];

        return pairs.filter(pair => pair.first_currency === firstCurrency).map(pair => pair.second_currency);
    }

    handleChangeFirst(e) {
        const options = this.filterOptions(e.target.value);
        this.setState({
            firstCurrency: e.target.value,
            secondOptions: options
        });
    }

    handleChangeSecond(e) {
        this.setState({
            secondCurrency: e.target.value
        })
    }

    render() {
        const { firstCurrency, secondCurrency, firstOptions, secondOptions } = this.state;

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
                        options={['Выберите вторую валюту', ...secondOptions]}
                        onChange={this.handleChangeSecond}
                        value={secondCurrency}
                    />
                </Row>
                <ColButton
                    bsStyle="success"
                    size={2}
                    offset={5}
                    disabled={this.validateBtn()}
                    onClick={() => {}}
                >
                    Добавить на график
                </ColButton>
            </div>
        )
    }
}

export default PairSelect;