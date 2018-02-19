import { checkHttpStatus } from "../utils";
import { push } from "react-router-redux";
import { loginUserFailure } from "./auth";

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_STATUS = 'SET_STATUS';

const loadURL = '127.0.0.1';
const statusURL = 'http://api.stat-exchange.com/stats/getUploadEvents';

function uploadRequest() {
    return {
        type: UPLOAD_REQUEST
    }
}

function uploadSuccess() {
    return {
        type: UPLOAD_SUCCESS
    }
}

function uploadFailure() {
    return {
        type: UPLOAD_FAILURE
    }
}

function setStatus(statuses) {
    return {
        type: SET_STATUS,
        statuses
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

export function checkStatus(token) {
    return function (dispatch) {
        return fetch(statusURL, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => {
                dispatch(setStatus(data));
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}

export function uploadFile(file) {
    return function(dispatch) {
        dispatch(uploadRequest());
        console.log(">>>> upload request");
        return fetch(loadURL, {
            method: 'post',
            body: file
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch(uploadSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(uploadFailure());
            })
    }
}