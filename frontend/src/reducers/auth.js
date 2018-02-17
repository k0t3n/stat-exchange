import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from "../actions/auth";

const initialState = {
    token: null,
    user: null,
    isAuthenticated: true,
    isAuthenticating: false,
    statusText: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null,
                error: false
            });

        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.token,
                user: action.user,
                statusText: 'Successful',
                error: false
            });

        case LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                user: null,
                statusText: `Authenticating Error: ${action.status} ${action.statusText}`,
                error: true
            });

        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                user: null,
                statusText: 'Logged out',
                error: false
            });

        default:
            return state;
    }
}