import { checkHttpStatus } from "../utils";
import { loginUserFailure } from "./auth";
import { push } from 'react-router-redux';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const RECEIVE_DATA = 'RECEIVE_DATA';

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

export function fetchData(URL, token) {
    return function(dispatch) {
        dispatch(fetchDataRequest());
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