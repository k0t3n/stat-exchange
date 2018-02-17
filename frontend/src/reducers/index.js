import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import stats from './stats';

export default combineReducers({
    auth,
    data,
    stats,
    router: routerReducer
})