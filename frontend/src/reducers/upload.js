import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE } from "../actions/upload";

const initialState = {
    isUploading: false,
    status: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return {
                isUploading: true,
                status: 'uploading'
            };

        case UPLOAD_SUCCESS:
            return {
                isUploading: false,
                status: 'success'
            };

        case UPLOAD_FAILURE:
            return {
                isUploading: false,
                status: 'failure'
            };

        default:
            return state;
    }
}