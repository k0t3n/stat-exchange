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
            return Object.assign({}, state, {
                isUploading: true,
                error: false
            });

        case UPLOAD_SUCCESS:
            return Object.assign({}, state, {
                isUploading: false
            });

        case UPLOAD_FAILURE:
            return Object.assign({}, state, {
                error: true
            });

        case SET_STATUSES:
            return Object.assign({}, state, {
                statuses: action.statuses
            });

        case CLEAR_ERROR:
            return Object.assign({}, state, {
                error: false
            });

        default:
            return state;
    }
}