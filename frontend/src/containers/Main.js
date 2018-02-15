import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import App from './App';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";

export default class Main extends Component {
    render() {
        return (
            <div>
                <header>
                    <Link to={"/logout"}>Выйти</Link>
                </header>
                <Switch>
                    <Route exact path={"/"} component={App} />
                    <Route path={"/auth"} component={SignIn} />
                    <Route path={"/register"} component={SignUp} />
                    <Route path={"/logout"} component={SignOut} />
                </Switch>
            </div>
        )
    }
}
