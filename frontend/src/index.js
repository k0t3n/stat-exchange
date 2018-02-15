import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';

import { loginUserSuccess } from "./actions/auth";
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';

const history = createHistory();
const store = createStore(
    reducer,
    applyMiddleware(routerMiddleware(history), ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
