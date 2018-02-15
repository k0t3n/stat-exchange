import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';

export default class Main extends Component {
    render() {
        return (
            <div>
                <h1>header</h1>
                <Switch>
                    <Route exact path={"/"} component={App} />
                </Switch>
            </div>
        )
    }
}
