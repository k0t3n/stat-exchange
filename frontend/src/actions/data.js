import { loginUserFailure } from "./auth";
import { checkHttpStatus } from "../utils";
import { push } from 'react-router-redux';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

const URL = 'http://api.stat-exchange.com/stats/getCurrencyPairs';

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    }
}

export function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        data
    }
}

export function fetchDataFailure() {
    return {
        type: FETCH_DATA_FAILURE
    }
}

export function clearData() {
    return {
        type: CLEAR_DATA
    }
}

export function fetchData(token) {
    return function(dispatch) {
        dispatch(fetchDataRequest());
        console.log('>>>> fetch data'); //todo: delete this console.log
        return fetch(URL, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => {
                dispatch(receiveData(data));
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                } else {
                    dispatch(fetchDataFailure());
                }
            })
    }
}