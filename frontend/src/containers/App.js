import React, { Component } from 'react';
import '../styles/App.css';
import { privateComponent } from '../HOCs/privateComponent';
import FileInput from "./FileInput";
import PairSelect from "./PairSelect";

const pairs = [ // from redux
    {first_currency: 'BTC', second_currency: 'RUB'},
    {first_currency: 'BTC', second_currency: 'ETH'},
    {first_currency: 'RUB', second_currency: 'ETH'},
    {first_currency: 'ETH', second_currency: 'RUB'},
    {first_currency: 'JOT', second_currency: 'BTC'},
    {first_currency: 'RUB', second_currency: 'BTC'},
    {first_currency: 'ETH', second_currency: 'DOL'}
];

const currencies = ['BTC', 'RUB', 'ETH', 'JOT', 'DOL']; // from redux

class App extends Component {
    componentDidMount() {
        console.log('App mounted');
    }

    render() {
        return (
            <div className="App">
                <FileInput />
                <PairSelect currencies={currencies} pairs={pairs}/>
            </div>
        );
    }
}

export default privateComponent(App);

//todo: graphic component
//todo: get pairs and currencies from redux and give it to pairselect