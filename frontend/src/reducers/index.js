import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import stats from './stats';
import notification from './notification';

export default combineReducers({
    auth,
    data,
    stats,
    notification,
    router: routerReducer
})