import { ADD_TO_CHART_REQUEST, ADD_TO_CHART_SUCCESS, ADD_TO_CHART_FAILURE, DELETE_FROM_CHART } from "../actions/chart";

const initialState = {
    pairs: [],
    error: false
};

export default function chartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CHART_REQUEST:
            return Object.assign({}, state, {
                error: false
            });

        case ADD_TO_CHART_SUCCESS:
            const newPairs = [
                ...state.pairs,
                {
                    id: action.id,
                    stats: action.data
                }
            ];

            return Object.assign({}, state, {
                pairs: newPairs,
                error: false
            });

        case ADD_TO_CHART_FAILURE:
            return Object.assign({}, state, {
                error: true
            });

        case DELETE_FROM_CHART:
            const index = state.pairs.findIndex(pair => pair.id === action.id);
            const pairs = [
                ...state.pairs.slice(0, index),
                ...state.pairs.slice(index + 1)
            ];

            return Object.assign({}, state, {
                pairs: pairs
            });

        default:
            return state;
    }
}