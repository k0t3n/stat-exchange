import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actions/notification";

const initialState = {
    text: '',
    show: false
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                text: action.text,
                show: true
            };

        case HIDE_NOTIFICATION:
            return {
                text: '',
                show: false
            };
            
        default:
            return state;
    }
}