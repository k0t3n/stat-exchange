import {
    ADD_TO_CHART_REQUEST,
    ADD_TO_CHART_SUCCESS,
    ADD_TO_CHART_FAILURE,
    DELETE_FROM_CHART,
    CLEAR_FROM_CHART
} from "../actions/chart";

const initialState = {
    pairsOnChart: [],
    error: false
};

export default function chartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CHART_REQUEST:
            return {
                ...state,
                error: false
            };

        case ADD_TO_CHART_SUCCESS:
            const newPairs = [
                ...state.pairsOnChart,
                {
                    id: action.id,
                    stats: action.pair
                }
            ];

            return {
                ...state,
                pairsOnChart: newPairs,
                error: false
            };

        case ADD_TO_CHART_FAILURE:
            return {
                ...state,
                error: true
            };

        case DELETE_FROM_CHART:
            const index = state.pairsOnChart.findIndex(pair => pair.id === action.id);
            const pairsOnChart = [
                ...state.pairsOnChart.slice(0, index),
                ...state.pairsOnChart.slice(index + 1)
            ];

            return {
                ...state,
                pairsOnChart,
                error: false
            };

        case CLEAR_FROM_CHART:
            return {
                pairsOnChart: [],
                error: false
            };

        default:
            return state;
    }
}