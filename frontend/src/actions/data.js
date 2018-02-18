import { checkHttpStatus } from "../utils";
import { loginUserFailure } from "./auth";
import { push } from 'react-router-redux';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const RECEIVE_DATA = 'RECEIVE_DATA';

const URL = '127.0.0.1';

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

export function fetchData(token) {
    return function(dispatch) {
        dispatch(fetchDataRequest());
        console.log(">>>> data request");
        return fetch(URL, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveData(data));
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}