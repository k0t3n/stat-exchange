import { checkHttpStatus } from "../utils";
import { fetchDataRequest } from "./data";

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

export function uploadFailure() {
    return {
        type: UPLOAD_FAILURE
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
            .then((data) => {
                console.log(data);
                dispatch(uploadSuccess());
                dispatch(fetchDataRequest());
            })
            .catch(err => {
                console.log(err);
                dispatch(uploadFailure());
            })
    }
}