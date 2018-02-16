import { checkHttpStatus } from "../utils";
import { push } from 'react-router-redux';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGIN_USER';
// export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
// export const RECEIVE_DATA = 'RECEIVE_DATA';

const ROOT_URL = '127.0.0.1:8000';

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function loginUserSuccess(data) {
    localStorage.setItem('token', data.token);
    return {
        type: LOGIN_USER_SUCCESS,
        token: '',//data.token,
        user: ''//data.user
    }
}

export function loginUserFailure(err) {
    localStorage.removeItem('token');
    console.log(err);
    return {
        type: LOGIN_USER_FAILURE,
        status: err.response.status,
        statusText: err.response.statusText
    }
}

function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function loginUser(login, pass, redirect = '/') {
    return function(dispatch) {
        dispatch(loginUserRequest());
        const data = {
            username: login,
            password: pass
        };
        console.log('>>>> login request');
        return fetch(`${ROOT_URL}/api/accounts/login/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(
                data => {
                    dispatch(loginUserSuccess(data));
                    dispatch(push(redirect));
                }
            )
            .catch(err => {
                dispatch(loginUserFailure(err))
            })
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(logout());
        dispatch(push('/auth'));
    }
}

// export function fetchDataRequest() {
//     return {
//         type: FETCH_DATA_REQUEST
//     }
// }
//
// export function receiveData(data) {
//     return {
//         type: RECEIVE_DATA,
//         data
//     }
// }

// export function fetchData(token) {
//     return function(dispatch) {
//         dispatch(fetchDataRequest());
//         return fetch(URL, {
//             headers: {
//                 'Authorization': `${token}`
//             }
//         })
//             .then(checkHttpStatus)
//             .then(res => res.json())
//             .then(data => {
//                 dispatch(receiveData(data));
//             })
//             .catch(err => {
//                 if (err.response.status === 401) {
//                     dispatch(loginUserFailure(err));
//                     dispatch(push('/auth'));
//                 }
//             })
//     }
// }