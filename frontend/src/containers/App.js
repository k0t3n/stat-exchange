import React, { Component } from 'react';
import '../styles/App.css';
import { privateComponent } from '../HOCs/privateComponent';
import FileInput from "./FileInput";

class App extends Component {
    render() {
        return (
            <div className="App">
                <FileInput />
            </div>
        );
    }
}

export default privateComponent(App);

//todo: graphic component