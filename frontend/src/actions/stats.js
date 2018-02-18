import { checkHttpStatus } from "../utils";
import { loginUserFailure } from "./auth";
import { push } from 'react-router-redux';

export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const RECEIVE_STATS = 'RECEIVE_STATS';

export function fetchStatsRequest() {
    return {
        type: FETCH_STATS_REQUEST
    }
}

export function receiveStats(stats) {
    return {
        type: RECEIVE_STATS,
        stats
    }
}

export function fetchStats(URL, token) {
    return function(dispatch) {
        dispatch(fetchStatsRequest());
        console.log(">>>> stats request");
        return fetch(URL, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(res => res.json())
            .then(stats => {
                dispatch(receiveStats(stats));
            })
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch(loginUserFailure(err));
                    dispatch(push('/auth'));
                }
            })
    }
}
