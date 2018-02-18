export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;

        throw error;
    }
}

export function loadState() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        // return undefined;
    }
}

export function getBy(by, array) {
    return array
        .map(obj => {
            let date = new Date(obj.datetime).getTime();
            let data = parseFloat(obj[by]);

            return [date, data];
        })
        .sort((a, b) => a[0] > b[0]);
}