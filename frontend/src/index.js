import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from './components/Main';

import { loginUserSuccess } from "./actions/auth";
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from "redux";
import { saveState, loadState } from "./utils";
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';

const history = createHistory();

const middleware = [
    ReduxThunk,
    routerMiddleware(history)
];

const persistedState = loadState();

const store = createStore(
    reducer,
    persistedState,
    // composeWithDevTools(
    //     applyMiddleware(...middleware)
    // )
    applyMiddleware(...middleware)
);

store.subscribe(() => {
    saveState(store.getState());
});

try {
    let data = {
        token: persistedState.auth.token,
        user: persistedState.auth.user
    };
    if (data.token !== null) {
        store.dispatch(loginUserSuccess(data));
    }
} catch (err) {
    console.log(err);
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);