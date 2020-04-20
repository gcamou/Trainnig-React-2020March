import { useReducer, useCallback } from 'react';

const initialState = {
    isLoading: false,
    error: null,
    data: null,
    extra: null,
    identified: null
};

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { isLoading: true, error: null, data: null, extra: null, identified: action.identified };
        case 'RESPONSE':
            return { ...currentHttpState, isLoading: false, data: action.responseData, extra: action.extra };
        case 'ERROR':
            return { isLoading: false, error: action.error };
        case 'CLEAR':
            return initialState;
        default:
            throw new Error('Something was wrong!');
    }
}

const useHttp = () => {
    const [userHttpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentified) => {
        dispatchHttp({ type: 'SEND', identified: reqIdentified });
        fetch(
            url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            return dispatchHttp({ type: 'RESPONSE', responseData: responseData, extra: reqExtra })
        }).catch(err => {
            dispatchHttp({ type: 'ERROR', error: err.message });
        });
    }, []);

    return {
        isLoading: userHttpState.isLoading,
        error: userHttpState.error,
        data: userHttpState.data,
        sendRequest: sendRequest,
        extra: userHttpState.extra,
        identified: userHttpState.identified,
        clear: clear
    }
};

export default useHttp;