import { FETCH_DATA_REQUEST, RECEIVE_DATA } from "../actions/data";

const initialState = {
    pairs: [],
    currencies: [],
    isFetching: false
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_DATA:
            return Object.assign({}, state, {
                pairs: action.data.pairs,
                currencies: action.data.currencies,
                isFetching: false
            });

        default:
            return state;
    }
}