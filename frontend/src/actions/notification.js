export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export function showNotification(text) {
    return {
        type: SHOW_NOTIFICATION,
        text
    }
}

export function hideNotification() {
    return {
        type: HIDE_NOTIFICATION
    }
}