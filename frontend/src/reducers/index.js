import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import upload from './upload';
import chart from './chart';
import diagram from './diagram';

export default combineReducers({
    auth,
    data,
    upload,
    chart,
    diagram,
    router: routerReducer
})