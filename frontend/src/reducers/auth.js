import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from "../actions/auth";

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    error: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isAuthenticating: true,
                statusText: null,
                error: false
            };

        case LOGIN_USER_SUCCESS:
            return {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.token,
                user: action.user,
                statusText: 'Successful',
                error: false
            };

        case LOGIN_USER_FAILURE:
            const statusText = action.status === 400 ? 'Неверные логин или пароль' : `Ошибка авторизации: ${action.status} ${action.statusText}`;

            return {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                user: null,
                statusText,
                error: true
            };

        case LOGOUT_USER:
            return {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                user: null,
                statusText: 'Logged out',
                error: false
            };

        default:
            return state;
    }
}