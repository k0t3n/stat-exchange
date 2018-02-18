import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import upload from './upload';
import chart from './chart';

export default combineReducers({
    auth,
    data,
    upload,
    chart,
    router: routerReducer
})