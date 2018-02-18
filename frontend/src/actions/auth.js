import { checkHttpStatus, parseJSON } from "../utils";
import { push } from 'react-router-redux';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGIN_USER';

const URL = 'http://api.stat-exchange.com/accounts/login/';

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function loginUserSuccess(data) {
    localStorage.setItem('token', data.token);
    return {
        type: LOGIN_USER_SUCCESS,
        token: data.token,
        user: data.user
    }
}

export function loginUserFailure(err) {
    localStorage.removeItem('token');
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

        const formData = new FormData();
        formData.append("username", login);
        formData.append("password", pass);

        return fetch(URL, {
            method: 'post',
            body: formData
        })
            .then(res => checkHttpStatus(res))
            .then(parseJSON)
            .then(
                data => {
                    dispatch(loginUserSuccess(data));
                    dispatch(push(redirect));
                }
            )
            .catch(err => {
                dispatch(loginUserFailure(err));
            })
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(logout());
        dispatch(push('/auth'));
    }
}