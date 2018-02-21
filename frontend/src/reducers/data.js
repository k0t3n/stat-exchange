import { CLEAR_DATA, FETCH_DATA_REQUEST, FETCH_DATA_FAILURE, RECEIVE_DATA } from "../actions/data";

const initialState = {
    pairs: [],
    currencies: [],
    isFetching: false,
    error: false
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false
            };

        case RECEIVE_DATA:
            function unique(array) {
                return array.filter(function (value, index, self) {
                    return self.indexOf(value) === index;
                });
            }

            const currencies = unique(action.data.map(pair => pair.first_currency));

            return {
                ...state,
                pairs: action.data,
                currencies: currencies,
                isFetching: false,
                error: false
            };

        case FETCH_DATA_FAILURE:
            return {
                ...state,
                error: true
            };

        case CLEAR_DATA:
            return {
                pairs: [],
                currencies: [],
                isFetching: false,
                error: false
            };

        default:
            return state;
    }
}