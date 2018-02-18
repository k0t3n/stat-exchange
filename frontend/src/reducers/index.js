import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import stats from './stats';
import notification from './notification';
import upload from './upload';
import chart from './chart';

export default combineReducers({
    auth,
    data,
    stats,
    notification,
    upload,
    chart,
    router: routerReducer
})