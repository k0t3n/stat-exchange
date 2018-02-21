import {
    UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE,
    SET_STATUSES, CLEAR_ERROR
} from "../actions/upload";

const initialState = {
    isUploading: false,
    statuses: [],
    error: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return {
                ...state,
                isUploading: true,
                error: false
            };

        case UPLOAD_SUCCESS:
            return {
                ...state,
                isUploading: false,
                error: false
            };

        case UPLOAD_FAILURE:
            return {
                ...state,
                isUploading: false,
                error: true
            };

        case SET_STATUSES:
            return {
                ...state,
                statuses: action.statuses
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: false
            };

        default:
            return state;
    }
}