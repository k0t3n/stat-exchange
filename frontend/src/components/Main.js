import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import App from '../containers/App';
import SignIn from '../containers/SignIn';
// import SignUp from './SignUp';
import SignOut from '../containers/SignOut';

const Main = () => {
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
};

export default Main;