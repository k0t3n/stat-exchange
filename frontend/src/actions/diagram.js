import { loginUserFailure } from "./auth";
import { checkHttpStatus } from "../utils";
import { push } from "react-router-redux";

export const TOP10_TRADES_REQUEST = 'TOP10_TRADES_REQUEST';
export const TOP10_PROFITS_REQUEST = 'TOP10_PROFITS_REQUEST';
export const TOP10_TRADES_SUCCESS = 'TOP10_TRADES_SUCCESS';
export const TOP10_PROFITS_SUCCESS = 'TOP10_PROFITS_SUCCESS';
export const TOP10_FAILURE = 'TOP10_FAILURE';
export const CLEAR_DIAGRAM = 'CLEAR_DIAGRAM';

const tradesURL = 'http://api.stat-exchange.com/stats/getTop10TradesCount';
const profitsURL = 'http://api.stat-exchange.com/stats/getTop10TradesProfit';

function top10TradesRequest() {
    return {
        type: TOP10_TRADES_REQUEST
    }
}

function top10ProfitsRequest() {
    return {
        type: TOP10_PROFITS_REQUEST
    }
}

function top10TradesSuccess(data) {
    return {
        type: TOP10_TRADES_SUCCESS,
        data
    }
}

function top10ProfitsSuccess(data) {
    return {
        type: TOP10_PROFITS_SUCCESS,
        data
    }
}

function top10Failure() {
    return {
        type: TOP10_FAILURE
    }
}

export function clearDiagram() {
    return {
        type: CLEAR_DIAGRAM
    }
}

export function getTop10Trades(token) {
    return function (dispatch) {
        dispatch(top10TradesRequest());

        return fetch(tradesURL, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => dispatch(top10TradesSuccess(data)))
            .catch(err => {
                dispatch(top10Failure());
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}

export function getTop10Profits(token) {
    return function (dispatch) {
        dispatch(top10ProfitsRequest());

        return fetch(profitsURL, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => dispatch(top10ProfitsSuccess(data)))
            .catch(err => {
                dispatch(top10Failure());
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}

