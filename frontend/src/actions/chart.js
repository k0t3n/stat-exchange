import { checkHttpStatus } from "../utils";
import v4 from 'uuid/v4';

export const ADD_TO_CHART_REQUEST = 'ADD_TO_CHART_REQUEST';
export const ADD_TO_CHART_SUCCESS = 'ADD_TO_CHART_SUCCESS';
export const ADD_TO_CHART_FAILURE = 'ADD_TO_CHART_FAILURE';
export const DELETE_FROM_CHART = 'DELETE_FROM_CHART';

const URL = 'http://api.stat-exchange.com/stats/getStats';

function addToChartSuccess(pair, data) {
    return {
        type: ADD_TO_CHART_SUCCESS,
        id: v4(),
        pair,
        data
    }
}

function addToChartFailure() {
    return {
        type: ADD_TO_CHART_FAILURE
    }
}

function addToChartRequest() {
    return {
        type: ADD_TO_CHART_REQUEST
    }
}

function deleteFromChart(id) {
    return {
        type: DELETE_FROM_CHART,
        id
    }
}

export function addToChart(pair) {
    return function (dispatch) {
        dispatch(addToChartRequest());

        const formData = new FormData();
        formData.append("first_currency", pair.first_currency);
        formData.append("last_currency", pair.last_currency);

        return fetch(URL, {
            method: 'post',
            body: formData
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => {
                dispatch(addToChartSuccess(pair, data));
            })
            .catch(err => {
                dispatch(addToChartFailure());
                console.log(err);
            })
    }
}