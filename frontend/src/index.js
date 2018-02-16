import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';

import { loginUserSuccess } from "./actions/auth";
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    auth: {
        token: null,
        user: null,
        isAuthenticated: true,
        isAuthenticating: false,
        statusText: null,
        error: false
    }
};

const history = createHistory();

const middleware = [
    ReduxThunk,
    routerMiddleware(history)
];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
