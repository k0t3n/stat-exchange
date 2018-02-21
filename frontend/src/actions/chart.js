import { loginUserFailure } from "./auth";
import { checkHttpStatus } from "../utils";
import { push } from "react-router-redux";
import v4 from 'uuid/v4';

export const ADD_TO_CHART_REQUEST = 'ADD_TO_CHART_REQUEST';
export const ADD_TO_CHART_SUCCESS = 'ADD_TO_CHART_SUCCESS';
export const ADD_TO_CHART_FAILURE = 'ADD_TO_CHART_FAILURE';
export const DELETE_FROM_CHART = 'DELETE_FROM_CHART';
export const CLEAR_FROM_CHART = 'CLEAR_FROM_CHART';

const URL = 'http://api.stat-exchange.com/stats/getStats';

function addToChartSuccess(data, firstCurrencyName, lastCurrencyName) {
    return {
        type: ADD_TO_CHART_SUCCESS,
        id: v4(),
        firstCurrencyName,
        lastCurrencyName,
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

export function deleteFromChart(id) {
    return {
        type: DELETE_FROM_CHART,
        id
    }
}

export function clearFromChart() {
    return {
        type: CLEAR_FROM_CHART
    }
}

export function addToChart(pair, token) {
    return function (dispatch) {
        dispatch(addToChartRequest());

        const formData = new FormData();
        formData.append("first_currency", pair.first_currency);
        formData.append("last_currency", pair.last_currency);

        return fetch(URL, {
            method: 'post',
            headers: {
                'Authorization': `JWT ${token}`
            },
            body: formData
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => {
                dispatch(addToChartSuccess(data, pair.first_currency, pair.last_currency));
            })
            .catch(err => {
                dispatch(addToChartFailure());
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}