import { TOP10_TRADES_REQUEST, TOP10_PROFITS_REQUEST, TOP10_TRADES_SUCCESS, TOP10_PROFITS_SUCCESS, TOP10_FAILURE, CLEAR_DIAGRAM } from "../actions/diagram";

const initialState = {
    trades: [],
    profits: [],
    error: false
};

export default function diagramReducer(state = initialState, action) {
    switch (action.type) {
        case TOP10_TRADES_REQUEST:
            return {
                ...state,
                error: false
            };

        case TOP10_PROFITS_REQUEST:
            return {
                ...state,
                error: false
            };

        case TOP10_TRADES_SUCCESS:
            return {
                ...state,
                trades: action.data,
                error: false
            };

        case TOP10_PROFITS_SUCCESS:
            return {
                ...state,
                profits: action.data,
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
                error: false
            };

        default:
            return state;

    }
}