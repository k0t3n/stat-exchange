import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import App from './App';
import SignIn from './SignIn';
// import SignUp from './SignUp';
import SignOut from './SignOut';

class Main extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path={"/"} component={App} />
                    <Route path={"/auth"} component={SignIn} />
                    {/*<Route path={"/register"} component={SignUp} />*/}
                    <Route path={"/logout"} component={SignOut} />
                </Switch>
            </div>
        )
    }
}

export default Main;