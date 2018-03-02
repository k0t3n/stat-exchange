import { loginUserFailure } from "./auth";
import { checkHttpStatus, entryPoint } from "../utils";
import { push } from "react-router-redux";

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_STATUSES = 'SET_STATUSES';

const uploadURL = `${entryPoint}/stats/upload`;
const statusURL = `${entryPoint}/stats/getUploadEvents`;

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

function setStatuses(statuses) {
    return {
        type: SET_STATUSES,
        statuses
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

export function checkStatuses(token) {
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
                dispatch(setStatuses(data));
            })
            .catch(err => {
                console.log('Statuses Error: ', err); // todo: delete this console.log
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}

export function uploadFile(file, exchange, token) {
    return function(dispatch) {
        dispatch(uploadRequest());
        console.log(">>>> upload request"); // todo: delete this console.log

        const formData = new FormData();
        formData.append("file", file);
        formData.append("exchange", exchange);

        return fetch(uploadURL, {
            method: 'put',
            headers: {
                'Authorization': `JWT ${token}`
            },
            body: formData
        })
            .then(res => checkHttpStatus(res))
            .then(() => {
                dispatch(uploadSuccess());
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                } else {
                    dispatch(uploadFailure());
                }
            })
    }
}