import { TOP10_REQUEST, TOP10_SUCCESS, TOP10_FAILURE, CLEAR_DIAGRAM } from "../actions/diagram";

const initialState = {
    data: [],
    typeOfTop: 'trades',
    error: false
};

export default function diagramReducer(state = initialState, action) {
    switch (action.type) {
        case TOP10_REQUEST:
            return {
                ...state,
                typeOfTop: action.typeOfTop,
                error: false
            };

        case TOP10_SUCCESS:
            return {
                ...state,
                data: action.data,
                error: false
            };

        case TOP10_FAILURE:
            return {
                ...state,
                error: true
            };

        case CLEAR_DIAGRAM:
            return {
                data: [],
                typeOfTop: 'trades',
                error: false
            };

        default:
            return state;

    }
}