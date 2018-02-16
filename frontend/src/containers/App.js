import React, { Component } from 'react';
import '../styles/App.css';
import { privateComponent } from '../HOCs/privateComponent';

class App extends Component {
    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

export default privateComponent(App);

//todo: graphic component