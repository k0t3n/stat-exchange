import { ADD_TO_CHART_REQUEST, ADD_TO_CHART_SUCCESS, ADD_TO_CHART_FAILURE, DELETE_FROM_CHART, CLEAR_FROM_CHART } from "../actions/chart";
import { getBy } from "../utils";

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
            const stats = {
                price: getBy("price", action.data),
                amount: getBy("amount", action.data),
                total: getBy("total", action.data),
                fee: getBy("fee", action.data),
                base_total_less_fee: getBy("base_total_less_fee", action.data),
                quote_total_less_fee: getBy("quote_total_less_fee", action.data)
            };

            const newPairs = [
                ...state.pairs,
                {
                    id: action.id,
                    name: action.name,
                    stats: stats
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

        case CLEAR_FROM_CHART:
            return {
                pairs: [],
                error: false
            };

        default:
            return state;
    }
}