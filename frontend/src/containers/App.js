import React, { Component } from 'react';
import '../styles/App.css';
import { privateComponent } from '../HOCs/privateComponent';
import FileInput from "./FileInput";
import PairSelect from "./PairSelect";

class App extends Component {
    render() {
        return (
            <div className="App">
                <FileInput />
                <PairSelect/>
            </div>
        );
    }
}

export default privateComponent(App);

//todo: graphic component
//todo: get pairs and currencies from redux and give it to pairselect