import { loginUserFailure } from "./auth";
import { checkHttpStatus } from "../utils";
import { push } from "react-router-redux";

export const TOP10_REQUEST = 'TOP10_REQUEST';
export const TOP10_SUCCESS = 'TOP10_SUCCESS';
export const TOP10_FAILURE = 'TOP10_FAILURE';
export const CLEAR_DIAGRAM = 'CLEAR_DIAGRAM';

const tradesURL = 'http://api.stat-exchange.com/stats/getTop10TradesCount';
const profitsURL = 'http://api.stat-exchange.com/stats/getTop10TradesProfit';

function top10Request(type) {
    return {
        type: TOP10_REQUEST,
        typeOfTop: type
    }
}

function top10Success(data) {
    return {
        type: TOP10_SUCCESS,
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

export function getTop10(type, token) {
    return function (dispatch) {
        dispatch(top10Request(type));
        const URL = type === 'trades' ? tradesURL : profitsURL;

        return fetch(URL, {
            method: 'get',
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(res => checkHttpStatus(res))
            .then(res => res.json())
            .then(data => top10Success(data))
            .catch(err => {
                dispatch(top10Failure());
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}

