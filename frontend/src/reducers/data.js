import { CLEAR_DATA, FETCH_DATA_REQUEST, RECEIVE_DATA } from "../actions/data";

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
            function unique(array) {
                return array.filter(function (value, index, self) {
                    return self.indexOf(value) === index;
                });
            }

            const currencies = unique(action.data.map(pair => pair.first_currency));

            return Object.assign({}, state, {
                pairs: action.data,
                currencies: currencies,
                isFetching: false
            });

        case CLEAR_DATA:
            return {
                pairs: [],
                currencies: [],
                isFetching: false
            };

        default:
            return state;
    }
}