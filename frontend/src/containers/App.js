import React, { Component } from 'react';
import '../styles/App.css';
import { privateComponent } from '../HOCs/privateComponent';
import PairSelect from "./PairSelect";
import Chart from "../components/Chart";
import FileInputModal from "./FileInputModal";

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

let options = [{  // from redux
    name: 'BTC/RUB',
    data: []
}];

class App extends Component {
    componentDidMount() {
        console.log('App mounted');
    }

    render() {
        return (
            <div className="App">
                <Chart options={options} />
                <FileInputModal />
                <PairSelect currencies={currencies} pairs={pairs}/>
            </div>
        );
    }
}

export default privateComponent(App);

//todo: graphic component
//todo: get pairs and currencies from redux and give it to pairselect