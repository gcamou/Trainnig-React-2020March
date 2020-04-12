import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiretionDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authExpiresIn = expiresIn => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt91JOGb-kM6Gezf8zw-6uOLK0oX2lBpc'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBt91JOGb-kM6Gezf8zw-6uOLK0oX2lBpc'
        }
        axios.post(url, authData)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expiretionDate', new Date(new Date().getTime() + res.data.expiresIn * 1000));
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authExpiresIn(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });

    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const expiretionDate = new Date(localStorage.getItem('expiretionDate'));
            if (expiretionDate > new Date()) {
                const expiresIn = expiretionDate.getTime() - new Date().getTime()
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authExpiresIn(expiresIn / 1000));
            } else {
                dispatch(authLogout());
            }
        } else {
            dispatch(authLogout());
        }
    }
}