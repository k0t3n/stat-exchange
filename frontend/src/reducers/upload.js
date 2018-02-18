import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE } from "../actions/upload";

const initialState = {
    isUploading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return {
                isUploading: true
            };

        case UPLOAD_SUCCESS:
            return {
                isUploading: false
            };

        case UPLOAD_FAILURE:
            return {
                isUploading: false
            };

        default:
            return state;
    }
}