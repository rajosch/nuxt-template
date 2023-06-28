import store from "../store";


export function showErrorMessage(message: string) {
    store.setErrorHappened(true);
    store.setMessage(message);

    setTimeout(() => {
        store.setErrorHappened(false);
        store.setMessage('');
    }, 2000);
}

export function   showSuccessMessage(message: string) {
    store.setSuccessHappened(true);
    store.setMessage(message);

    setTimeout(() => {
        store.setSuccessHappened(false);
        store.setMessage('');
    }, 2000);
}