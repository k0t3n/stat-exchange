export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
import v4 from 'uuid/v4';

export function showNotification(text) {
    return {
        type: SHOW_NOTIFICATION,
        id: v4(),
        text
    }
}

export function hideNotification(id) {
    return {
        type: HIDE_NOTIFICATION,
        id
    }
}