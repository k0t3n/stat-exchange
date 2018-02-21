import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { privateComponent } from "../HOCs/privateComponent";
import Header from './Header';
import App from '../containers/App';
import SignIn from '../containers/SignIn';
import SignOut from '../containers/SignOut';


const Main = () => {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path={"/"} component={privateComponent(App)} />
                <Route path={"/auth"} component={SignIn} />
                <Route path={"/logout"} component={privateComponent(SignOut)} />
            </Switch>
        </div>
    )
};

export default Main;