import { FETCH_STATS_REQUEST, RECEIVE_STATS } from "../actions/stats";

const initialState = {
    stats: [],
    isFetching: false
};

export default function statsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STATS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_STATS:
            return Object.assign({}, state, {
                stats: action.stats,
                isFetching: false
            });

        default:
            return state;
    }
}