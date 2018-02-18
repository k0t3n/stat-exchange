import { checkHttpStatus } from "../utils";
import { showNotification } from "./notification";

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

const URL = '127.0.0.1';

export function uploadRequest() {
    return {
        type: UPLOAD_REQUEST
    }
}

export function uploadSuccess() {
    return {
        type: UPLOAD_SUCCESS
    }
}

export function uploadFailure(err) {
    return {
        type: UPLOAD_FAILURE,
        error: err.response.statusText
    }
}

export function uploadFile(file) {
    return function(dispatch) {
        dispatch(uploadRequest());
        console.log(">>>> upload request");
        return fetch(URL, {
            method: 'post',
            body: file
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => {
                dispatch(uploadSuccess());
                dispatch(showNotification(data.text)) // show status text, that file was uploaded
            })
            .catch(err => {
                dispatch(uploadFailure(err));
                showNotification(err.response.statusText)
            })
    }
}